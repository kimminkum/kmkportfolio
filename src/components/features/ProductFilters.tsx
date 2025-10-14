'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X, Filter } from 'lucide-react';
import { ProductFilters, SortOption, SortOrder } from '@/types';
import { useCategories } from '@/hooks/useProducts';
import { cn } from '@/lib/utils';

interface ProductFiltersProps {
  filters: ProductFilters & {
    sortBy?: SortOption;
    sortOrder?: SortOrder;
  };
  onFiltersChange: (
    filters: ProductFilters & {
      sortBy?: SortOption;
      sortOrder?: SortOrder;
    }
  ) => void;
  className?: string;
}

const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'price', label: 'Price' },
  { value: 'rating', label: 'Rating' },
  { value: 'createdAt', label: 'Newest' },
] as const;

export function ProductFiltersComponent({
  filters,
  onFiltersChange,
  className,
}: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const { data: categories } = useCategories();

  // 디바운스된 검색
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, search: searchTerm || undefined });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, filters, onFiltersChange]);

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const handleSortChange = (sortBy: SortOption) => {
    onFiltersChange({
      ...filters,
      sortBy,
      sortOrder: 'asc',
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    onFiltersChange({
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    value => value !== undefined && value !== 'createdAt' && value !== 'desc'
  );

  return (
    <div className={cn('space-y-4', className)}>
      {/* 검색 바 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* 필터 및 정렬 */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge
              variant="secondary"
              className="ml-1 h-5 w-5 rounded-full p-0 text-xs"
            >
              !
            </Badge>
          )}
        </Button>

        <Select
          value={filters.sortBy || 'createdAt'}
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* 고급 필터 */}
      {showAdvancedFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-gray-50">
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select
              value={filters.category || ''}
              onValueChange={value => handleFilterChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories?.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Price Range
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={e =>
                  handleFilterChange(
                    'minPrice',
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="text-sm"
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ''}
                onChange={e =>
                  handleFilterChange(
                    'maxPrice',
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Availability
            </label>
            <Select
              value={
                filters.inStock === undefined ? '' : filters.inStock.toString()
              }
              onValueChange={value =>
                handleFilterChange(
                  'inStock',
                  value === '' ? undefined : value === 'true'
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                <SelectItem value="true">In Stock</SelectItem>
                <SelectItem value="false">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* 활성 필터 표시 */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.category && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {filters.category}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleFilterChange('category', undefined)}
              />
            </Badge>
          )}
          {filters.minPrice && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Min: ${filters.minPrice}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleFilterChange('minPrice', undefined)}
              />
            </Badge>
          )}
          {filters.maxPrice && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Max: ${filters.maxPrice}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleFilterChange('maxPrice', undefined)}
              />
            </Badge>
          )}
          {filters.inStock !== undefined && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.inStock ? 'In Stock' : 'Out of Stock'}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleFilterChange('inStock', undefined)}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
