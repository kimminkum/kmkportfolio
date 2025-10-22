# E-commerce Frontend Portfolio

A modern, full-featured e-commerce store built with Next.js 15, TypeScript, TanStack Query, and Zustand.

## 🚀 Features

### Core Features

- ✅ **Product Catalog** - Browse products with pagination, filtering, and sorting
- ✅ **Product Details** - Detailed product pages with image gallery
- ✅ **Shopping Cart** - Add, remove, and update product quantities
- ✅ **Wishlist** - Save favorite products for later
- ✅ **Search & Filters** - Advanced search and filtering capabilities
- ✅ **Responsive Design** - Mobile-first, works on all screen sizes
- ✅ **State Management** - Persistent cart and wishlist using Zustand
- ✅ **Data Fetching** - Efficient data fetching with TanStack Query
- ✅ **Type Safety** - Full TypeScript support

### Technical Features

- **Next.js 15** - Latest App Router with Server Components
- **TypeScript** - Type-safe codebase
- **TanStack Query v5** - Server state management
- **Zustand** - Client state management with persistence
- **Tailwind CSS v4** - Utility-first styling
- **Shadcn/ui** - Beautiful, accessible UI components
- **Lucide Icons** - Consistent icon system
- **ESLint & Prettier** - Code quality and formatting

## 📦 Project Structure

```
frontend-portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Home page
│   │   ├── cart/              # Shopping cart page
│   │   ├── wishlist/          # Wishlist page
│   │   ├── products/          # Products listing & detail pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── providers.tsx      # React Query provider
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── features/          # Feature-specific components
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductFilters.tsx
│   │   ├── layout/            # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/                # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   │   └── useProducts.ts
│   ├── stores/                # Zustand stores
│   │   ├── cartStore.ts
│   │   └── wishlistStore.ts
│   ├── services/              # API services
│   │   └── productService.ts
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts
│   └── lib/                   # Utility functions
│       ├── utils.ts
│       ├── queryClient.ts
│       └── constants/
└── public/                    # Static assets
```

## 🛠️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd frontend-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types

## 🎨 Key Components

### Pages

- **Home** (`/`) - Hero section, featured products, categories
- **Products** (`/products`) - Product listing with filters
- **Product Detail** (`/products/[id]`) - Individual product page
- **Cart** (`/cart`) - Shopping cart management
- **Wishlist** (`/wishlist`) - Saved products

### State Management

- **Cart Store** - Manages shopping cart items and operations
- **Wishlist Store** - Manages wishlist items
- Both stores persist to localStorage automatically

### Data Fetching

- Product listing with pagination
- Product details
- Categories
- Supports filtering, sorting, and search

## 🔧 Technologies

### Frontend

- **Next.js 15.5.5** - React framework
- **React 19.1.0** - UI library
- **TypeScript 5.x** - Type safety

### State Management

- **TanStack Query 5.90.3** - Server state
- **Zustand 5.0.8** - Client state

### Styling

- **Tailwind CSS 4** - Utility-first CSS
- **Shadcn/ui** - Component library
- **Lucide React** - Icons

### Development

- **ESLint** - Linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## 🌟 Features in Detail

### Product Management

- Browse products with pagination
- Filter by category, price range, availability
- Sort by name, price, rating, date
- Search products by name or description

### Shopping Cart

- Add/remove products
- Update quantities
- Persistent storage
- Real-time price calculations
- Free shipping threshold indicator

### Wishlist

- Save favorite products
- Quick add to cart
- Persistent storage
- Easy management

### UI/UX

- Responsive design (mobile, tablet, desktop)
- Loading states with skeletons
- Error handling
- Smooth animations
- Toast notifications ready
- Accessible components

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔮 Future Enhancements

- [ ] User authentication
- [ ] Checkout flow
- [ ] Order history
- [ ] Payment integration
- [ ] Product reviews
- [ ] Related products recommendations
- [ ] Wishlist sharing
- [ ] Product comparison
- [ ] Multi-language support
- [ ] Dark mode

## 📄 License

This project is part of a portfolio and is available for demonstration purposes.

## 👤 Author

Frontend Developer Portfolio Project

---

Built with ❤️ using Next.js and TypeScript
