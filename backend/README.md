## 🛒 E-Commerce Platform (MERN)

A full-stack e-commerce application built with **React, Zustand, Tailwind (DaisyUI), Node.js, Express, and MongoDB**.
The project demonstrates **real-world frontend architecture**, **state management**, and **role-based access control**.

---

## 🔗 Live Demo

-   **Frontend:** [https://your-vercel-link.vercel.app](https://your-vercel-link.vercel.app)
-   **Backend API:** [https://your-backend-link.onrender.com](https://your-backend-link.onrender.com)

### Demo Credentials

```
User:
email: user@example.com
password: 123456
```

---

## 🧩 Features

### 👤 User Features

-   User authentication (JWT via HTTP-only cookies)
-   Product listing with filters (search, category, brand, price)
-   Product details page
-   Persistent cart (Zustand + localStorage)
-   Checkout with shipping address & payment method
-   Place order (Cash on Delivery / Online mock)
-   Order history (My Orders)

### 🛠 Admin Features

-   Admin-only dashboard
-   Create products
-   View all orders
-   Update order status (Pending → Confirmed → Shipped → Completed)
-   Role-based route protection

---

## 🧠 Tech Stack

### Frontend

-   React (Vite)
-   React Router v6
-   Zustand (state management)
-   Tailwind CSS + DaisyUI
-   Axios

### Backend

-   Node.js
-   Express.js
-   MongoDB + Mongoose
-   JWT Authentication
-   Role-based authorization

---

## 🏗 Project Architecture

### Frontend Structure

```
src/
├── api/            # API calls
├── store/          # Zustand stores
├── pages/          # Route-level pages
├── components/     # Reusable UI components
├── assets/
```

### Backend Structure

```
src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utility/
```

---

## 🔐 Authentication Strategy

-   JWT stored in **HTTP-only cookies** for security
-   User info stored in **localStorage** for UI state (navbar, guards)
-   Protected routes using `RequireAuth` and `RequireAdmin`

---

## 📦 State Management

-   **Zustand** used for:

    -   Auth state
    -   Cart state (persistent)
    -   Products
    -   Orders
    -   Checkout data

Chosen for simplicity, scalability, and minimal boilerplate.

---

## 🚀 Deployment

-   Frontend deployed on **Vercel**
-   Backend deployed on **Render**
-   MongoDB Atlas for database

---

## 🧪 Future Improvements

-   Payment gateway integration (Stripe)
-   Product image upload (Cloudinary)
-   Pagination & reviews
-   Admin analytics dashboard

---

## 👨‍💻 Author

**Sabur**
Frontend Developer (React)
GitHub: [Md. Sabur](https://github.com/gitbugd20p)

---
