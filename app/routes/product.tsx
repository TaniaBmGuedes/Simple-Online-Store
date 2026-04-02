import type { Route } from "./+types/product";

export function meta({ data }: Route.MetaArgs) {
  return [{ title: "Product Detail - SimpleStore" }];
}

// TODO: loader to fetch single product from https://dummyjson.com/products/:id
// export async function loader({ params }: Route.LoaderArgs) {}

export default function ProductDetail() {
  return (
    <div>
      <h1>Product Detail</h1>
      {/* TODO: Product images, info, price, reviews, "Add to Cart" button */}
    </div>
  );
}
