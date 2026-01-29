import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const plans = [
  {
    name: "Basic",
    price: 999,
    duration: "1 Month",
    features: ["Gym Access", "Locker Facility", "Basic Support"],
    popular: false,
  },
  {
    name: "Standard",
    price: 2499,
    duration: "3 Months",
    features: [
      "Gym Access",
      "Locker Facility",
      "Trainer Guidance",
      "Diet Tips",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: 4499,
    duration: "6 Months",
    features: [
      "Unlimited Access",
      "Personal Trainer",
      "Diet Plan",
      "Steam & Sauna",
      "Priority Support",
    ],
    popular: false,
  },
];

export default function Memberships() {
  const { role } = useAuth(); // login check
  const navigate = useNavigate();
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const handleGetStarted = (plan) => {
  if (role) {
    navigate("/payment", { state: plan });
  } else {
    setShowLoginAlert(true);
  }
};


  return (
    <div className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black text-white pt-28 pb-20 px-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Choose Your Perfect Plan
        </h1>
        <p className="text-gray-400 text-lg">
          Flexible plans designed to match your fitness journey
        </p>
      </motion.div>

      {/* PLANS */}
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 30px 60px rgba(239,68,68,0.35)",
            }}
            className={`relative rounded-2xl p-8 border transition-all duration-300
              ${
                plan.popular
                  ? "border-red-500 bg-linear-to-br from-red-500/20 to-black"
                  : "border-gray-800 bg-gray-900"
              }`}
          >
            {plan.popular && (
              <span className="absolute -top-4 right-6 bg-red-500 text-white px-4 py-1 text-sm rounded-full font-semibold">
                Most Popular
              </span>
            )}

            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <p className="text-gray-400 mb-6">{plan.duration}</p>

            <div className="text-4xl font-extrabold mb-6">
              ₹{plan.price}
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <CheckCircle className="text-red-500 w-5 h-5" />
                  {feature}
                </li>
              ))}
            </ul>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGetStarted(plan)}
              className={`w-full py-3 rounded-xl font-semibold transition
                ${
                  plan.popular
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
            >
              Get Started
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* LOGIN ALERT */}
      {showLoginAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 text-white rounded-2xl p-8 w-full max-w-sm text-center shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-4">
              Login Required
            </h2>
            <p className="text-gray-400 mb-6">
              Please login to access membership plans.
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowLoginAlert(false)}
                className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition font-semibold"
              >
                OK
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
