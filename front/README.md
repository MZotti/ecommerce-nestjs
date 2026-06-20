# Frontend — React SPA

The frontend is a **single-page application** that provides the e-commerce storefront and management interface. It communicates exclusively with the backend's API Gateway.

## Purpose

- Product browsing and catalogue
- User authentication and account management (addresses, payment cards)
- Shopping cart and checkout flow
- Order history and tracking
- Dashboard with sales charts and analytics

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Build tool | Vite |
| Language | TypeScript |
| UI library | Chakra UI 3 |
| State management | Redux Toolkit |
| Server state / caching | TanStack React Query 5 |
| HTTP client | Axios |
| Routing | React Router DOM 7 |
| Forms | React Hook Form + Yup |
| Charts | Recharts |
| Icons | Phosphor Icons |
| Date utilities | date-fns |

## Project Structure

```
front/src/
├── assets/       # Static assets
├── components/   # Reusable UI components
├── contexts/     # React contexts
├── hooks/        # Custom hooks
├── interfaces/   # TypeScript interfaces
├── layouts/      # Page layout wrappers
├── pages/        # Route-level page components
├── providers/    # App-level providers (query, store, theme)
├── routes/       # Route definitions
├── services/     # Axios API service layer
└── state/        # Redux slices and store
```

## Scripts

```bash
yarn dev      # Start development server (HMR)
yarn build    # Production build
yarn preview  # Preview production build locally
yarn lint     # Run ESLint
```
