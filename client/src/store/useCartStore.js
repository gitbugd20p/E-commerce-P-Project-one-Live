import { create } from "zustand";
import { toast } from "react-toastify";

const getCartFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch (error) {
    console.log("Cart from local storage error: ", error);

    return [];
  }
};

const useCartStore = create((set, get) => ({
  cart: getCartFromStorage(),

  addToCart: (product) => {
    const cart = get().cart;
    const existing = cart.find((p) => p._id === product._id);

    let updatedCart;

    if (existing) {
      updatedCart = cart.map((p) =>
        p._id === product._id
          ? {
              ...p,
              quantity: p.quantity + 1,
            }
          : p,
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    toast.success("Add to cart successfully!");
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    set({ cart: updatedCart });
  },

  removeFromCart: (id) => {
    const updatedCart = get().cart.filter((p) => p._id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.error("Removed from cart successfully!");
    set({ cart: updatedCart });
  },

  updateQuantity: (id, quantity) => {
    if (quantity < 1) return;

    const updatedCart = get().cart.map((p) =>
      p._id === id ? { ...p, quantity } : p,
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    set({ cart: updatedCart });
  },

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ cart: [] });
  },

  cartTotal: () =>
    get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));

export default useCartStore;
