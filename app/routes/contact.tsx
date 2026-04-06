import {
  json,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { Mail, MapPin, Phone } from "lucide-react";

export const meta: MetaFunction = () => {
  return [{ title: "Contact - The Online Store" }];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = String(formData.get("name"));
  const email = String(formData.get("email"));
  const message = String(formData.get("message"));
  if (!name || !email || !message) {
    return json({
      success: false,
      error: "Please fill in all required fields.",
    });
  }
  return json({ success: true });
}
export default function Contact() {
  const actionData = useActionData<typeof action>();
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
      <p className="text-gray-600 leading-relaxed mb-10">
        Have a question or need help with your order? We&apos;d love to hear
        from you. Reach out using any of the methods below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="border border-gray-200 rounded-lg p-6 text-center">
          <Mail className="w-6 h-6 text-gray-900 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Email</h3>
          <p className="text-sm text-gray-600">support@theonlinestore.com</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-6 text-center">
          <Phone className="w-6 h-6 text-gray-900 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Phone</h3>
          <p className="text-sm text-gray-600">+351 912 345 678</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-6 text-center">
          <MapPin className="w-6 h-6 text-gray-900 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Address</h3>
          <p className="text-sm text-gray-600">Lisbon, Portugal</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Send us a message
      </h2>
      {actionData?.success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
          Message sent successfully!
        </div>
      )}
      {actionData?.success === false && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          {"An error occurred. Please try again."}
        </div>
      )}
      <form method="post" className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 bg-white"
          />
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 bg-white"
          />
        </div>
        <input
          type="text"
          required
          placeholder="Subject"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 bg-white"
        />
        <textarea
          placeholder="Your message..."
          rows={5}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 bg-white resize-none"
        />
        <button
          type="submit"
          className="bg-gray-900 text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
