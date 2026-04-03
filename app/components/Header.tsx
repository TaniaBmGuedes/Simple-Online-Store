import { Link } from "@remix-run/react";
import { Search, ShoppingBag, User } from "lucide-react";

export default function Header({ cartCount = 0 }: { cartCount: number }) {
  return (
    <header className="border-b border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
              className="text-2xl font-bold tracking-widest uppercase text-navy"
          >
            The Online Store
          </Link>

          <nav className="hidden md:flex items-center gap-12">
            <Link to="/" className="text-base text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/" className="text-base text-gray-700 hover:text-gray-900">
              Shop
            </Link>
            <Link
              to="/about"
              className="text-base text-gray-700 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-base text-gray-700 hover:text-gray-900"
            >
              Contact
            </Link>
            <Link
              to="/blog"
              className="text-base text-gray-700 hover:text-gray-900"
            >
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-6">
            <Link
              to="/"
              aria-label="Search"
              className="text-gray-700 hover:text-gray-900"
            >
              <Search className="w-6 h-6" />
            </Link>
            <Link
              to="/account"
              aria-label="Account"
              className="text-gray-700 hover:text-gray-900"
            >
              <User className="w-6 h-6" />
            </Link>
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative text-gray-700 hover:text-gray-900"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
