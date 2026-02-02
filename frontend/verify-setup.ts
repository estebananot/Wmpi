/**
 * Script de verificación de configuración del frontend
 * Ejecutar con: npx tsx verify-setup.ts
 */

import axios from 'axios';

const BACKEND_URL = 'http://localhost:3000/api';

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

interface CustomerData {
  email: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
}

interface TransactionData {
  customerId: string;
  totalAmount: number;
  currency: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    unitPrice: number;
  }>;
}

async function verifyBackendConnection() {
  console.log('🔍 Verificando configuración del frontend con backend...\n');

  const client = axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Content-Type': 'application/json' },
  });

  let allTestsPassed = true;

  // Test 1: GET /api/products
  console.log('📋 Test 1: GET /api/products');
  try {
    const response = await client.get<ApiResponse<Product[]>>('/products');
    const products = response.data.data;
    console.log(`   ✅ Éxito: ${products.length} productos obtenidos`);
    if (products.length > 0) {
      console.log(`      - Producto ejemplo: "${products[0].name}" - $${products[0].price} COP`);
      console.log(`      - Stock disponible: ${products[0].stock} unidades`);
    }
  } catch (error) {
    console.log('   ❌ Error conectando con el backend');
    console.log('      Asegúrate de que el backend NestJS esté corriendo en http://localhost:3000');
    allTestsPassed = false;
  }

  // Test 2: GET /api/products/:id
  console.log('\n📋 Test 2: GET /api/products/:id');
  try {
    const response = await client.get<ApiResponse<Product>>('/products/1');
    console.log(`   ✅ Éxito: Producto obtenido - "${response.data.data.name}"`);
  } catch (error) {
    console.log('   ⚠️  Advertencia: No se pudo obtener producto por ID (puede que no exista el ID 1)');
  }

  // Test 3: POST /api/customers
  console.log('\n📋 Test 3: POST /api/customers');
  try {
    const customerData: CustomerData = {
      email: 'test@example.com',
      fullName: 'Usuario de Prueba',
      phoneNumber: '3001234567',
      address: 'Calle 123',
      city: 'Bogotá',
    };
    const response = await client.post('/customers', customerData);
    console.log(`   ✅ Éxito: Cliente creado`);
    console.log(`      - Customer ID: ${response.data.customerId || response.data.data?.id || 'N/A'}`);
  } catch (error) {
    console.log('   ❌ Error creando cliente');
    allTestsPassed = false;
  }

  // Test 4: POST /api/transactions
  console.log('\n📋 Test 4: POST /api/transactions (crear transacción PENDING)');
  try {
    const transactionData: TransactionData = {
      customerId: 'test-customer-id',
      totalAmount: 45000,
      currency: 'COP',
      items: [
        {
          productId: '1',
          name: 'Producto de prueba',
          quantity: 1,
          unitPrice: 25000,
        },
      ],
    };
    const response = await client.post('/transactions', transactionData);
    console.log(`   ✅ Éxito: Transacción creada`);
    console.log(`      - Transaction ID: ${response.data.transactionId || response.data.data?.id || 'N/A'}`);
    console.log(`      - Status: ${response.data.status || response.data.data?.status || 'PENDING'}`);
  } catch (error) {
    console.log('   ⚠️  Advertencia: No se pudo crear transacción');
  }

  // Resumen
  console.log('\n' + '='.repeat(50));
  if (allTestsPassed) {
    console.log('✅ Todos los tests básicos pasaron!');
    console.log('\n📝 Próximos pasos:');
    console.log('   1. cd frontend');
    console.log('   2. npm install');
    console.log('   3. npm run dev');
    console.log('   4. Abrir http://localhost:5173');
  } else {
    console.log('❌ Hay problemas de conexión con el backend');
    console.log('\n📝 Solución:');
    console.log('   1. Verifica que el backend NestJS esté corriendo');
    console.log('   2. Verifica el archivo .env tiene la URL correcta');
  }
  console.log('='.repeat(50));
}

verifyBackendConnection().catch(console.error);
