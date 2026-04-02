import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { PRODUCTS_PER_PAGE } from "constants_values";
import type {
  Product,
  ProductsResponse,
} from "types/product";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { urlBuilder } from "utils/url-builder";
import type { Category } from "types/category";

export const meta: MetaFunction = () => {
  return [
    { title: "SimpleStore - Products" },
    { name: "description", content: "Browse our products" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || "1");
  const sortBy = url.searchParams.get("sortBy") || "";
  const order = url.searchParams.get("order") || "asc";
  const category = url.searchParams.get("category") || "";

  const skip = (page - 1) * PRODUCTS_PER_PAGE;

  let productsUrl: string;
  if (category) {
    productsUrl = `https://dummyjson.com/products/category/${category}?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
  } else {
    productsUrl = `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
  }
  if (sortBy) {
    productsUrl += `&sortBy=${sortBy}&order=${order}`;
  }

  const [productsRes, categoriesRes] = await Promise.all([
    fetch(productsUrl),
    fetch("https://dummyjson.com/products/categories"),
  ]);

  const productsData: ProductsResponse = await productsRes.json();
  const categoriesData: Category[] = await categoriesRes.json();

  return {
    products: productsData.products,
    total: productsData.total,
    page,
    totalPages: Math.ceil(productsData.total / PRODUCTS_PER_PAGE),
    categories: categoriesData,
  };
}

export default function Home() {
  const { products, total, page, totalPages, categories } =
    useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get("sortBy") || "";
  const currentOrder = searchParams.get("order") || "asc";
  const currentCategory = searchParams.get("category") || "";
  const start = (page - 1) * PRODUCTS_PER_PAGE + 1;
  const end = Math.min(page * PRODUCTS_PER_PAGE, total);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <select
              className="appearance-none border border-gray-300 rounded-full px-4 py-2 pr-8 text-sm text-gray-700 bg-white cursor-pointer"
              defaultValue={`${currentSort}-${currentOrder}`}
              onChange={(e) => {
                const [sortBy, order] = e.target.value.split("-");
                window.location.href = urlBuilder(
                  { sortBy, order, page: "1" },
                  searchParams,
                );
              }}
            >
              <option value="-">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title-asc">Name: A to Z</option>
              <option value="title-desc">Name: Z to A</option>
              <option value="rating-desc">Rating: Best first</option>
            </select>

            <p className="text-sm text-gray-500">
              Showing {start}-{end} of {total}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: Product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group"
              >
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h2 className="text-sm font-medium text-gray-900">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-900 mt-1">
                  ${product.price.toFixed(2)}
                </p>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-end gap-1 mt-8">
              {page > 1 && (
                <Link
                  to={urlBuilder({ page: String(page - 1) }, searchParams)}
                  className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded"
                >
                  <span className="text-lg">&lsaquo;</span>
                </Link>
              )}

              {page > 2 && (
                <Link
                  to={urlBuilder({ page: "1" }, searchParams)}
                  className="w-8 h-8 flex items-center justify-center rounded text-sm text-gray-700 hover:bg-gray-100"
                >
                  1
                </Link>
              )}

              {page > 3 && (
                <span className="w-8 h-8 flex items-center justify-center text-sm text-gray-400">
                  ...
                </span>
              )}

              {page > 1 && (
                <Link
                  to={urlBuilder({ page: String(page - 1) }, searchParams)}
                  className="w-8 h-8 flex items-center justify-center rounded text-sm text-gray-700 hover:bg-gray-100"
                >
                  {page - 1}
                </Link>
              )}

              <span className="w-8 h-8 flex items-center justify-center rounded text-sm bg-gray-900 text-white">
                {page}
              </span>

              {page < totalPages && (
                <Link
                  to={urlBuilder({ page: String(page + 1) }, searchParams)}
                  className="w-8 h-8 flex items-center justify-center rounded text-sm text-gray-700 hover:bg-gray-100"
                >
                  {page + 1}
                </Link>
              )}

              {page < totalPages - 2 && (
                <span className="w-8 h-8 flex items-center justify-center text-sm text-gray-400">
                  ...
                </span>
              )}

              {page < totalPages - 1 && (
                <Link
                  to={urlBuilder({ page: String(totalPages) }, searchParams)}
                  className="w-8 h-8 flex items-center justify-center rounded text-sm text-gray-700 hover:bg-gray-100"
                >
                  {totalPages}
                </Link>
              )}

              {page < totalPages && (
                <Link
                  to={urlBuilder({ page: String(page + 1) }, searchParams)}
                  className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded"
                >
                  <span className="text-lg">&rsaquo;</span>
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="hidden lg:block w-48 shrink-0">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Categories
          </h3>
          <div className="space-y-3">
            {categories.map((cat: Category) => (
              <label
                key={cat.slug}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={currentCategory === cat.slug}
                  onChange={() => {
                    const newCategory =
                      currentCategory === cat.slug ? "" : cat.slug;
                    window.location.href = urlBuilder(
                      { category: newCategory, page: "1" },
                      searchParams,
                    );
                  }}
                  className="w-4 h-4 rounded border-gray-300 text-gray-900"
                />
                <span className="text-sm text-gray-700">{cat.name}</span>
              </label>
            ))}
          </div>
          <hr className="mt-4 border-gray-200" />
        </div>
      </div>
    </div>
  );
}
