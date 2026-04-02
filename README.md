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
├── components/     # Reusable UI components
├── routes/         # Remix file-based routes
├── root.tsx        # Root layout component
└── app.css         # Global styles
```

## API

This project uses [DummyJSON](https://dummyjson.com) as the product data source.