// API Configuration
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 50;

// Cart & Wishlist
export const MAX_CART_QUANTITY = 99;
export const CART_STORAGE_KEY = 'cart';
export const WISHLIST_STORAGE_KEY = 'wishlist';

// Product Categories
export const PRODUCT_CATEGORIES = [
  'electronics',
  'clothing',
  'books',
  'home',
  'sports',
  'beauty',
  'toys',
  'automotive',
] as const;

// Sort Options
export const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'price', label: 'Price' },
  { value: 'rating', label: 'Rating' },
  { value: 'createdAt', label: 'Newest' },
] as const;

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

// UI Constants
export const DEBOUNCE_DELAY = 300;
export const TOAST_DURATION = 3000;
export const SKELETON_ANIMATION_DURATION = 1500;

// Image Optimization
export const IMAGE_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+';
