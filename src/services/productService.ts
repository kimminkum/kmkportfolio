import { Product, PaginatedResponse } from '@/types';

// Mock 데이터 생성
const generateMockProducts = (): Product[] => {
  const categories = [
    'electronics',
    'clothing',
    'books',
    'home',
    'sports',
    'beauty',
    'toys',
    'automotive',
  ];
  const products: Product[] = [];

  for (let i = 1; i <= 100; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const price = Math.floor(Math.random() * 1000) + 10;
    const rating = Math.round((Math.random() * 2 + 3) * 10) / 10; // 3.0-5.0
    const reviewCount = Math.floor(Math.random() * 500);
    const stock = Math.floor(Math.random() * 50);

    products.push({
      id: `product-${i}`,
      name: `Product ${i} - ${category.charAt(0).toUpperCase() + category.slice(1)}`,
      description: `This is a great ${category} product with excellent quality and features. Perfect for your needs.`,
      price,
      image: `https://picsum.photos/300/300?random=${i}`,
      category,
      inStock: stock > 0,
      stock,
      rating,
      reviewCount,
      createdAt: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return products;
};

const mockProducts = generateMockProducts();

// API 서비스 함수들
export const productService = {
  // 상품 목록 조회 (페이지네이션, 필터링, 정렬)
  async getProducts(params: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<PaginatedResponse<Product>> {
    const {
      page = 1,
      limit = 12,
      search,
      category,
      minPrice,
      maxPrice,
      inStock,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = params;

    // 필터링
    let filteredProducts = [...mockProducts];

    if (search) {
      filteredProducts = filteredProducts.filter(
        product =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filteredProducts = filteredProducts.filter(
        product => product.category === category
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.price >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.price <= maxPrice
      );
    }

    if (inStock !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.inStock === inStock
      );
    }

    // 정렬
    filteredProducts.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Product];
      let bValue: any = b[sortBy as keyof Product];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // 페이지네이션
    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const data = filteredProducts.slice(startIndex, endIndex);

    // 네트워크 지연 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  },

  // 상품 상세 조회
  async getProduct(id: string): Promise<Product> {
    const product = mockProducts.find(p => p.id === id);

    if (!product) {
      throw new Error('Product not found');
    }

    // 네트워크 지연 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 200));

    return product;
  },

  // 카테고리 목록 조회
  async getCategories(): Promise<string[]> {
    const categories = Array.from(new Set(mockProducts.map(p => p.category)));
    return categories.sort();
  },
};
