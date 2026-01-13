import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { register, loading, error, user } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form);
    if (user) navigate("/");
  };

  return (
    // Register Form
    <div className="container mx-auto p-6">
      <div className="bg-base-200 flex min-h-[calc(100vh-20vh)] items-center justify-center px-4">
        {/* Card Wrapper */}
        <div className="card bg-base-100 border-base-300 w-full max-w-md border shadow-xl">
          <div className="card-body">
            <h1 className="card-title mb-4 justify-center text-3xl font-bold">
              Create Your Account...
            </h1>
            <p className="text-base-content/60 mb-6 text-center">
              Please enter your email and password to register
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="input input-bordered focus:input-primary w-full transition-all"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered focus:input-primary w-full transition-all"
                  onChange={handleChange}
                  required
                />
              </div>

              {error && (
                <div className="alert alert-error py-2 text-sm shadow-sm">
                  <span>{error}</span>
                </div>
              )}

              <div className="form-control mt-6">
                <button
                  type="submit"
                  className={`btn btn-primary w-full text-white shadow-md ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Creating new account..." : "Register"}
                </button>
              </div>
            </form>

            <div className="divider">OR</div>

            <p className="text-center text-sm">
              Already have an account?
              <span
                className="link link-primary ml-1 font-semibold"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
