"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/features/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types";
import {
  ShoppingBag,
  Truck,
  Shield,
  Headphones,
  Star,
  ArrowRight,
  TrendingUp,
  Zap,
} from "lucide-react";

export default function HomePage() {
  // 인기 상품 조회
  const { data: popularProducts } = useProducts({
    sortBy: "rating",
    sortOrder: "desc",
    limit: 8,
  });

  // 신상품 조회
  const { data: newProducts } = useProducts({
    sortBy: "createdAt",
    sortOrder: "desc",
    limit: 8,
  });

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on orders over $50",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure payment processing",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer support",
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Same-day delivery available",
    },
  ];

  const categories = [
    {
      name: "Electronics",
      image: "https://picsum.photos/300/200?random=1",
      count: 150,
    },
    {
      name: "Clothing",
      image: "https://picsum.photos/300/200?random=2",
      count: 200,
    },
    {
      name: "Books",
      image: "https://picsum.photos/300/200?random=3",
      count: 100,
    },
    {
      name: "Home & Garden",
      image: "https://picsum.photos/300/200?random=4",
      count: 80,
    },
    {
      name: "Sports",
      image: "https://picsum.photos/300/200?random=5",
      count: 120,
    },
    {
      name: "Beauty",
      image: "https://picsum.photos/300/200?random=6",
      count: 90,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Discover Amazing Products at{" "}
                <span className="text-yellow-400">Great Prices</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Shop from thousands of products with fast delivery and excellent
                customer service. Your satisfaction is our priority.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  View Categories
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 bg-white/10 rounded-2xl backdrop-blur-sm">
                <Image
                  src="https://picsum.photos/600/400?random=hero"
                  alt="Hero Image"
                  fill
                  className="object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600">
              Find exactly what you&apos;re looking for
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 auto-rows-fr">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/products?category=${category.name.toLowerCase()}`}
                className="h-full"
              >
                <Card className="group hover:shadow-lg transition-all cursor-pointer h-full flex flex-col">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4 text-center flex-1 flex flex-col justify-center">
                      <h3 className="font-semibold mb-1 min-h-[1.5rem]">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {category.count} items
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Popular Products</h2>
              <p className="text-gray-600">Best sellers this week</p>
            </div>
            <Link href="/products?sortBy=rating&sortOrder=desc">
              <Button variant="outline" className="flex items-center gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            {popularProducts?.data?.slice(0, 4).map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">New Arrivals</h2>
              <p className="text-gray-600">Fresh products just added</p>
            </div>
            <Link href="/products?sortBy=createdAt&sortOrder=desc">
              <Button variant="outline" className="flex items-center gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            {newProducts?.data?.slice(0, 4).map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-blue-100 mb-8">
              Subscribe to our newsletter and get 10% off your first order
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <Button className="bg-yellow-400 text-blue-600 hover:bg-yellow-300">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-6">
              Trusted by millions of customers worldwide
            </h3>
            <div className="flex items-center justify-center gap-8 text-gray-500">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">4.8/5</span>
                <span>Customer Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <span className="font-semibold">1M+</span>
                <span>Happy Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="font-semibold">100%</span>
                <span>Secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
