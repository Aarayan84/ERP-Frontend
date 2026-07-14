import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
          email,
          password,
        }
      );

      const { token, user } = response.data.data;

      login(user,token);

      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
          navigate("/employee-dashboard");
        }
      toast.success("Login Successful!");
    } catch (error) {
        toast.error(
          error.response?.data?.message || "Invaild Email or Password"
      );
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-3xl font-bold text-center mb-6">
          ERP Login
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            disabled={loading}
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="password"
            disabled={loading}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-3 mb-6"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg py-3 text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading?"logging in...":"Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;