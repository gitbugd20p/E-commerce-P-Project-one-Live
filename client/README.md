# 🎨 E-Commerce Frontend (Client)

This is the **frontend application** of the Full-Stack E-Commerce project, built using **React (Vite)**.
It focuses on **scalable UI architecture**, **state management**, and **clean routing**, closely mirroring real-world frontend development practices.

🔗 **Live Website**
👉 [https://sabur-e-commerce-p-project-one-live.vercel.app/](https://sabur-e-commerce-p-project-one-live.vercel.app/)

---

## 🧭 Frontend Responsibilities

The frontend application is responsible for:

- Rendering all user-facing pages
- Managing global and local UI state
- Handling authentication flow
- Communicating with the backend API
- Protecting routes based on user roles
- Providing a smooth shopping experience

---

## 🧱 Tech Stack

- **React (Vite)** – Fast development & optimized builds
- **React Router** – Client-side routing
- **Zustand** – Lightweight global state management
- **Axios** – API communication
- **CSS** – Custom styling with reusable styles
- **Vercel** – Production deployment

---

## 🗂️ Frontend Folder Structure

```
src
├── api         # API service layer (Axios based)
├── assets      # Images, icons, global styles
├── components  # Reusable UI components
├── layouts     # Layout wrappers (Admin / Main)
├── pages       # Route-level pages
├── routes      # Application routing
├── store       # Zustand global stores
├── App.jsx
└── main.jsx
```

This structure ensures:

- Clear separation of concerns
- Easy scalability
- Maintainable component hierarchy

---

## 🔗 API Layer Design

All API communication is centralized under `src/api/`.

Examples:

- `auth.api.js`
- `product.api.js`
- `order.api.js`
- `category.api.js`
- `admin.api.js`

A shared Axios instance is used to:

- Set base URL
- Handle credentials
- Keep API logic decoupled from UI components

---

## 🧠 State Management (Zustand)

Zustand is used instead of Redux for its simplicity and performance.

Each domain has its own store:

- `useAuthStore` – Authentication & user state
- `useProductStore` – Product listing & details
- `useCartStore` – Cart logic
- `useOrderStore` – Orders & order details
- `useCategoryStore` – Category-based data
- `useAdminStore` – Admin-specific operations
- `useCheckoutStore` – Checkout flow

This keeps state:

- Modular
- Predictable
- Easy to debug

---

## 🔐 Authentication & Route Protection

- JWT-based authentication handled via backend
- Auth state stored centrally
- `ProtectedRoute` component ensures:
  - Only authenticated users can access protected pages
  - Admin-only routes are restricted properly

---

## 📄 Pages Overview

### 👥Public Pages

- **Home**
- **Products**
- **Product Details**
- **Categories**
- **Login / Register**

### 👤User Pages

- **Cart**
- **Checkout**
- **My Orders**
- **Order Details**

### 🔑 Admin Control Center

- **Business KPI Cards:** Instant tracking of Revenue, Orders, Customers, and **Low Stock alerts**.
- **Sales Analytics:** Interactive **7-day bar graphs** for sales value and quantity trends.
- **Activity Hub:** Recent orders feed and quick-access navigation shortcuts.
- **Management Suites:** Complete **CRUD** systems for **Products**
- **Manage Order:** Change/control the status of the order
- **Mange Users:** Can View all the users

---

### 💡 Why this works:

- **Scannable:** Recruiters can read this in 5 seconds.
- **Business Language:** Using terms like **"KPI Cards"** and **"Management Suites"** makes you sound like an experienced developer.
- **Highlights Value:** It puts your most impressive features (Low stock alerts and Analytics) right at the top.

---

## 🎯 UI & UX Considerations

- Responsive layout for all screen sizes
- Reusable UI components
- Clear separation between layout and content
- Loading indicators for async actions
- Graceful empty & error states

---

## ⚙️ Environment Configuration

Create a `.env` file in `client/`:

```env
VITE_API_BASE_URL=<BACKEND_API_URL>
```

---

## 🚀 Local Development

```bash
npm install
npm run dev
```

---

## 📌 Notes

- Built with scalability in mind
- Clean API-to-UI data flow
- Easily extendable with new features
- Suitable for production deployment

---

## 📌 Future Improvements

- Payment gateway integration
- Product reviews & ratings
- Wishlist functionality

---

## 👤 Author

**Md Sabur**
Aspiring **Junior Frontend / MERN Stack Developer**

- 🐙 GitHub: [https://github.com/gitbugd20p](https://github.com/gitbugd20p)
- 🌐 Live Site: [https://sabur-e-commerce-p-project-one-live.vercel.app/](https://sabur-e-commerce-p-project-one-live.vercel.app/)

---
