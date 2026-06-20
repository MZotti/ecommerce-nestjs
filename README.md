# Zotti E-commerce

A full-stack e-commerce platform built with a microservices backend and a modern React frontend.

## Architecture

```
ecommerce/
├── back/   # NestJS microservices API
└── front/  # React + Vite frontend
```

The backend follows a **microservices architecture** where each domain runs as an independent service communicating via **RabbitMQ**. The frontend is a **single-page application** that consumes the API Gateway.

### Services

| Service | Responsibility |
|---|---|
| `api-gateway` | Single entry point — routes requests to downstream services |
| `auth-service` | Authentication, users, roles, addresses, payment cards |
| `products-service` | Product catalogue and categories |
| `orders-service` | Order lifecycle and payments |

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL
- RabbitMQ

### Running

```bash
# Backend
cd back
yarn install
yarn start:api      # API Gateway
yarn start:auth     # Auth service
yarn start:products # Products service
yarn start:orders   # Orders service

# Frontend
cd front
yarn install
yarn dev
```

### Database

```bash
cd back
yarn prisma:generate   # Generate Prisma client
yarn prisma:migrate    # Run migrations
yarn prisma:seed       # Seed initial data
```

## Tech Stack

| Layer | Technologies |
|---|---|
| Backend | NestJS, TypeScript, Prisma, PostgreSQL, RabbitMQ, JWT |
| Frontend | React 19, Vite, Chakra UI, Redux Toolkit, React Query |
