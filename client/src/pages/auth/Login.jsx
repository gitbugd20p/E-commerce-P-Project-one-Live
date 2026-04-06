import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error, user } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);
  };

  // Redirection if user exists
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-base-200 flex min-h-[calc(100vh-20vh)] items-center justify-center px-4">
        {/* Card Wrapper */}
        <div className="card bg-base-100 border-base-300 w-full max-w-md border shadow-xl">
          <div className="card-body">
            <h1 className="card-title mb-4 justify-center text-3xl font-bold">
              Welcome
            </h1>
            <p className="text-base-content/60 mb-6 text-center">
              Please enter your details to sign in <br />
              or use <br /> email:
              <span className="text-bold text-blue-400">
                {" "}
                sam9@gmail.com
              </span>{" "}
              <br />
              password:{" "}
              <span className="text-bold text-blue-400">123456789</span>
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
                  placeholder="sam9@gmail.com"
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
                  placeholder="123456789"
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
                  className={`btn btn-primary w-full text-white shadow-md ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Authenticating..." : "Login"}
                </button>
              </div>
            </form>

            <div className="divider">OR</div>

            <p className="text-center text-sm">
              Don't have an account?
              <span
                className="link link-primary ml-1 font-semibold"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
