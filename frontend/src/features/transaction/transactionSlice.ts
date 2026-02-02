import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TransactionState {
  transactionId: string | null;
  status: 'pending' | 'processing' | 'completed' | 'failed' | null;
  paymentStatus: unknown;
  error: string | null;
  loading: boolean;
  transactionResult: unknown;
}

const initialState: TransactionState = {
  transactionId: null,
  status: null,
  paymentStatus: null,
  error: null,
  loading: false,
  transactionResult: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactionId: (state, action: PayloadAction<string | null>) => {
      state.transactionId = action.payload;
    },
    setStatus: (state, action: PayloadAction<TransactionState['status']>) => {
      state.status = action.payload;
    },
    setPaymentStatus: (state, action: PayloadAction<unknown>) => {
      state.paymentStatus = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTransactionResult: (state, action: PayloadAction<unknown>) => {
      state.transactionResult = action.payload;
    },
    resetTransaction: (state) => {
      state.transactionId = null;
      state.status = null;
      state.paymentStatus = null;
      state.error = null;
      state.loading = false;
      state.transactionResult = null;
    },
  },
});

export const {
  setTransactionId,
  setStatus,
  setPaymentStatus,
  setError,
  setLoading,
  setTransactionResult,
  resetTransaction,
} = transactionSlice.actions;
export default transactionSlice.reducer;
export type { TransactionState };
