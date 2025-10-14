'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Beauty',
    'Toys',
    'Automotive',
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
              <Link href="/help" className="hover:text-gray-300">
                Help Center
              </Link>
              <Link href="/track-order" className="hover:text-gray-300">
                Track Order
              </Link>
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
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="relative">
              <Heart className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
              >
                0
              </Badge>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
              >
                0
              </Badge>
            </Button>

            {/* User Account */}
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                All Products
              </Link>
              <Link
                href="/deals"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Deals
              </Link>
              <Link
                href="/new"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                New Arrivals
              </Link>
              <Link
                href="/brands"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Brands
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/help"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Help
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Contact
              </Link>
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
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                  >
                    All Products
                  </Link>
                  <Link
                    href="/deals"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                  >
                    Deals
                  </Link>
                  <Link
                    href="/new"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                  >
                    New Arrivals
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
