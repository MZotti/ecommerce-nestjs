# Backend — NestJS Microservices API

The backend is a **NestJS monorepo** structured as independent microservices. All external traffic enters through the **API Gateway**, which delegates to the appropriate service via RabbitMQ message queues.

## Services

### `api-gateway`
The single HTTP entry point. Exposes REST endpoints and forwards requests to downstream services over RabbitMQ.

### `auth-service`
Manages the entire authentication and user domain:
- Registration and login with JWT tokens
- Roles and permissions
- Customer profiles, addresses, and payment cards

### `products-service`
Manages the product catalogue:
- Products with slugs and categories
- Hierarchical category tree

### `orders-service`
Manages the order lifecycle:
- Order creation and status transitions (`PENDING → PAID → SHIPPED → FINISHED / CANCELED`)
- Payment records (PIX, credit/debit card, payment order)

## Running with Docker

The entire backend stack runs via **Docker Compose** — no local PostgreSQL or RabbitMQ installation required.

```bash
docker compose up --build
```

This spins up all services defined in `docker-compose.yml`:

| Container | Description | Port(s) |
|---|---|---|
| `db` | PostgreSQL 17 | `5432` |
| `rabbitmq` | RabbitMQ + Management UI | `5672`, `15672` |
| `api-gateway` | HTTP entry point | `3000` |
| `auth-service` | Auth microservice | — |
| `products-service` | Products microservice | — |
| `orders-service` | Orders microservice | — |
| `prisma-studio` | Database GUI | `5555` |

The microservices wait for RabbitMQ to be healthy before starting. The API Gateway is the only service that exposes an external port (`3000`).

### Database setup (first run)

```bash
docker compose exec auth-service yarn prisma:migrate
docker compose exec auth-service yarn prisma:seed
```

## Tech Stack

| Category | Technology |
|---|---|
| Framework | NestJS 11 |
| Language | TypeScript |
| ORM | Prisma 7 |
| Database | PostgreSQL |
| Message Broker | RabbitMQ (amqplib) |
| Authentication | Passport.js + JWT |
| Validation | class-validator / class-transformer |
| Password hashing | bcrypt |

## Project Structure

```
back/
├── apps/
│   ├── api-gateway/
│   ├── auth-service/
│   ├── orders-service/
│   └── products-service/
└── libs/
    ├── common/     # Shared DTOs, guards, decorators
    └── database/   # Prisma schema and client
```

## Scripts

```bash
# Prisma
yarn prisma:generate  # Generate Prisma client
yarn prisma:migrate   # Run database migrations
yarn prisma:studio    # Open Prisma Studio
yarn prisma:seed      # Seed the database
yarn prisma:reset     # Reset and reseed the database

# Tests (run locally)
yarn test             # Unit tests
yarn test:e2e         # End-to-end tests
yarn test:cov         # Test coverage

# Run services individually (without Docker)
yarn start:api        # API Gateway
yarn start:auth       # Auth service
yarn start:products   # Products service
yarn start:orders     # Orders service
```
