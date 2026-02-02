# FRONTEND SPECIFICATION - Wompi E-Commerce Checkout (ACTUALIZADO)

## 🎯 PROJECT OVERVIEW
Build a Single Page Application (SPA) for an e-commerce checkout flow with Wompi payment integration.

**IMPORTANTE**: Esta especificación está actualizada según la implementación REAL del backend.

**Tech Stack:**
- Framework: React 18+ with TypeScript
- State Management: Redux Toolkit (mandatory)
- Routing: React Router v6
- HTTP Client: Axios
- Styling: CSS Modules + Flexbox/Grid (or Tailwind CSS)
- Testing: Jest + React Testing Library (>80% coverage required)
- Build: Vite or Create React App

**Design Requirements:**
- Mobile-first responsive design
- Minimum screen: iPhone SE (375px width)
- Support for desktop (up to 1920px)
- Modern, clean UI/UX

---

## 🔗 BACKEND API ACTUALIZADO

**Base URL Local**: `http://localhost:3000/api`
**Base URL Producción**: (Tu deployment URL)

### Endpoints Disponibles

#### Products
```
GET /api/products
GET /api/products/:id
```

#### Customers
```
POST /api/customers
GET /api/customers/:id
```

#### Transactions
```
POST /api/transactions
GET /api/transactions/:id
POST /api/transactions/:id/payment
```

---

## 📁 PROJECT STRUCTURE

```
frontend/
├── public/
│   ├── index.html
│   └── assets/
│       └── images/
├── src/
│   ├── app/                      # App configuration
│   │   ├── store.ts              # Redux store
│   │   └── App.tsx
│   │
│   ├── features/                 # Feature modules
│   │   ├── products/
│   │   │   ├── components/
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   └── ProductList.tsx
│   │   │   ├── pages/
│   │   │   │   └── ProductPage.tsx
│   │   │   ├── productsSlice.ts
│   │   │   └── productsAPI.ts
│   │   │
│   │   ├── checkout/
│   │   │   ├── components/
│   │   │   │   ├── PaymentModal.tsx
│   │   │   │   ├── CreditCardForm.tsx
│   │   │   │   ├── DeliveryForm.tsx
│   │   │   │   ├── SummaryBackdrop.tsx
│   │   │   │   └── CardDetector.tsx
│   │   │   ├── pages/
│   │   │   │   └── CheckoutPage.tsx
│   │   │   ├── checkoutSlice.ts
│   │   │   └── checkoutAPI.ts
│   │   │
│   │   ├── transaction/
│   │   │   ├── components/
│   │   │   │   ├── StatusCard.tsx
│   │   │   │   └── TransactionDetails.tsx
│   │   │   ├── pages/
│   │   │   │   └── StatusPage.tsx
│   │   │   └── transactionSlice.ts
│   │   │
│   │   └── common/
│   │       ├── components/
│   │       │   ├── Button.tsx
│   │       │   ├── Input.tsx
│   │       │   ├── Modal.tsx
│   │       │   ├── Backdrop.tsx
│   │       │   ├── Loader.tsx
│   │       │   └── ErrorMessage.tsx
│   │       └── hooks/
│   │           ├── useLocalStorage.ts
│   │           └── useDebounce.ts
│   │
│   ├── services/                 # API services
│   │   ├── api.ts                # Axios instance
│   │   ├── productsService.ts
│   │   ├── customersService.ts
│   │   ├── transactionsService.ts
│   │   └── wompiService.ts
│   │
│   ├── types/                    # TypeScript types
│   │   ├── product.types.ts
│   │   ├── customer.types.ts
│   │   ├── transaction.types.ts
│   │   ├── checkout.types.ts
│   │   └── api.types.ts
│   │
│   ├── utils/                    # Utilities
│   │   ├── cardValidation.ts
│   │   ├── formatters.ts
│   │   ├── constants.ts
│   │   └── storage.ts
│   │
│   ├── styles/                   # Global styles
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── mixins.css
│   │
│   ├── index.tsx
│   └── index.css
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── setup.ts
│
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🎨 USER FLOW (5 SCREENS)

### 1. Product Page (Initial State)
**Route:** `/`

**Purpose:** Display product with stock availability

**Elements:**
- Product image (responsive)
- Product name and description
- Price (formatted COP)
- Stock availability indicator
- "Buy Now" button (disabled if stock = 0)

**State:**
```typescript
{
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
  },
  loading: boolean;
  error: string | null;
}
```

---

### 2. Payment Modal (Credit Card + Delivery)
**Triggered by:** "Buy Now" button

**Purpose:** Collect payment and delivery information + create customer

**Flow:**
1. **Customer Info Tab:**
   - Name
   - Email
   - Phone (optional)
   
2. **Delivery Info Tab:**
   - Address (required, min 10 chars)
   - City (required)
   - Department (optional)
   - Postal Code (optional)

3. **Credit Card Tab:**
   - Card number (with Visa/Mastercard logo detection)
   - Cardholder name
   - Expiry date (MM/YY)
   - CVV
   - Live validation feedback

**State:**
```typescript
{
  currentStep: 'customer' | 'delivery' | 'payment';
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  deliveryInfo: {
    address: string;
    city: string;
    department?: string;
    postalCode?: string;
  };
  paymentInfo: {
    cardNumber: string;
    cardHolder: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    cardType: 'visa' | 'mastercard' | null;
  };
  validationErrors: Record<string, string>;
}
```

---

### 3. Summary Backdrop
**Route:** `/checkout/summary`

**Purpose:** Show payment breakdown and confirm purchase

**IMPORTANTE - Cálculo de Fees según Backend Real:**
```typescript
const baseFee = 2000;  // FIJO por transacción
const deliveryFee = 5000 * quantity;  // 5000 COP por unidad
const productAmount = product.price * quantity;
const totalAmount = productAmount + baseFee + deliveryFee;
```

**Summary Details:**
```
Product: iPhone 14 Pro              $4,500,000
Quantity: 2
─────────────────────────────────────────────
Product Amount (2x):                $9,000,000
Base Fee:                               $2,000
Delivery Fee (2x):                     $10,000
─────────────────────────────────────────────
Total:                              $9,012,000

