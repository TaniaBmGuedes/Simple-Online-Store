import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Blog - The Online Store" }];
};

export default function Blog() {
  return (
    <div>
      <h1>Blog</h1>
    </div>
  );
}
