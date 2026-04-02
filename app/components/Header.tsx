import { Link } from "@remix-run/react";
import { Search, ShoppingBag, User } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-bold tracking-widest uppercase text-gray-900"
          >
            The Online Store
          </Link>

          <nav className="hidden md:flex items-center gap-15">
            <Link to="/" className="text-sm text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/" className="text-sm text-gray-700 hover:text-gray-900">
              Shop
            </Link>
            <Link
              to="/about"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Contact
            </Link>
            <Link
              to="/blog"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              to="/search"
              aria-label="Search"
              className="text-gray-700 hover:text-gray-900"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link
              to="/account"
              aria-label="Account"
              className="text-gray-700 hover:text-gray-900"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              to="/cart"
              aria-label="Cart"
              className="text-gray-700 hover:text-gray-900"
            >
              <ShoppingBag className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