[Confirm Payment] [Cancel]
```

---

### 4. Payment Processing & Status Page
**Route:** `/transaction/:id/status`

**Purpose:** Show transaction result

**Flow Actualizado según Backend:**
```
1. Crear cliente (POST /api/customers)
   → Obtener customerId

2. Tokenizar tarjeta con Wompi (frontend directo)
   → Obtener cardToken

3. Crear transacción PENDING (POST /api/transactions)
   → Body: {
       customerId,
       productId,
       quantity,
       deliveryInfo: { address, city, department?, postalCode? }
     }
   → Obtener transactionId

4. Procesar pago (POST /api/transactions/:id/payment)
   → Body: {
       cardToken,
       customerEmail,
       acceptanceToken
     }
   → Backend actualiza estado a APPROVED/DECLINED/ERROR

5. Mostrar resultado
```

**Status Types:**
- ✅ **APPROVED:** Success message, transaction details
- ❌ **DECLINED:** Error message, reason if available
- ⚠️ **ERROR:** Technical error, retry option
- ⏳ **PENDING:** Loading spinner (estado inicial)

**Success Display:**
```
✅ Payment Successful!

Transaction #: TXN-1706881200000-123
Amount: $9,012,000 COP
Status: Approved
Date: Feb 2, 2026 10:30 AM

Product:
iPhone 14 Pro (x2)
$9,000,000

Delivery to:
Juan Pérez
Calle 123 # 45-67
Bogotá, Cundinamarca
Phone: +57 300 123 4567

