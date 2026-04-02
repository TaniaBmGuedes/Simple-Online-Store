# The Online Store

A simple e-commerce application built with Remix v2, featuring product browsing, product detail pages, and a shopping cart.

## Technologies

| Technology | Version | Purpose |
|---|---|---|
| [Remix](https://remix.run) | 2 | Full-stack framework with file-based routing, SSR, loaders & actions |
| [React](https://react.dev) | 18 | UI library for building component-based interfaces |
| [TypeScript](https://www.typescriptlang.org) | 5.9 | Static type checking and improved developer experience |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Utility-first CSS framework for rapid styling |
| [Vite](https://vite.dev) | 7 | Fast build tool and development server with HMR |
| [Lucide React](https://lucide.dev) | 1 | Icon library |
| [ESLint](https://eslint.org) | 9 | Code linting with TypeScript support |
| [Husky](https://typicode.github.io/husky) | 9 | Git hooks to enforce lint checks before commits |

## Prerequisites

- [Node.js](https://nodejs.org) >= 18
- npm >= 9

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/TaniaBmGuedes/ltp-simple-online-store.git
cd ltp-simple-online-store
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm start` | Run the production server |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |

## Project Structure

```
app/
├── components/     # Reusable UI components (Header, CartSummary)
├── routes/
│   ├── _index.tsx        # Homepage with product grid, search, sort, filter, pagination
│   ├── products.$id.tsx  # Product detail page with reviews and add to cart
│   └── cart.tsx          # Shopping cart with quantity controls
├── root.tsx              # Root layout with header and cart count
└── app.css               # Global styles and theme variables
types/                    # TypeScript type definitions
utils/                    # Server utilities (cart session, URL builder, star rating)
```

## Features

- Product listing with grid layout
- Search products by name
- Sort by price, name, or rating
- Filter by category
- Pagination with smart page numbers
- Product detail page with image, stock info, and reviews
- Discount prices with original price strikethrough and percentage badge
- Shopping cart with cookie-based session storage
- Quantity controls and item removal
- Cart summary with subtotal, shipping, and promo code input
- Pre-commit hook to enforce lint checks

## API

This project uses [DummyJSON](https://dummyjson.com) as the product data source.