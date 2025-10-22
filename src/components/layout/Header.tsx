"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const cartTotalItems = useCartStore(state => state.totalItems);
  const wishlistTotalItems = useWishlistStore(state => state.totalItems);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Garden",
    "Sports",
    "Beauty",
    "Toys",
    "Automotive",
  ];

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span>Free shipping on orders over $50</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">30-day return policy</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-500 cursor-not-allowed">
                Help Center
              </span>
              <span className="text-gray-500 cursor-not-allowed">
                Track Order
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ShopStore</span>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-2xl mx-8"
            role="search"
          >
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
                aria-label="Search for products"
              />
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <Link href="/wishlist" aria-label="View wishlist">
              <Button
                variant="ghost"
                size="sm"
                className="relative cursor-pointer"
                aria-label={`Wishlist${
                  wishlistTotalItems > 0 ? ` (${wishlistTotalItems} items)` : ""
                }`}
              >
                <Heart className="h-5 w-5" />
                {mounted && wishlistTotalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                    aria-label={`${wishlistTotalItems} items in wishlist`}
                  >
                    {wishlistTotalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart" aria-label="View shopping cart">
              <Button
                variant="ghost"
                size="sm"
                className="relative cursor-pointer"
                aria-label={`Shopping cart${
                  cartTotalItems > 0 ? ` (${cartTotalItems} items)` : ""
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                {mounted && cartTotalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                    aria-label={`${cartTotalItems} items in cart`}
                  >
                    {cartTotalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Account - Disabled */}
            <Button
              variant="ghost"
              size="sm"
              aria-label="User account (not available)"
              disabled
              className="cursor-not-allowed"
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:block border-t py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {/* Categories Dropdown */}
              <div className="relative group">
                <Button variant="ghost" className="flex items-center gap-1">
                  Categories
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map(category => (
                        <Link
                          key={category}
                          href={`/products?category=${category.toLowerCase()}`}
                          className="block px-3 py-2 text-sm hover:bg-gray-100 rounded"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Navigation Links */}
              <Link
                href="/products"
                className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer"
              >
                All Products
              </Link>
              <span className="text-gray-400 font-medium cursor-not-allowed">
                Deals
              </span>
              <span className="text-gray-400 font-medium cursor-not-allowed">
                New Arrivals
              </span>
              <span className="text-gray-400 font-medium cursor-not-allowed">
                Brands
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400 cursor-not-allowed">
                Help
              </span>
              <span className="text-sm text-gray-400 cursor-not-allowed">
                Contact
              </span>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map(category => (
                    <Link
                      key={category}
                      href={`/products?category=${category.toLowerCase()}`}
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Quick Links</h3>
                <div className="space-y-1">
                  <Link
                    href="/products"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
                  >
                    All Products
                  </Link>
                  <span className="block px-3 py-2 text-sm text-gray-400 cursor-not-allowed">
                    Deals
                  </span>
                  <span className="block px-3 py-2 text-sm text-gray-400 cursor-not-allowed">
                    New Arrivals
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
