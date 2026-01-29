import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Payment() {
  const { state: plan } = useLocation();
  const navigate = useNavigate();

  // ✅ Safe redirect
  useEffect(() => {
    if (!plan) {
      navigate("/memberships");
    }
  }, [plan, navigate]);

  if (!plan) return null;

  const handlePayment = async () => {
  const res = await fetch("http://localhost:5000/api/payment/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: plan.price }),
  });

  const order = await res.json();

  const options = {
    key: "rzp_test_xxxxxxxx", // Razorpay test key
    amount: order.amount,
    currency: "INR",
    name: "GymPro",
    description: `${plan.name} Membership`,
    order_id: order.id,

    handler: function (response) {
      console.log("Payment Success", response);
      navigate("/attendance");
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open(); // 🚀 REAL PAYMENT PAGE OPEN
};
if (!window.Razorpay) {
  alert("Razorpay SDK not loaded");
  return;
}

  return (
    <div className="min-h-screen bg-black text-white pt-28 flex justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-4">Payment</h2>

        <div className="border border-white/10 rounded-xl p-4 mb-6">
          <p className="text-lg font-semibold">{plan.name} Plan</p>
          <p className="text-gray-400">{plan.duration}</p>
          <p className="text-2xl font-bold mt-2">₹{plan.price}</p>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold"
        >
          Pay ₹{plan.price}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="w-full mt-3 py-2 rounded-xl bg-gray-700 hover:bg-gray-600"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
}

