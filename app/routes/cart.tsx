import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Shopping Cart" }];
};

export default function Cart() {
  return (
    <div>
      <h1>Shopping Cart</h1>
    </div>
  );
}