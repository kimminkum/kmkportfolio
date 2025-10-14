import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { Product, ProductFilters, SortOption, SortOrder } from '@/types';

// 상품 목록 조회 훅
export const useProducts = (params: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: SortOption;
  sortOrder?: SortOrder;
}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getProducts(params),
    keepPreviousData: true,
    placeholderData: previousData => previousData,
  });
};

// 무한 스크롤용 상품 목록 조회 훅
export const useInfiniteProducts = (
  filters: ProductFilters & {
    sortBy?: SortOption;
    sortOrder?: SortOrder;
  }
) => {
  return useInfiniteQuery({
    queryKey: ['products', 'infinite', filters],
    queryFn: ({ pageParam = 1 }) =>
      productService.getProducts({
        ...filters,
        page: pageParam,
        limit: 12,
      }),
    getNextPageParam: lastPage => {
      return lastPage.pagination.hasNext
        ? lastPage.pagination.page + 1
        : undefined;
    },
    initialPageParam: 1,
    keepPreviousData: true,
  });
};

// 상품 상세 조회 훅
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProduct(id),
    enabled: !!id,
  });
};

// 카테고리 목록 조회 훅
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => productService.getCategories(),
    staleTime: 30 * 60 * 1000, // 30분
  });
};
