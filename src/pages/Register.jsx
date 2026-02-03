import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-black">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
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
transition
"
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
transition
"
            onChange={handleChange}
            required
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-lg border 
border-gray-300 dark:border-gray-600
bg-white dark:bg-gray-900
text-black dark:text-white
placeholder-gray-400 dark:placeholder-gray-400
focus:outline-none 
focus:border-red-500 dark:focus:border-red-500
focus:ring-2 focus:ring-red-500/40
transition
"
            onChange={handleChange}
            required
          />

          <button
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold"
            type="submit"
          >
            Register
          </button>
        </form>
      </motion.div>
    </div>
  );
}
