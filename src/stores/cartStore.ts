import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartStore, Product, CartItem } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      hasHydrated: false,

      addItem: (product: Product, quantity: number = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.productId === product.id);

        let newItems: CartItem[];

        if (existingItem) {
          // 기존 아이템의 수량 업데이트
          newItems = items.map(item =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // 새 아이템 추가
          newItems = [
            ...items,
            {
              id: uuidv4(),
              productId: product.id,
              quantity,
              product,
            },
          ];
        }

        const totalItems = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalPrice = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        set({ items: newItems, totalItems, totalPrice });
      },

      removeItem: (productId: string) => {
        const { items } = get();
        const newItems = items.filter(item => item.productId !== productId);

        const totalItems = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalPrice = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        set({ items: newItems, totalItems, totalPrice });
      },

      updateQuantity: (productId: string, quantity: number) => {
        const { items } = get();

        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const newItems = items.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        );

        const totalItems = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalPrice = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        set({ items: newItems, totalItems, totalPrice });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => state => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);
