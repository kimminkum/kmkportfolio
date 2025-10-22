// "use client";

// import { useState } from "react";
// import { ProductFiltersComponent } from "@/components/features/ProductFilters";
// import { ProductCard } from "@/components/features/ProductCard";
// import { Pagination } from "@/components/ui/pagination";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useProducts } from "@/hooks/useProducts";
// import type {
//   Product,
//   ProductFilters,
//   SortOption,
//   SortOrder,
//   ProductsResponse,
// } from "@/types";
// // import { cn } from "@/lib/utils";

// export default function ProductsPage() {
//   const [filters, setFilters] = useState<
//     ProductFilters & {
//       sortBy?: SortOption;
//       sortOrder?: SortOrder;
//     }
//   >({
//     sortBy: "createdAt",
//     sortOrder: "desc",
//   });

//   const [currentPage, setCurrentPage] = useState(1);

//   const { data, isLoading, error } = useProducts({
//     ...filters,
//     page: currentPage,
//     limit: 12,
//   });

//   const handleFiltersChange = (
//     newFilters: ProductFilters & {
//       sortBy?: SortOption;
//       sortOrder?: SortOrder;
//     }
//   ) => {
//     setFilters(newFilters);
//     setCurrentPage(1); // 필터 변경 시 첫 페이지로
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     // 페이지 변경 시 스크롤을 맨 위로
//     if (typeof window !== "undefined") {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const handleAddToCart = (product: Product) => {
//     // TODO: 장바구니 추가 로직
//     console.log("Add to cart:", product);
//   };

//   const handleToggleWishlist = (product: Product) => {
//     // TODO: 위시리스트 토글 로직
//     console.log("Toggle wishlist:", product);
//   };

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
//           <p className="text-gray-600">
//             Failed to load products. Please try again.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const total = data?.pagination.total ?? 0;
//   const totalPages = data?.pagination.totalPages ?? 1;
//   const items = data?.data ?? [];

//   return (
//     <div className="bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b">
//         <div className="container mx-auto px-4 py-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Products</h1>
//               <p className="text-gray-600 mt-1">
//                 Discover amazing products at great prices
//               </p>
//             </div>
//             <div className="text-sm text-gray-500">
//               {data?.pagination.total
//                 ? `${data.pagination.total} products found`
//                 : ""}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar - Filters */}
//           <div className="lg:w-80 flex-shrink-0">
//             <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
//               <h2 className="text-lg font-semibold mb-4">Filters</h2>
//               <ProductFiltersComponent
//                 filters={filters}
//                 onFiltersChange={handleFiltersChange}
//               />
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">
//             {/* Results Header */}
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-4">
//                 <h2 className="text-xl font-semibold">
//                   {data?.pagination.total
//                     ? `${data.pagination.total} Products`
//                     : "Products"}
//                 </h2>
//                 {data?.pagination.total && (
//                   <span className="text-sm text-gray-500">
//                     Page {currentPage} of {data.pagination.totalPages}
//                   </span>
//                 )}
//               </div>

//               {/* View Options */}
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-gray-500">View:</span>
//                 <div className="flex border rounded-lg">
//                   <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-l-lg">
//                     Grid
//                   </button>
//                   <button className="px-3 py-1 text-sm text-gray-600 border-l rounded-r-lg hover:bg-gray-50">
//                     List
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Products Grid */}
//             {isLoading ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {Array.from({ length: 12 }).map((_, index) => (
//                   <div key={index} className="space-y-4">
//                     <Skeleton className="aspect-square w-full rounded-lg" />
//                     <div className="space-y-2">
//                       <Skeleton className="h-4 w-3/4" />
//                       <Skeleton className="h-3 w-1/2" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : data?.data && data.data.length > 0 ? (
//               <>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
//                   {data.data.map(product => (
//                     <ProductCard
//                       key={product.id}
//                       product={product}
//                       onAddToCart={handleAddToCart}
//                       onToggleWishlist={handleToggleWishlist}
//                       isInWishlist={false} // TODO: 실제 위시리스트 상태 연결
//                     />
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {data.pagination.totalPages > 1 && (
//                   <Pagination
//                     currentPage={currentPage}
//                     totalPages={data.pagination.totalPages}
//                     onPageChange={handlePageChange}
//                     className="mt-8"
//                   />
//                 )}
//               </>
//             ) : (
//               <div className="text-center py-12">
//                 <div className="text-gray-400 mb-4">
//                   <svg
//                     className="mx-auto h-12 w-12"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   No products found
//                 </h3>
//                 <p className="text-gray-500">
//                   Try adjusting your search or filter criteria.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { ProductFiltersComponent } from "@/components/features/ProductFilters";
import { ProductCard } from "@/components/features/ProductCard";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/useProducts";
import type {
  Product,
  ProductFilters,
  SortOption,
  SortOrder,
  ProductsResponse,
} from "@/types";
import type { UseQueryResult } from "@tanstack/react-query"; // ✅ 캐스팅용 타입

export default function ProductsPage() {
  const [filters, setFilters] = useState<
    ProductFilters & { sortBy?: SortOption; sortOrder?: SortOrder }
  >({
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [currentPage, setCurrentPage] = useState(1);

  // ✅ 훅 반환값을 지역 변수로 받고, data만 안전 캐스팅(훅 코드 변경 없이 해결)
  const query = useProducts({
    ...filters,
    page: currentPage,
    limit: 12,
  }) as UseQueryResult<ProductsResponse, unknown>;
  const { isLoading, error } = query;
  const data = query.data as ProductsResponse | undefined;

  const handleFiltersChange = (
    newFilters: ProductFilters & { sortBy?: SortOption; sortOrder?: SortOrder }
  ) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-red-600">Error</h2>
        </div>
      </div>
    );
  }

  // ✅ 실제 사용 변수로 정리(ESLint unused 방지)
  const total = data?.pagination.total ?? 0;
  const totalPages = data?.pagination.totalPages ?? 1;
  const items = data?.data ?? [];

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="mt-1 text-gray-600">
                Discover amazing products at great prices
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {total > 0 ? `${total} products found` : ""}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar - Filters */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-4 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Filters</h2>
              <ProductFiltersComponent
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold">
                  {total > 0 ? `${total} Products` : "Products"}
                </h2>
                <span className="text-sm text-gray-500">
                  Page {currentPage} of {Math.max(1, totalPages)}
                </span>
              </div>

              {/* View Options */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">View:</span>
                <div className="flex rounded-lg border">
                  <button className="rounded-l-lg bg-blue-600 px-3 py-1 text-sm text-white">
                    Grid
                  </button>
                  <button className="rounded-r-lg border-l px-3 py-1 text-sm text-gray-600 hover:bg-gray-50">
                    List
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid: 래퍼는 항상 유지, 내부만 교체 */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
              {isLoading ? (
                Array.from({ length: 12 }).map((_, index) => (
                  <div key={`sk-${index}`} className="space-y-4">
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                ))
              ) : items.length > 0 ? (
                items.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <div className="mb-4 text-gray-400">
                    <svg
                      className="mx-auto h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    No products found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-8">
              {totalPages > 1 ? (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  className="mt-8"
                />
              ) : (
                <div aria-hidden className="h-0" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
