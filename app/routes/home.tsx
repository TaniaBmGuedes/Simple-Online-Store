import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SimpleStore - Products" },
    { name: "description", content: "Browse our products" },
  ];
}

// TODO: loader to fetch products and categories from https://dummyjson.com/products
// export async function loader({ request }: Route.LoaderArgs) {}

export default function Home() {
  return (
    <div>
      <h1>Products</h1>
      {/* TODO: Filters (category), sorting, product grid, pagination */}
    </div>
  );
}