[Return to Products]
```

---

### 5. Return to Product Page (Updated Stock)
**Route:** `/`

**Purpose:** Show product with updated stock

**State Changes:**
- Stock decreased by purchased quantity
- Product page refreshed
- Checkout state cleared

---

## 🔌 TIPOS TYPESCRIPT ACTUALIZADOS

### product.types.ts
```typescript
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;  // En COP
  stock: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsState {
  currentProduct: Product | null;
  products: Product[];
  loading: boolean;
  error: string | null;
}
```

### customer.types.ts
```typescript
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export interface CreateCustomerDto {
  name: string;
  email: string;
  phone?: string;
}
```

### transaction.types.ts
```typescript
export interface Transaction {
  id: string;
  transactionNumber: string;
  customerId: string;
  productId: string;
  quantity: number;
  productAmount: number;
  baseFee: number;
  deliveryFee: number;
  totalAmount: number;
  status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'ERROR';
  wompiTransactionId?: string;
  wompiReference?: string;
  paymentMethod?: string;
  product: {
    id: string;
    name: string;
    price: number;
  };
  customer: {
    id: string;
    name: string;
    email: string;
  };
  delivery: {
    id: string;
    address: string;
    city: string;
    department?: string;
    postalCode?: string;
    deliveryStatus: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionDto {
  customerId: string;
  productId: string;
  quantity: number;
  deliveryInfo: {
    address: string;
    city: string;
    department?: string;
    postalCode?: string;
  };
}

export interface ProcessPaymentDto {
  cardToken: string;
  customerEmail: string;
  acceptanceToken: string;
}
```

### checkout.types.ts
```typescript
export interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardType: 'visa' | 'mastercard' | null;
}

export interface DeliveryInfo {
  address: string;
  city: string;
  department?: string;
  postalCode?: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone?: string;
}

export type CheckoutStep = 'customer' | 'delivery' | 'payment' | 'summary' | 'processing' | 'complete';

export interface CheckoutState {
  step: CheckoutStep;
  customerInfo: CustomerInfo | null;
  deliveryInfo: DeliveryInfo | null;
  paymentInfo: PaymentInfo | null;
  customerId: string | null;  // Guardamos el ID después de crear el customer
  quantity: number;
  validationErrors: Record<string, string>;
}
```

---

## 🌐 API SERVICES ACTUALIZADOS

### api.ts
```typescript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data);
    return Promise.reject(error);
  }
);

export default api;
```

### productsService.ts
```typescript
import api from './api';
import { Product } from '../types/product.types';

export const productsService = {
  async getProducts(): Promise<Product[]> {
    const response = await api.get<{ data: Product[] }>('/products');
    return response.data.data;
  },

  async getProduct(id: string): Promise<Product> {
    const response = await api.get<{ data: Product }>(`/products/${id}`);
    return response.data.data;
  },
};
```

### customersService.ts
```typescript
import api from './api';
import { Customer, CreateCustomerDto } from '../types/customer.types';

export const customersService = {
  async createCustomer(data: CreateCustomerDto): Promise<Customer> {
    const response = await api.post<{ data: Customer }>('/customers', data);
    return response.data.data;
  },

  async getCustomer(id: string): Promise<Customer> {
    const response = await api.get<{ data: Customer }>(`/customers/${id}`);
    return response.data.data;
  },
};
```

### transactionsService.ts
```typescript
import api from './api';
import { 
  Transaction, 
  CreateTransactionDto, 
  ProcessPaymentDto 
} from '../types/transaction.types';

export const transactionsService = {
  async createTransaction(data: CreateTransactionDto): Promise<Transaction> {
    const response = await api.post<{ data: Transaction }>(
      '/transactions', 
      data
    );
    return response.data.data;
  },

  async getTransaction(id: string): Promise<Transaction> {
    const response = await api.get<{ data: Transaction }>(
      `/transactions/${id}`
    );
    return response.data.data;
  },

  async processPayment(
    transactionId: string, 
    data: ProcessPaymentDto
  ): Promise<Transaction> {
    const response = await api.post<{ data: Transaction }>(
      `/transactions/${transactionId}/payment`,
      data
    );
    return response.data.data;
  },
};
```

### wompiService.ts
```typescript
import axios from 'axios';

