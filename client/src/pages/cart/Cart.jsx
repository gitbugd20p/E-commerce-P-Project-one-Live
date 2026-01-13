import { Link } from "react-router-dom";
import useCartStore from "../../store/useCartStore";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCartStore();

  if (cart.length === 0) {
    return <div className="py-10 text-center">Cart is empty</div>;
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
