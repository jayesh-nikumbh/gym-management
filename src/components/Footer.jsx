import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10"
      >
        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-extrabold text-white">
            GymPro
          </h2>
          <p className="mt-4 text-sm">
            Transform your body with expert trainers and world-class equipment.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-red-500">Home</Link>
            </li>
            <li>
              <Link to="/memberships" className="hover:text-red-500">Plans</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-red-500">Contact</Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <p className="text-sm">📍 Mumbai, India</p>
          <p className="text-sm mt-2">📞 +91 98765 43210</p>
          <p className="text-sm mt-2">✉️ support@gympro.com</p>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            {["Instagram", "Facebook", "YouTube"].map((social, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.15 }}
                href="#"
                className="border border-gray-600 px-4 py-2 rounded-full text-sm hover:text-red-500 hover:border-red-500 transition"
              >
                {social}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800 text-center py-4 text-sm">
        © {new Date().getFullYear()} GymPro. All rights reserved.
      </div>
    </footer>
  );
}
