import axios from 'axios';

const wompiApi = axios.create({
  baseURL: import.meta.env.VITE_WOMPI_API_URL || 'https://api-sandbox.co.uat.wompi.dev/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_WOMPI_PUBLIC_KEY || 'pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7'}`,
  },
});

export const wompiService = {
  async tokenizeCard(cardData: {
    number: string;
    cvc: string;
    exp_month: string;
    exp_year: string;
    card_holder: string;
  }): Promise<string> {
    try {
      const response = await wompiApi.post('/tokens/cards', {
        number: cardData.number.replace(/\s/g, ''),
        cvc: cardData.cvc,
        exp_month: cardData.exp_month,
        exp_year: cardData.exp_year,
        card_holder: cardData.card_holder,
      });
      
      return response.data.data.id;
    } catch (error: any) {
      console.error('Wompi tokenization error:', error.response?.data);
      throw new Error(error.response?.data?.error?.message || 'Failed to tokenize card');
    }
  },

  async getAcceptanceToken(): Promise<string> {
    try {
      const publicKey = import.meta.env.VITE_WOMPI_PUBLIC_KEY || 'pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7';
      const response = await wompiApi.get(`/merchants/${publicKey}`);
      
      return response.data.data.presigned_acceptance.acceptance_token;
    } catch (error: any) {
      console.error('Wompi acceptance token error:', error.response?.data);
      throw new Error('Failed to get acceptance token');
    }
  },

  async getTransactionStatus(transactionId: string) {
    try {
      const response = await wompiApi.get(`/transactions/${transactionId}`);
      return response.data.data;
    } catch (error: any) {
      console.error('Wompi transaction status error:', error.response?.data);
      throw error;
    }
  },
};
