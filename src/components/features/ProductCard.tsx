import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  isInWishlist?: boolean;
  className?: string;
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
  className,
}: ProductCardProps) {
  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  const handleToggleWishlist = () => {
    onToggleWishlist?.(product);
  };

  return (
    <Card
      className={cn(
        'group overflow-hidden transition-all hover:shadow-lg',
        className
      )}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <Link href={`/products/${product.id}`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white"
            onClick={handleToggleWishlist}
          >
            <Heart
              className={cn(
                'h-4 w-4',
                isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
              )}
            />
          </Button>

          {/* Stock Badge */}
          {!product.inStock && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              Out of Stock
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600">{product.rating}</span>
              <span className="text-xs text-gray-500">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-sm line-clamp-2 hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-gray-600 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-green-600">
              ${product.price}
            </span>
            <span className="text-xs text-gray-500">{product.stock} left</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
}
