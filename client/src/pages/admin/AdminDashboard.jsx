import { useEffect, useMemo, useState } from "react";
import {
  FaDollarSign,
  FaShoppingBag,
  FaUsers,
  FaExclamationTriangle,
  FaTruck,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useAdminStore from "../../store/useAdminStore";
import { Loader } from "lucide-react";
import { getAllOrdersApi } from "../../api/order.api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const { adminStats, loading, fetchAdminStats } = useAdminStore();

  useEffect(() => {
    if (adminStats.length === 0) {
      fetchAdminStats();
    }
  }, [fetchAdminStats, adminStats.length]);

  const {
    revenue = 0,
    orders = 0,
    products = 0,
    users = 0,
    lowStock = 0,
    pendingOrder = 0,
  } = adminStats || {};

  const [showTableOrders, setShowTableOrders] = useState([]);

  const loadOrders = async () => {
    const res = await getAllOrdersApi();
    setShowTableOrders(res.data.data);
  };

  useEffect(() => {
    if (showTableOrders.length === 0) {
      loadOrders();
    }
  }, [showTableOrders.length]);

  // Status color
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "badge-warning";
      case "processing":
        return "badge-info";
      case "delivered":
        return "badge-success";
      case "cancelled":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  };

  // Getting last 7 days
  const getLastSevenDays = () => {
    let dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);

      const formattedDate = d.toISOString().slice(0, 10);
      dates.push(formattedDate);
    }

    return dates.reverse();
  };

  const last7DaysArray = getLastSevenDays();

  const chartData = useMemo(() => {
    return last7DaysArray.map((date) => {
      const dayOrders = showTableOrders.filter(
        (orderDate) => orderDate.createdAt.split("T")[0] === date,
      );

      return {
        name: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        revenue: dayOrders.reduce((sum, curr) => sum + curr.totalAmount, 0),
        sales: dayOrders.reduce((sum, curr) => sum + curr.items.length, 0),
      };
    });
  }, [showTableOrders, last7DaysArray]);

  if (loading) return <Loader />;

  return (
    <div className="bg-base-100 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic">
          Dashboard
        </h1>
        <p className="font-medium text-gray-500">
          Welcome back, Admin. Here is what's happening today.
        </p>
      </div>

      {/* --- Main Stats Grid --- */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Revenue Card */}
        <div className="flex items-center justify-between border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div>
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              Total Revenue
            </p>
            <h3 className="text-3xl font-black">${revenue.toLocaleString()}</h3>
          </div>
          <div className="bg-success/10 text-success p-3 text-2xl">
            <FaDollarSign />
          </div>
        </div>

        {/* Orders Card */}
        <div className="flex items-center justify-between border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div>
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              Total Orders
            </p>
            <h3 className="text-3xl font-black">{orders}</h3>
          </div>
          <div className="bg-primary/10 text-primary p-3 text-2xl">
            <FaShoppingBag />
          </div>
        </div>

        {/* Users Card */}
        <div className="flex items-center justify-between border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div>
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              Customers
            </p>
            <h3 className="text-3xl font-black">{users}</h3>
          </div>
          <div className="bg-info/10 text-info p-3 text-2xl">
            <FaUsers />
          </div>
        </div>

        {/* Low Stock Warning */}
        <div className="flex items-center justify-between border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div>
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              Low Stock
            </p>
            <h3 className="text-error text-3xl font-black">{lowStock}</h3>
          </div>
          <div className="bg-error/10 text-error animate-pulse p-3 text-2xl">
            <FaExclamationTriangle />
          </div>
        </div>
      </div>

      {/* Chart of last 7 days sales and revenue */}
      <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="mb-6 flex items-center gap-2 font-black uppercase italic">
          <FaDollarSign className="text-primary" /> Weekly Performance (Revenue
          vs Units Sold)
        </h2>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#eee"
              />
              <XAxis
                dataKey="name"
                stroke="#00bafe"
                axisLine={{ stroke: "#00bafe", strokeWidth: 2 }}
                tick={{ fontSize: 12, fontWeight: "bold" }}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#570df8"
                axisLine={{ stroke: "#570df8", strokeWidth: 2 }}
                tick={{ fontSize: 12, fontWeight: "bold" }}
                tickFormatter={(value) => `$${value / 100}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#f000b8"
                axisLine={{ stroke: "#f000b8", strokeWidth: 2 }}
                tick={{ fontSize: 12, fontWeight: "bold" }}
              />
              <Tooltip />
              <Legend />

              <Bar
                yAxisId="left"
                dataKey="revenue"
                fill="#570df8"
                name="Revenue ($)"
              />
              <Bar
                yAxisId="right"
                dataKey="sales"
                fill="#f000b8"
                name="Items Sold"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- Bottom Section: Recent Orders & Quick Actions --- */}
      <div className="divider h-1 bg-gray-700"></div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Orders Table */}
        <div className="border-2 border-black bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b-2 border-black p-4">
            <h2 className="font-black uppercase italic">Recent Orders</h2>
            <Link
              to="/admin/orders"
              className="btn btn-xs btn-outline rounded-none"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full rounded-none">
              <thead className="bg-gray-50 text-xs text-black uppercase">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {showTableOrders && showTableOrders.length > 0 ? (
                  showTableOrders.slice(0, 5).map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="font-mono text-xs uppercase">
                        #{order._id.slice(-8)}...
                      </td>
                      <td className="font-bold">
                        {order.shippingAddress?.fullName || "Guest User"}
                      </td>
                      <td>
                        <span
                          className={`badge ${getStatusColor(order.status)} badge-sm rounded-none font-bold uppercase italic`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="text-primary font-mono font-bold">
                        ${order.totalAmount?.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-10 text-center font-bold text-gray-400"
                    >
                      No recent orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Operational Status / Quick Actions */}
        <div className="space-y-4">
          <div className="border-2 border-black bg-black p-6 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
            <h2 className="mb-4 flex items-center gap-2 font-black uppercase italic">
              <FaTruck /> Fulfillment
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/20 pb-2">
                <span className="text-sm">Pending Shipments</span>
                <span className="text-xl font-black">{pendingOrder}</span>
              </div>
              <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                Action required to meet shipping policy (3-5 days).
              </p>
              <Link
                to="/admin/orders"
                className="btn btn-primary btn-sm w-full rounded-none"
              >
                Ship Orders Now
              </Link>
            </div>
          </div>

          <div className="border-2 border-black bg-white p-6">
            <h2 className="mb-4 font-black uppercase italic">Quick Links</h2>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/admin/products"
                className="btn btn-outline btn-sm rounded-none text-xs font-bold uppercase italic"
              >
                + Add Product
              </Link>
              <Link
                to="/admin/users"
                className="btn btn-outline btn-sm rounded-none text-xs font-bold uppercase italic"
              >
                Manage Users
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
