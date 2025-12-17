# MegaShop

MegaShop is a modern, full-featured e-commerce application built with Next.js 16, TypeScript, and MongoDB. It features a robust admin dashboard, seamless user authentication, product management, and a responsive shopping experience.

## 🚀 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Database:** MongoDB (via Mongoose)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) (Credentials & Google OAuth)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) (Client) & [TanStack Query](https://tanstack.com/query/latest) (Server)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Forms:** React Hook Form

## ✨ Features

- **🛍️ Product Browsing:** Full product listing with search and filtering capabilities.
- **🛒 Shopping Cart:** Dynamic shopping cart with real-time updates.
- **🔐 Authentication:** Secure user login and registration using Email/Password and Google OAuth.
- **⚡ Admin Dashboard:**
  - Dedicated admin area (`/admin`).
  - Product Inventory Management (Add, Edit, Delete products).
  - Search and filter products in the backend.
- **🎨 Responsive Design:** Mobile-first approach ensuring great experience on all devices.

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB installed locally or a MongoDB Atlas URI

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd mega-shop
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/mega-shop

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-super-secret-key

   # Google Auth (Optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
src/
├── app/              # Next.js App Router pages and layouts
│   ├── admin/        # Admin dashboard routes
│   ├── api/          # API routes (Auth, Products, etc.)
│   ├── (public)/     # Public facing pages (Home, Product, Cart)
├── components/       # Reusable UI components
├── features/         # Feature-based logic (Slices, specific components)
├── lib/              # Utilities (DB connection, Authentication, Models)
├── store/            # Redux store configuration
└── providers/        # Application providers (Session, Query, Redux)
```

## 📜 Scripts

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm start`: Starts the production build.
- `npm run lint`: Runs ESLint checks.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---
Built with ❤️ using Next.js & TypeScript