const WOMPI_API_URL = import.meta.env.VITE_WOMPI_API_URL || 
  'https://api-sandbox.co.uat.wompi.dev/v1';
const WOMPI_PUBLIC_KEY = import.meta.env.VITE_WOMPI_PUBLIC_KEY || 
  'pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7';

interface CardData {
  number: string;
  cvc: string;
  exp_month: string;
  exp_year: string;
  card_holder: string;
}

export const wompiService = {
  /**
   * Tokeniza una tarjeta de crédito
   * Esta operación se hace DIRECTAMENTE en el frontend
   */
  async tokenizeCard(cardData: CardData): Promise<string> {
    try {
      const response = await axios.post(
        `${WOMPI_API_URL}/tokens/cards`,
        {
          number: cardData.number.replace(/\s/g, ''),
          cvc: cardData.cvc,
          exp_month: cardData.exp_month,
          exp_year: cardData.exp_year,
          card_holder: cardData.card_holder,
        },
        {
          headers: {
            Authorization: `Bearer ${WOMPI_PUBLIC_KEY}`,
          },
        }
      );
      
      return response.data.data.id; // Token ID
    } catch (error: any) {
      console.error('Wompi tokenization error:', error.response?.data);
      throw new Error('Failed to tokenize card');
    }
  },

  /**
   * Obtiene el token de aceptación de términos
   */
  async getAcceptanceToken(): Promise<string> {
    try {
      const response = await axios.get(
        `${WOMPI_API_URL}/merchants/${WOMPI_PUBLIC_KEY}`
      );
      
      return response.data.data.presigned_acceptance.acceptance_token;
    } catch (error: any) {
      console.error('Wompi acceptance token error:', error.response?.data);
      throw new Error('Failed to get acceptance token');
    }
  },
};
```

---

## 🏪 REDUX STORE ACTUALIZADO

### checkoutSlice.ts
```typescript
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { customersService } from '../../services/customersService';
import { transactionsService } from '../../services/transactionsService';
import { wompiService } from '../../services/wompiService';
import { 
  CheckoutState, 
  CustomerInfo, 
  DeliveryInfo, 
  PaymentInfo 
} from '../../types/checkout.types';
import { Transaction } from '../../types/transaction.types';

const initialState: CheckoutState = {
  step: 'customer',
  customerInfo: null,
  deliveryInfo: null,
  paymentInfo: null,
  customerId: null,
  quantity: 1,
  validationErrors: {},
};

/**
 * FLUJO COMPLETO DE CHECKOUT
 */
