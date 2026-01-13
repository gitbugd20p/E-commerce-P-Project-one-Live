import { Link, NavLink } from "react-router-dom";
import useAuthStore from "./../../store/useAuthStore";
import useCartStore from "../../store/useCartStore";
import { FaCartArrowDown } from "react-icons/fa";
import logo from "../../assets/images/Logo_1_PU.png";

const Navbar = () => {
  const { isAuth, user, logout } = useAuthStore();

  const cartCount = useCartStore((state) =>
    state.cart.reduce((sum, i) => sum + i.quantity, 0),
  );

  return (
    <div className="bg-base-100 fixed top-0 left-0 z-50 w-full shadow-lg">
      <div className="navbar container mx-auto">
        <div className="flex-1">
          <Link
            to="/"
            className="group flex w-fit items-center rounded-none px-4 py-2 transition-all duration-300 ease-in-out hover:bg-black"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-8 w-auto object-contain p-1 transition-all duration-300 group-hover:scale-110 group-hover:invert"
            />
            <span className="ml-2 pr-1 font-black tracking-tighter uppercase italic group-hover:text-white">
              S-E-commmerce
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `px-4 py-2 font-semibold transition-colors ${
                isActive
                  ? "bg-primary text-primary-content font-medium shadow-md"
                  : "hover:bg-base-300 text-base-content/80"
              }`
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `px-4 py-2 font-semibold transition-colors ${
                isActive
                  ? "bg-primary text-primary-content font-medium shadow-md"
                  : "hover:bg-base-300 text-base-content/80"
              }`
            }
          >
            Products
          </NavLink>
          {isAuth ? (
            <>
              {user.role === "user" && (
                <>
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      `indicator btn ${isActive ? "btn-primary rounded-none" : "btn-ghost rounded-none"}`
                    }
                  >
                    <span className="indicator-item badge badge-secondary">
                      {cartCount}
                    </span>
                    <span className="flex items-center gap-2 text-lg font-medium">
                      <FaCartArrowDown
                        className={({ isActive }) =>
                          isActive ? "text-white" : "text-primary"
                        }
                      />
                      Cart
                    </span>
                  </NavLink>

                  <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                      `px-4 py-2 font-semibold transition-colors ${
                        isActive
                          ? "bg-primary text-primary-content font-medium shadow-md"
                          : "hover:bg-base-300 text-base-content/80"
                      }`
                    }
                  >
                    Orders
                  </NavLink>
                </>
              )}

              {user?.role === "admin" && (
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) =>
                    `px-4 py-2 font-semibold transition-colors ${isActive || location.pathname.includes("admin") ? "bg-primary font-medium text-white shadow-md" : "hover:bg-base-300 text-base-content/80"}`
                  }
                >
                  Admin Dashboard
                </NavLink>
              )}

              <button
                onClick={logout}
                className="cursor-pointer bg-red-500 px-4 py-2 font-semibold hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost rounded-none">
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-sm rounded-none"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
