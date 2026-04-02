import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
  import { json } from "@remix-run/node";
  import { Link, useLoaderData, useSearchParams } from "@remix-run/react";

  interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    category: string;
  }

  interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }

  interface Category {
    slug: string;
    name: string;
  }

  const PRODUCTS_PER_PAGE = 9;

  export const meta: MetaFunction = () => {
    return [
      { title: "The Online Store - Products" },
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

    // Build product fetch URL
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
    const categories: Category[] = await categoriesRes.json();

    return json({
      products: productsData.products,
      total: productsData.total,
      page,
      totalPages: Math.ceil(productsData.total / PRODUCTS_PER_PAGE),
      categories,
    });
  }

  export default function Home() {
    const { products, total, page, totalPages, categories } =
      useLoaderData<typeof loader>();
    const [searchParams] = useSearchParams();

    const currentSort = searchParams.get("sortBy") || "";
    const currentOrder = searchParams.get("order") || "asc";
    const currentCategory = searchParams.get("category") || "";

    // Build URL with updated params
    function buildUrl(params: Record<string, string>) {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });
      return `/?${newParams.toString()}`;
    }

    const start = (page - 1) * 9 + 1;
    const end = Math.min(page * 9, total);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          {/* Sort dropdown */}
          <div className="relative">
            <select
              defaultValue={`${currentSort}-${currentOrder}`}
              onChange={(e) => {
                const [sortBy, order] = e.target.value.split("-");
                window.location.href = buildUrl({
                  sortBy,
                  order,
                  page: "1",
                });
              }}
              className="appearance-none border border-gray-300 rounded-full px-4 py-2 pr-8 text-sm text-gray-700 bg-white cursor-pointer"
            >
              <option value="-">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title-asc">Name: A to Z</option>
              <option value="title-desc">Name: Z to A</option>
              <option value="rating-desc">Rating: Best first</option>
            </select>
          </div>

          {/* Showing count */}
          <p className="text-sm text-gray-500">
            Showing {start}-{end} of {total}
          </p>

          {/* Category filter */}
          <div className="relative">
            <select
              defaultValue={currentCategory}
              onChange={(e) => {
                window.location.href = buildUrl({
                  category: e.target.value,
                  page: "1",
                });
              }}
              className="appearance-none border border-gray-300 rounded-full px-4 py-2 pr-8 text-sm text-gray-700 bg-white cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  {product.category}
                </p>
                <h2 className="text-sm font-medium text-gray-900 mb-2">
                  {product.title}
                </h2>
                <p className="text-sm font-semibold text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 mt-8">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <Link
                  key={pageNum}
                  to={buildUrl({ page: String(pageNum) })}
                  className={`w-8 h-8 flex items-center justify-center rounded text-sm ${
                    pageNum === page
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </Link>
              );
            })}

            {page < totalPages && (
              <Link
                to={buildUrl({ page: String(page + 1) })}
                className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded"
              >
                <span className="text-lg">&rsaquo;</span>
              </Link>
            )}
          </div>
        )}
      </div>
    );
  }