export const processCheckout = createAsyncThunk(
  'checkout/processCheckout',
  async (params: {
    productId: string;
    customerInfo: CustomerInfo;
    deliveryInfo: DeliveryInfo;
    paymentInfo: PaymentInfo;
    quantity: number;
  }, { rejectWithValue }) => {
    try {
      // 1. Crear cliente
      const customer = await customersService.createCustomer({
        name: params.customerInfo.name,
        email: params.customerInfo.email,
        phone: params.customerInfo.phone,
      });

      // 2. Tokenizar tarjeta con Wompi
      const cardToken = await wompiService.tokenizeCard({
        number: params.paymentInfo.cardNumber,
        cvc: params.paymentInfo.cvv,
        exp_month: params.paymentInfo.expiryMonth,
        exp_year: params.paymentInfo.expiryYear,
        card_holder: params.paymentInfo.cardHolder,
      });

      // 3. Obtener acceptance token
      const acceptanceToken = await wompiService.getAcceptanceToken();

      // 4. Crear transacción (PENDING)
      const transaction = await transactionsService.createTransaction({
        customerId: customer.id,
        productId: params.productId,
        quantity: params.quantity,
        deliveryInfo: params.deliveryInfo,
      });

      // 5. Procesar pago
      const paymentResult = await transactionsService.processPayment(
        transaction.id,
        {
          cardToken,
          customerEmail: params.customerInfo.email,
          acceptanceToken,
        }
      );

      return paymentResult;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Checkout failed'
      );
    }
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<CheckoutState['step']>) => {
      state.step = action.payload;
    },
    
    setCustomerInfo: (state, action: PayloadAction<CustomerInfo>) => {
      state.customerInfo = action.payload;
      localStorage.setItem('checkout_customer', JSON.stringify(action.payload));
    },
    
    setDeliveryInfo: (state, action: PayloadAction<DeliveryInfo>) => {
      state.deliveryInfo = action.payload;
      localStorage.setItem('checkout_delivery', JSON.stringify(action.payload));
    },
    
    setPaymentInfo: (state, action: PayloadAction<PaymentInfo>) => {
      state.paymentInfo = action.payload;
      // NO guardar info de tarjeta en localStorage por seguridad
    },
    
    setQuantity: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload;
    },
    
    setValidationError: (
      state, 
      action: PayloadAction<{ field: string; error: string }>
    ) => {
      state.validationErrors[action.payload.field] = action.payload.error;
    },
    
    clearValidationErrors: (state) => {
      state.validationErrors = {};
    },
    
    restoreFromStorage: (state) => {
      const savedCustomer = localStorage.getItem('checkout_customer');
      const savedDelivery = localStorage.getItem('checkout_delivery');
      
      if (savedCustomer) {
        state.customerInfo = JSON.parse(savedCustomer);
      }
      if (savedDelivery) {
        state.deliveryInfo = JSON.parse(savedDelivery);
      }
    },
    
    clearCheckout: (state) => {
      state.customerInfo = null;
      state.deliveryInfo = null;
      state.paymentInfo = null;
      state.customerId = null;
      state.quantity = 1;
      state.step = 'customer';
      state.validationErrors = {};
      localStorage.removeItem('checkout_customer');
      localStorage.removeItem('checkout_delivery');
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(processCheckout.pending, (state) => {
        state.step = 'processing';
      })
      .addCase(processCheckout.fulfilled, (state) => {
        state.step = 'complete';
      })
      .addCase(processCheckout.rejected, (state) => {
        state.step = 'payment'; // Volver a payment para reintentar
      });
  },
});

export const {
  setStep,
  setCustomerInfo,
  setDeliveryInfo,
  setPaymentInfo,
  setQuantity,
  setValidationError,
  clearValidationErrors,
  restoreFromStorage,
  clearCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
```

---

## 🎨 CÁLCULO DE TOTALES

### utils/calculations.ts
```typescript
/**
 * Calcula el total de la transacción según las reglas del backend
 */
export const calculateTransactionTotal = (
  productPrice: number,
  quantity: number
) => {
  const BASE_FEE = 2000;  // Tarifa fija por transacción
  const DELIVERY_FEE_PER_UNIT = 5000;  // Por cada unidad
  
  const productAmount = productPrice * quantity;
  const deliveryFee = DELIVERY_FEE_PER_UNIT * quantity;
  const totalAmount = productAmount + BASE_FEE + deliveryFee;
  
  return {
    productAmount,
    baseFee: BASE_FEE,
    deliveryFee,
    totalAmount,
  };
};
```

---

## 📋 VALIDACIONES ACTUALIZADAS

### Customer Validations
```typescript
const validateCustomerInfo = (info: CustomerInfo): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!info.name || info.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!info.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (info.phone && !/^\+?[0-9]{10,}$/.test(info.phone.replace(/\s/g, ''))) {
    errors.phone = 'Invalid phone format';
  }
  
  return errors;
};
```

### Delivery Validations
```typescript
const validateDeliveryInfo = (info: DeliveryInfo): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!info.address || info.address.length < 10) {
    errors.address = 'Address must be at least 10 characters';
  }
  
  if (!info.city) {
    errors.city = 'City is required';
  }
  
  return errors;
};
```

---

## 🧪 TESTING ACTUALIZADO

### Ejemplo: checkoutSlice.test.ts
```typescript
import checkoutReducer, { 
  processCheckout, 
  setCustomerInfo 
} from '../checkoutSlice';

