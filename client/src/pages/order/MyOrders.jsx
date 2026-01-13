import { useEffect } from "react";
import useOrderStore from "../../store/useOrderStore";
import Loader from "./../../components/common/Loader";
import { FaBox, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { orders, myOrderLoading, fetchMyOrders } = useOrderStore();

  useEffect(() => {
    if (orders.length === 0) {
      fetchMyOrders();
    }
  }, [fetchMyOrders, orders.length]);

  const getStatusStep = (status) => {
    const steps = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
    ];
    return steps.indexOf(status);
  };

  if (myOrderLoading) return <Loader />;

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-4xl p-6 py-20 text-center">
        <FaBox className="mx-auto mb-4 text-6xl text-gray-200" />
        <h2 className="text-2xl font-black uppercase italic">No Orders Yet</h2>
        <p className="mb-6 text-gray-500">
          Your shopping bag is waiting to be filled.
        </p>
        <Link
          to="/products"
          className="btn btn-primary rounded-none font-black uppercase italic"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-20 max-w-6xl p-6">
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tighter uppercase italic">
          My Purchase History
        </h1>
        <p className="font-medium text-gray-500">
          Track and manage your recent orders.
        </p>
      </div>

      <div className="space-y-12">
        {orders.map((order) => (
          <div
            key={order._id}
            className="overflow-hidden border-4 border-black bg-white"
          >
            {/* Order Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 text-black">
              <div>
                <span className="block text-[10px] tracking-widest text-gray-400 uppercase">
                  Order Reference
                </span>
                <span className="font-mono font-bold uppercase">
                  #{order._id.slice(-12)}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] tracking-widest text-gray-400 uppercase">
                  Placed On
                </span>
                <span className="font-bold">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div
                className={`border-2 border-white px-4 py-1 text-sm font-black uppercase italic ${order.status === "delivered" ? "bg-success text-black" : "bg-primary text-white"}`}
              >
                {order.status}
              </div>
            </div>

            <div className="border"></div>
            <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-3">
              {/* Product List */}
              <div className="space-y-4 lg:col-span-2">
                <h3 className="mb-2 inline-block border-b-2 border-black pb-1 text-sm font-black uppercase italic">
                  Package Contents
                </h3>
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 border-2 border-black/5 bg-gray-50 p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-16 w-16 border-2 border-black object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm leading-tight font-bold">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity} × ${item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="font-black">
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}

                {/* Tracking Progress Bar */}
                <div className="mt-8 border-t border-dashed border-gray-300 pt-6">
                  <ul className="steps steps-vertical lg:steps-horizontal w-full text-[10px] font-bold uppercase italic">
                    <li
                      className={`step ${getStatusStep(order.status) >= 0 ? "step-primary" : ""}`}
                    >
                      Ordered
                    </li>
                    <li
                      className={`step ${getStatusStep(order.status) >= 1 ? "step-primary" : ""}`}
                    >
                      Confirmed
                    </li>
                    <li
                      className={`step ${getStatusStep(order.status) >= 2 ? "step-primary" : ""}`}
                    >
                      Processing
                    </li>
                    <li
                      className={`step ${getStatusStep(order.status) >= 3 ? "step-primary" : ""}`}
                    >
                      Shipped
                    </li>
                    <li
                      className={`step ${getStatusStep(order.status) >= 4 ? "step-primary" : ""}`}
                    >
                      Delivered
                    </li>
                  </ul>
                </div>
              </div>

              {/* Sidebar: Totals & Shipping */}
              <div className="space-y-6 border-l-0 border-black bg-gray-50 p-5 lg:border-l-2">
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-xs font-black uppercase italic">
                    <FaMapMarkerAlt /> Delivery Address
                  </h3>
                  <div className="text-xs leading-relaxed font-medium">
                    <p className="font-black uppercase">
                      {order.shippingAddress.fullName}
                    </p>
                    <p>{order.shippingAddress.address}</p>
                    <p>
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.postalCode}
                    </p>
                    <p className="mt-2 text-gray-500 italic">
                      📞 {order.shippingAddress.phone}
                    </p>
                  </div>
                </div>

                <div className="border-t-2 border-black/10 pt-4">
                  <div className="mb-1 flex justify-between text-xs font-bold">
                    <span>Payment Method</span>
                    <span className="text-primary uppercase">
                      {order.paymentMethod}
                    </span>
                  </div>
                  <div className="mb-4 flex justify-between text-xs font-bold">
                    <span>Payment Status</span>
                    <span
                      className={`uppercase ${order.paymentStatus === "paid" ? "text-success" : "text-error"}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-black p-3 text-white shadow-[4px_4px_0px_0px_rgba(87,13,248,1)]">
                    <span className="font-black uppercase italic">
                      Grand Total
                    </span>
                    <span className="text-xl font-black">
                      ${order.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
