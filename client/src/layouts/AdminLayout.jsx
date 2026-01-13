import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { FaBasketShopping } from "react-icons/fa6";

import {
  IoMenuOutline,
  IoStatsChartOutline,
  IoBagHandleOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import Footer from "../components/common/Footer";

const AdminLayout = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <IoStatsChartOutline size={20} />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <IoBagHandleOutline size={20} />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <FaBasketShopping size={20} />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <IoPeopleOutline size={20} />,
    },
  ];

  return (
    <div className="container mx-auto flex h-screen flex-col">
      {/* Navbar - Fixed at top */}
      <div className="z-20 shadow-sm">
        <Navbar />
      </div>

      <div className="flex flex-1 pt-16">
        {/* Sidebar - Fixed width, full height scrollable */}
        <aside className="bg-base-200 border-base-300 hidden w-64 flex-col border-r md:flex">
          <div className="border-base-300 flex items-center gap-3 border-b p-6">
            <IoMenuOutline size={24} className="text-primary" />
            <span className="text-xl font-bold tracking-tight italic">
              Admin Panel
            </span>
          </div>

          <nav className="flex-1 space-y-2 p-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 transition-colors ${
                    isActive
                      ? "bg-primary text-primary-content font-medium shadow-md"
                      : "hover:bg-base-300 text-base-content/80"
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Different Admin footer */}
          {/* <div className="border-base-300 border-t p-4 text-center text-xs opacity-50">
            v1.0.0 © E-Com Admin
          </div> */}
        </aside>

        {/* Main Content - Scrollable */}
        <main className="bg-base-100 flex-1 overflow-y-auto p-6 md:p-10">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
