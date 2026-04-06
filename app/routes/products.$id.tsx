import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { ProductDetail } from "types/product";
import { StarRating } from "utils/star-rating";
import type { Review } from "types/review";
import { addToCart } from "utils/cart.server";
import { ShoppingBag } from "lucide-react";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data ? `${data.product.title} - The Online Store` : "Product" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);
  if (!res.ok) {
    throw json({ message: "Product not found" }, { status: 404 });
  }
  const product: ProductDetail = await res.json();
  return json({ product });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = Number(params.id);
  const title = String(formData.get("title"));
  const price = Number(formData.get("price"));
  const thumbnail = String(formData.get("thumbnail"));
  const cookie = await addToCart(request, { id, title, price, thumbnail });
  return json({ success: true }, { headers: { "Set-Cookie": cookie } });
}
export default function ProductDetail() {
  const { product } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="hover:text-gray-900 text-sm"
      >
        &larr; Back
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.images[0] || product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
          {product.discountPercentage > 0 ? (
            <div className="flex items-center gap-3 mt-2">
              <p className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-lg text-gray-400 line-through">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </p>
              <span className="text-sm bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                -{product.discountPercentage.toFixed(0)}%
              </span>
            </div>
          ) : (
            <p className="text-2xl font-bold text-gray-900 mt-2">
              ${product.price.toFixed(2)}
            </p>
          )}
          <Form method="post">
            <input type="hidden" name="title" value={product.title} />
            <input type="hidden" name="price" value={product.price} />
            <input type="hidden" name="thumbnail" value={product.thumbnail} />
            <input type="hidden" name="title" value={product.title} />

            <button
              type="submit"
              className="w-full flex justify-center mt-6 bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-mono text-sm gap-4"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </button>
          </Form>
          <p
            className={`text-sm mt-2 ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
          >
            {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
          </p>

          <hr className="my-6 border-gray-200" />
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Product Details
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
      {product.reviews.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Reviews ({product.reviews.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.reviews.map((review: Review, i: number) => (
              <div key={i} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-900">
                    {review.reviewerName}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <StarRating rating={review.rating} />
                <p className="text-sm text-gray-600 mt-3">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