describe('checkoutSlice', () => {
  it('should handle setCustomerInfo', () => {
    const initialState = {
      customerInfo: null,
      // ... other fields
    };
    
    const customerInfo = {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      phone: '+573001234567',
    };
    
    const newState = checkoutReducer(
      initialState,
      setCustomerInfo(customerInfo)
    );
    
    expect(newState.customerInfo).toEqual(customerInfo);
  });
  
  it('should process full checkout flow', async () => {
    // Mock services
    // Test async thunk
  });
});
```

---

## 📦 ENVIRONMENT VARIABLES

```env
# .env
VITE_API_URL=http://localhost:3000/api
VITE_WOMPI_API_URL=https://api-sandbox.co.uat.wompi.dev/v1
VITE_WOMPI_PUBLIC_KEY=pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7
```

---

## 🚀 FLUJO COMPLETO IMPLEMENTACIÓN

```typescript
// Ejemplo en CheckoutPage.tsx

const handleCheckout = async () => {
  try {
    setLoading(true);
    
    // Dispatch el async thunk que maneja TODO el flujo
    const result = await dispatch(processCheckout({
      productId: product.id,
      customerInfo,
      deliveryInfo,
      paymentInfo,
      quantity,
    })).unwrap();
    
    // result es la Transaction con status APPROVED/DECLINED/ERROR
    navigate(`/transaction/${result.id}/status`);
    
  } catch (error) {
    console.error('Checkout error:', error);
    setError('Payment failed. Please try again.');
  } finally {
    setLoading(false);
  }
};
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

- [ ] Setup proyecto React + TypeScript
- [ ] Configurar Redux con slices actualizados
- [ ] Implementar todos los tipos TypeScript
- [ ] Crear servicios de API
- [ ] Implementar ProductPage
- [ ] Crear formulario de Customer Info
- [ ] Crear formulario de Delivery Info
- [ ] Crear formulario de Credit Card
- [ ] Implementar validación de tarjetas (Luhn)
- [ ] Crear SummaryBackdrop con cálculos correctos
- [ ] Implementar flujo completo de checkout
- [ ] Crear StatusPage
- [ ] Agregar persistencia en localStorage
- [ ] Implementar manejo de errores
- [ ] Agregar loading states
- [ ] Hacer responsive (mobile-first)
- [ ] Tests unitarios (>80% coverage)
- [ ] Tests de integración
- [ ] Documentación README

---

## 💡 NOTAS IMPORTANTES

1. **Base Fee es FIJO**: $2,000 COP por transacción (no por unidad)
2. **Delivery Fee es por unidad**: $5,000 COP × quantity
3. **Crear Customer PRIMERO**: Necesitas el customerId para la transacción
4. **Tokenización en Frontend**: Llamar directamente a Wompi API
5. **No guardar tarjetas**: Solo tokens en tránsito, nunca persistir
6. **Backend maneja el stock**: Se actualiza automáticamente al aprobar pago

---

## 📞 ENDPOINTS DEL BACKEND RESUMIDOS

```
Backend Base URL: http://localhost:3000/api

GET    /products              → Lista productos (stock > 0)
GET    /products/:id          → Detalle de producto
POST   /customers             → Crea cliente (retorna customerId)
GET    /customers/:id         → Detalle de cliente
POST   /transactions          → Crea transacción PENDING
GET    /transactions/:id      → Consulta transacción
POST   /transactions/:id/payment  → Procesa pago (retorna APPROVED/DECLINED/ERROR)
```

---

Esta especificación está 100% alineada con tu backend implementado. ¡Lista para usar con OpenCode! 🚀
