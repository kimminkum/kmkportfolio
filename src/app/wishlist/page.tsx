"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/features/ProductCard";
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const items = useWishlistStore(state => state.items);
  const totalItems = useWishlistStore(state => state.totalItems);
  const addToCart = useCartStore(state => state.addItem);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddAllToCart = () => {
    items.forEach(item => {
      if (item.product.inStock) {
        addToCart(item.product, 1);
      }
    });
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-6 inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full">
            <Heart className="h-12 w-12 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your wishlist is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Save your favorite items to easily find them later.
          </p>
          <Link href="/products">
            <Button size="lg" className="gap-2">
              <ShoppingBag className="h-5 w-5" />
              Discover Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600 mt-1">
                {totalItems} {totalItems === 1 ? "item" : "items"} saved
              </p>
            </div>
            <div className="flex items-center gap-4">
              {items.some(item => item.product.inStock) && (
                <Button
                  onClick={handleAddAllToCart}
                  className="gap-2"
                  size="lg"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Add All to Cart
                </Button>
              )}
              <Link href="/products">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {items.map(item => (
            <ProductCard
              key={item.id}
              product={item.product}
              isInWishlist={true}
            />
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Heart className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                About Your Wishlist
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Your wishlist is saved in your browser</li>
                <li>• Items in your wishlist won&apos;t be reserved</li>
                <li>• You can easily add items to your cart anytime</li>
                <li>
                  • Share your wishlist with friends and family (coming soon)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
