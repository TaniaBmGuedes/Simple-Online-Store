import {
  json,
  type ActionFunction,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react/dist/components";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  removeFromCart,
  updateCartItem,
  type CartItem,
} from "utils/cart.server";
import { getCart } from "utils/get-cart";

export const meta: MetaFunction = () => {
  return [{ title: "Shopping Cart - The Online Store" }];
};
export async function loader({ request }: LoaderFunctionArgs) {
  const cart = await getCart(request);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return json({ cart, total });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const id = Number(formData.get("id"));
  let cookie: string;
  if (intent === "update") {
    const quantity = Number(formData.get("quantity"));
    cookie = await updateCartItem(request, id, quantity);
  } else if (intent === "remove") {
    cookie = await removeFromCart(request, id);
  } else {
    return json({ error: "Invalid intent" }, { status: 400 });
  }
  return json({ success: true }, { headers: { "Set-Cookie": cookie } });
}
export default function Cart() {
  const { cart, total } = useLoaderData<typeof loader>();
  const shipping = 20;
  const grandTotal = total + shipping;
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mb-8">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          to="/"
          className="inline-block bg-gray-900 text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 divide-y divide-gray-200">
          {cart.map((item: CartItem) => (
            <div key={item.id} className="flex gap-6 py-6">
              <Link
                to={`/products/${item.id}`}
                className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-25 h-25 object-cover rounded bg-gray-100"
                />
              </Link>
              <div className="flex-1">
                <Link
                  to={`/products/${item.id}`}
                  className="font-medium text-gray-900 hover:underline"
                >
                  {item.title}
                </Link>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  ${item.price.toFixed(2)}
                </p>

                <div className="flex items-center gap-4 mt-6">
                  <div className="flex items-center border border-gray-300 rounded-full">
                    <Form method="post">
                      <input type="hidden" name="intent" value="update"></input>
                      <input type="hidden" name="id" value={item.id}></input>
                      <input
                        type="hidden"
                        name="quantity"
                        value={item.quantity - 1}
                      />
                      <button
                        type="submit"
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-l-full"
                      >
                        <Minus className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                      </button>
                    </Form>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <Form method="post">
                      <input type="hidden" name="intent" value="update"></input>
                      <input type="hidden" name="id" value={item.id}></input>
                      <input
                        type="hidden"
                        name="quantity"
                        value={item.quantity + 1}
                      />
                      <button
                        type="submit"
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-l-full"
                      >
                        <Plus className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                      </button>
                    </Form>
                  </div>
                  <Form method="post">
                    <input type="hidden" name="intent" value="remove" />
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      className="text-gray-400 hover:text-gray-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
