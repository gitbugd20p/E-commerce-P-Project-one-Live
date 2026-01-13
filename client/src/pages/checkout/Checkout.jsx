import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import useCheckoutStore from "../../store/useCheckoutStore";
import useOrderStore from "../../store/useOrderStore";
import { useEffect } from "react";

const Checkout = () => {
  const { cart, cartTotal } = useCartStore();

  const { shippingAddress, paymentMethod, setShipping, setPaymentMethod } =
    useCheckoutStore();

  const handleChange = (e) => {
    setShipping(e.target.name, e.target.value);
  };

  const navigate = useNavigate();

  const { placeOrder, loading, success, error, resetOrder } = useOrderStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderPayload = {
      shippingAddress,
      paymentMethod,
      items: cart,
      totalPrice: cartTotal(),
    };

    placeOrder(orderPayload);
  };

  useEffect(() => {
    if (success) {
      resetOrder();
      navigate("/");
    }
  }, [success]);

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold italic opacity-50">
          Your cart is empty
        </h2>
        <Link to="/">
          <button className="btn btn-outline btn-primary">
            Return to Shop
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl p-4 lg:p-10">
      <h1 className="mb-8 text-3xl font-extrabold tracking-tight lg:text-4xl">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-12">
        {/* LEFT COLUMN: Shipping & Payment */}
        <div className="space-y-8 lg:col-span-7">
          {/* Shipping address */}
          <section className="card bg-base-100 border-base-200 border shadow-sm">
            <div className="card-body gap-6">
              <h2 className="card-title text-xl font-bold">Shipping Address</h2>

              {/* Input fields */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Full Name - Spans 2 columns */}
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text text-xs font-semibold uppercase opacity-70">
                      Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    className="input input-bordered focus:input-primary w-full"
                    required
                    value={shippingAddress.fullName}
                    onChange={handleChange}
                  />
                </div>

                {/* Street Address - Spans 2 columns */}
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text text-xs font-semibold uppercase opacity-70">
                      Street Address
                    </span>
                  </label>
                  <input
                    name="address"
                    placeholder="123 Main St"
                    className="input input-bordered focus:input-primary w-full"
                    required
                    value={shippingAddress.address}
                    onChange={handleChange}
                  />
                </div>

                {/* City - 1 column on tablet/desktop */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xs font-semibold uppercase opacity-70">
                      City
                    </span>
                  </label>
                  <input
                    name="city"
                    placeholder="New York"
                    className="input input-bordered focus:input-primary w-full"
                    required
                    value={shippingAddress.city}
                    onChange={handleChange}
                  />
                </div>

                {/* Postal Code - 1 column on tablet/desktop */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xs font-semibold uppercase opacity-70">
                      Postal Code
                    </span>
                  </label>
                  <input
                    name="postalCode"
                    placeholder="10001"
                    className="input input-bordered focus:input-primary w-full"
                    required
                    value={shippingAddress.postalCode}
                    onChange={handleChange}
                  />
                </div>

                {/* Phone Number - Spans 2 columns */}
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text text-xs font-semibold uppercase opacity-70">
                      Phone Number
                    </span>
                  </label>
                  <input
                    name="phone"
                    placeholder="+1 234 567 890"
                    className="input input-bordered focus:input-primary w-full"
                    required
                    value={shippingAddress.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Payment method */}
          <section className="card bg-base-100 border-base-200 border shadow-sm">
            <div className="card-body">
              <h2 className="card-title mb-4 text-xl font-bold">
                Payment Method
              </h2>
              <div className="flex flex-col gap-3">
                <label className="hover:bg-base-200 flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors">
                  <input
                    type="radio"
                    className="radio radio-primary"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <div>
                    <span className="block font-bold">Cash on Delivery</span>
                    <span className="text-sm opacity-60">
                      Pay when you receive the package
                    </span>
                  </div>
                </label>

                <label className="hover:bg-base-200 flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors">
                  <input
                    type="radio"
                    className="radio radio-primary"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                  />
                  <div>
                    <span className="block font-bold">Online Payment</span>
                    <span className="text-sm opacity-60">
                      Credit Card, UPI, or Net Banking
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Order Summary (Sticky) */}
        <div className="lg:col-span-5">
          <div className="card bg-base-200/50 border-base-300 sticky top-20 border shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4 text-2xl font-bold">
                Order Summary
              </h2>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="text-sm">
                      <p className="font-bold">{item.title}</p>
                      <p className="opacity-60">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="divider my-6"></div>

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">${cartTotal().toFixed(2)}</span>
              </div>

              <div className="card-actions mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-block btn-lg shadow-lg"
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              </div>

              <p className="mt-4 text-center text-xs opacity-50">
                By placing your order, you agree to our Terms of Service.
              </p>
            </div>
            {error && <p className="text-error mt-2 text-sm">{error}</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
