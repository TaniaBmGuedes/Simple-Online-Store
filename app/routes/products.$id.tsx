import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Product Detail" }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  return { id: params.id };
}

export default function ProductDetail() {
  const { id } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Product {id}</h1>
    </div>
  );
}