import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
}

interface ApiResponse<T> {
  data: T;
}

async function testBackendConnection() {
  console.log('🧪 Testing Backend Connection...\n');

  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
  });

  try {
    console.log('1. Testing GET /api/products...');
    const productsResponse = await client.get<ApiResponse<Product[]>>('/products');
    console.log('   ✅ Success! Products count:', productsResponse.data.data.length);
    if (productsResponse.data.data.length > 0) {
      console.log('   Sample product:', productsResponse.data.data[0]);
    }
    console.log('');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log('   ❌ Error:', error.message);
      if (error.response) {
        console.log('   Status:', error.response.status);
        console.log('   Data:', error.response.data);
      } else if (error.request) {
        console.log('   No response received. Is the backend running?');
      }
    }
    console.log('');
  }

  try {
    console.log('2. Testing POST /api/customers...');
    const customerData = {
      email: 'test@example.com',
      fullName: 'Test User',
      phoneNumber: '3001234567',
      address: 'Calle 123',
      city: 'Bogotá',
    };
    const customerResponse = await client.post('/customers', customerData);
    console.log('   ✅ Success! Customer created:', customerResponse.data);
    console.log('');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log('   ❌ Error:', error.message);
      console.log('   Status:', error.response?.status);
      console.log('   Data:', error.response?.data);
    }
    console.log('');
  }

  try {
    console.log('3. Testing POST /api/transactions (create pending)...');
    const transactionData = {
      customerId: 'test-customer-id',
      totalAmount: 50000,
      currency: 'COP',
      items: [
        {
          productId: '1',
          name: 'Test Product',
          quantity: 1,
          unitPrice: 30000,
        },
      ],
    };
    const transactionResponse = await client.post('/transactions', transactionData);
    console.log('   ✅ Success! Transaction created:', transactionResponse.data);
    console.log('');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log('   ❌ Error:', error.message);
      console.log('   Status:', error.response?.status);
      console.log('   Data:', error.response?.data);
    }
    console.log('');
  }

  console.log('🏁 Backend connection test complete.');
}

testBackendConnection();
