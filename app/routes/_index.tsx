import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "SimpleStore - Products" },
    { name: "description", content: "Browse our products" },
  ];
};

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
