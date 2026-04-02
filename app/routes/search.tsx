import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Search - The Online Store" }];
};

export default function Search() {
  return (
    <div>
      <h1>Search</h1>
    </div>
  );
}