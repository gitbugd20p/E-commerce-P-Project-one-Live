import { create } from "zustand";

const useCheckoutStore = create((set) => ({
  shippingAddress: {
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  },
  paymentMethod: "cod",

  setShipping: (name, value) =>
    set((state) => ({
      shippingAddress: { ...state.shippingAddress, [name]: value },
    })),

  setPaymentMethod: (method) => set({ paymentMethod: method }),
}));

export default useCheckoutStore;
