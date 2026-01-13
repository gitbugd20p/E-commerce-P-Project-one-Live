import { useEffect } from "react";
import { updateOrderStatusApi } from "./../../api/order.api";
import useOrderStore from "../../store/useOrderStore";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const { allOrders, allOrdersLoading, setAllOrders, fetchAllOrders } =
    useOrderStore();

  useEffect(() => {
    if (allOrders.length === 0) {
      fetchAllOrders();
    }
  }, [fetchAllOrders, allOrders.length]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatusApi(id, newStatus);

      const updatedOrders = allOrders.map((order) =>
        order._id === id ? { ...order, status: newStatus } : order,
      );
      setAllOrders(updatedOrders);
      toast.success(`Order status updated as - ${newStatus.toUpperCase()}`);
    } catch (error) {
      toast.error("Failed to update status");
      console.log("Failed to update status", error);
    }
  };

  const getStatusBadge = (status) => {
    const classes = {
      pending: "badge-warning",
      confirmed: "badge-info",
      processing: "badge-primary",
      shipped: "badge-secondary",
      delivered: "badge-success",
      canceled: "badge-error",
    };
    return `badge ${classes[status] || "badge-ghost"} rounded-none font-bold uppercase italic text-[10px]`;
  };

  if (allOrdersLoading && allOrders.length === 0)
    return (
      <div className="animate-pulse p-10 text-center font-black uppercase italic">
        Loading All Orders...
      </div>
    );

  return (
    <div className="bg-base-100">
      {/* Order Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tighter uppercase italic">
          Order Management
        </h1>
        <p className="font-medium text-gray-500">
          Total Volume: {allOrders.length} Active Shipments
        </p>
      </div>

      {/* Order Table */}
      <div className="overflow-x-auto border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <table className="table w-full rounded-none">
          <thead className="bg-black text-xs text-white uppercase italic">
            <tr>
              <th className="rounded-none">Customer & ID</th>
              <th>Items & Quantity</th>
              <th>Financials</th>
              <th>Logistics Status</th>
              <th className="rounded-none">Action</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <tr
                key={order._id}
                className="border-b border-black/10 transition-colors hover:bg-gray-50"
              >
                {/* Customer Details */}
                <td className="py-4">
                  <div className="text-sm font-black tracking-tight uppercase">
                    {order.shippingAddress?.fullName}
                  </div>
                  <div className="font-mono text-[10px] text-gray-400">
                    ID: #{order._id.slice(-8)}
                  </div>
                  <div className="mt-1 text-[10px] text-gray-500">
                    📞 {order.shippingAddress?.phone}
                  </div>
                </td>

                {/* Items Summary */}
                <td>
                  <div className="flex flex-col gap-1">
                    {order.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between border-l-2 border-black bg-gray-100 p-1 text-xs font-medium"
                      >
                        <span>{item.title}</span>
                        <span className="font-bold">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </td>

                {/* Financial */}
                <td>
                  <div className="text-primary font-black italic">
                    ${order.totalAmount?.toLocaleString()}
                  </div>
                  <div
                    className={`mt-1 text-[9px] font-bold uppercase ${order.paymentStatus === "paid" ? "text-success" : "text-error"}`}
                  >
                    {order.paymentMethod?.toUpperCase()} - {order.paymentStatus}
                  </div>
                </td>

                {/* Status Badge */}
                <td>
                  <div className={getStatusBadge(order.status)}>
                    {order.status}
                  </div>
                  <div className="mt-1 text-[9px] font-bold text-gray-400 uppercase">
                    Updated: {new Date(order.updatedAt).toLocaleDateString()}
                  </div>
                </td>

                {/* Status Controls */}
                <td>
                  <select
                    className="select select-bordered select-xs rounded-none border-2 border-black font-bold uppercase italic focus:outline-none"
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
