import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { WishlistStore, Product, WishlistItem } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      hasHydrated: false,

      addItem: (product: Product) => {
        const { items } = get();
        const exists = items.some(item => item.productId === product.id);

        if (exists) {
          return; // 이미 위시리스트에 있음
        }

        const newItem: WishlistItem = {
          id: uuidv4(),
          productId: product.id,
          product,
          addedAt: new Date().toISOString(),
        };

        const newItems = [...items, newItem];
        set({ items: newItems, totalItems: newItems.length });
      },

      removeItem: (productId: string) => {
        const { items } = get();
        const newItems = items.filter(item => item.productId !== productId);
        set({ items: newItems, totalItems: newItems.length });
      },

      isInWishlist: (productId: string) => {
        const { items } = get();
        return items.some(item => item.productId === productId);
      },
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => state => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);
