import { Link } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCartStore();

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-4xl p-6 py-24 text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <FaShoppingCart className="text-4xl text-black" />
        </div>

        <h2 className="mb-2 text-4xl font-black tracking-tighter uppercase italic">
          Your Cart is Empty
        </h2>
        <p className="mb-10 font-medium text-gray-500">
          Looks like you haven't added any heat to your cart yet.
        </p>

        <Link
          to="/products"
          className="btn btn-primary h-auto rounded-none px-10 py-4 text-xl font-black uppercase italic shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mt-4 text-center text-2xl font-bold">Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item._id}
          className="flex items-center justify-between border-b py-4"
        >
          {/* img, name and price */}
          <div className="flex items-center gap-4">
            <img
              src={item.image || "/placeholder.png"}
              alt={item.image}
              className="h-20 w-20 rounded object-cover"
            />
            <div>
              <h2 className="font-semibold">{item.title}</h2>
              <p>${item.price}</p>
            </div>
          </div>

          {/* quantity and remove */}
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
              className="input input-bordered w-20"
            />
            <button
              className="btn btn-sm btn-error"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Total */}
      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Total: ${cartTotal()}</h2>
        <Link to="/checkout" className="btn btn-primary">
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
