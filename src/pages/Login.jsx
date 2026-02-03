import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";


export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      login(data.role, {
  name: data.name,
  email: data.email,
});
// admin / user
      toast.success("Login successful 🎉");
      navigate(data.role === "admin" ? "/" : "/dashboard");

    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-black">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to continue your fitness journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email address"
            className="w-full p-3 rounded-lg border 
            border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-900
            text-black dark:text-white
            placeholder-gray-400 dark:placeholder-gray-400
            focus:outline-none 
            focus:border-red-500 dark:focus:border-red-500
            focus:ring-2 focus:ring-red-500/40
            transition" 
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg border 
            border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-900
            text-black dark:text-white
            placeholder-gray-400 dark:placeholder-gray-400
            focus:outline-none 
            focus:border-red-500 dark:focus:border-red-500
            focus:ring-2 focus:ring-red-500/40
            transition"
            onChange={handleChange}
            required
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            type="submit"
          >
            Login
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <span
            className="text-red-600 font-semibold cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>

        </div>
      </motion.div>
    </div>
  );
} 