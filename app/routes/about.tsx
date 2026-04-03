import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "About - The Online Store" }];
};

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>

      <p className="text-gray-600 leading-relaxed mb-4">
        Welcome to The Online Store — your destination for quality products at
        great prices. We believe shopping should be simple, enjoyable, and
        accessible to everyone.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Founded with a passion for connecting people with the products they
        love, we curate a wide selection across multiple categories — from
        electronics and fashion to home essentials and beauty.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">
        Why Shop With Us
      </h2>

      <ul className="space-y-3 text-gray-600">
        <li className="flex items-start gap-2">
          <span className="font-medium text-gray-900">Wide Selection</span> —
          Hundreds of products across dozens of categories.
        </li>
        <li className="flex items-start gap-2">
          <span className="font-medium text-gray-900">Best Prices</span> —
          Competitive pricing with regular discounts.
        </li>
        <li className="flex items-start gap-2">
          <span className="font-medium text-gray-900">Fast Shipping</span> —
          Quick and reliable delivery to your door.
        </li>
        <li className="flex items-start gap-2">
          <span className="font-medium text-gray-900">Easy Returns</span> —
          Hassle-free return policy on all orders.
        </li>
      </ul>
    </div>
  );
}
