# E-Commerce Checkout con Wompi

Sistema de e-commerce con integración de pagos Wompi. Aplicación full-stack con frontend React y backend NestJS.

## 🎯 Descripción

Aplicación de checkout para e-commerce que permite:
- Visualizar catálogo de productos
- Proceso de compra con formularios de cliente, envío y pago
- Integración con pasarela de pagos Wompi (Sandbox)
- Confirmación de transacciones en tiempo real

## 🏗️ Arquitectura

```
wompi/
├── backend/          # API REST con NestJS
├── frontend/         # SPA con React + Redux
├── BACKEND_SPEC.md   # Especificación del backend
└── FRONTEND_SPEC.md  # Especificación del frontend
```

## 🛠️ Tech Stack

| Componente | Tecnología |
|------------|------------|
| Frontend | React 18, TypeScript, Redux Toolkit, Vite |
| Backend | NestJS 11, TypeScript, TypeORM |
| Base de Datos | PostgreSQL 16 |
| Pagos | Wompi API (Sandbox) |
| Arquitectura | Hexagonal + Ports & Adapters |

## 🚀 Quick Start

### Prerrequisitos
- Node.js 18+
- Docker (para PostgreSQL)
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone <repo-url>
cd wompi
```

### 2. Backend
```bash
cd backend
docker-compose up -d      # PostgreSQL
npm install
npm run seed              # Seed productos
npm run start:dev         # http://localhost:3000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev               # http://localhost:5173
```

## 📚 Documentación

- **Swagger API**: http://localhost:3000/api/docs
- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

## 🔗 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/products | Lista productos |
| GET | /api/products/:id | Detalle producto |
| POST | /api/customers | Crear cliente |
| POST | /api/transactions | Crear transacción |
| POST | /api/transactions/:id/payment | Procesar pago |
| GET | /api/transactions/:id | Estado transacción |

## 📱 Flujo de Usuario

1. **Catálogo** → Ver productos disponibles
2. **Selección** → Elegir producto y cantidad
3. **Datos Cliente** → Nombre, email, teléfono
4. **Dirección** → Datos de envío
5. **Pago** → Tarjeta de crédito (tokenización Wompi)
6. **Confirmación** → Resumen y pago
7. **Resultado** → Éxito o error con detalles

## 🧪 Testing

```bash
# Backend
cd backend
npm run test
npm run test:cov

# Frontend
cd frontend
npm run test
npm run test:coverage
```

## 📦 Deployment

El proyecto está preparado para deployment en AWS:
- **Frontend**: S3 + CloudFront
- **Backend**: Lambda/ECS + RDS PostgreSQL

Ver instrucciones detalladas en cada README.

---

**Versión**: 1.0.0  
**Última actualización**: Febrero 2026
