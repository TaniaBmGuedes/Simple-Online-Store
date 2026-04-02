import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SimpleStore - Products" },
    { name: "description", content: "Browse our products" },
  ];
}
  
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}