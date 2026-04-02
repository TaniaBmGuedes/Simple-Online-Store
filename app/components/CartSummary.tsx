export function CartSummary({
  subTotal,
  shipping,
}: {
  subTotal: number;
  shipping: number;
}) {
  const total = subTotal + shipping;
  const s = shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`;
  return (
    <div className="w-full max-w-100 border border-gray-900 rounded-lg p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Cart Summary</h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-700">Subtotal</span>
          <span className="text-gray-900">${subTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">Shipping</span>
          <span className="text-gray-900">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between  text-lg">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">${total.toFixed(2)}</span>
        </div>
      </div>
      <button className="w-full mt-6 bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-mono text-sm">
        Check out
      </button>
      <p className="text-center text-sm text-gray-500 mt-3">
        Or pay with PayPal
      </p>
       <hr className="my-6 border-gray-200" />

      <div>
        <p className="text-sm font-medium text-gray-900 mb-2">Promo code</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter code"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
