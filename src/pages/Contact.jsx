import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  /* ================= VALIDATION ================= */
  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Invalid email address";
    if (!formData.message.trim()) errs.message = "Message is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ================= FORM CHANGE ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    emailjs
      .send(
        "service_61rwgek",     // EmailJS Service ID
        "template_p2frnhr",    // EmailJS Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "agrclasses45@gmail.com",
        },
        "YA3SsFIp-a_7oHEgQ"    // EmailJS Public Key
      )
      .then(() => {
        toast.success("Message sent successfully 🚀");

        setFormData({ name: "", email: "", message: "" });
        setErrors({});
      })
      .catch((err) => {
        toast.error("Failed to send message ❌");
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black text-white pt-28 px-6 pb-20">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Contact Us
        </h1>
        <p className="text-gray-400 text-lg">
          Get in touch with us — we’d love to hear from you
        </p>
      </motion.div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-2">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="bg-gray-900 p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Gym Address</h2>
            <p className="text-gray-300">
              GymPro Fitness Center<br />
              MG Road, Andheri East<br />
              Mumbai, Maharashtra – 400069
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
            <p className="text-gray-300">📞 Phone: +91 98765 43210</p>
            <p className="text-gray-300">📧 Email: support@gympro.com</p>
            <p className="text-gray-300">🕒 Timings: 6 AM – 11 PM</p>
          </div>

          <div className="bg-gray-900 p-4 rounded-2xl shadow-md overflow-hidden">
            <iframe
              title="Gym Location"
              src="https://www.google.com/maps?q=Andheri%20East%20Mumbai&output=embed"
              className="w-full h-64 rounded-xl border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900 p-8 rounded-2xl shadow-md space-y-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>

          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 rounded bg-black border ${
                errors.name ? "border-red-500" : "border-gray-700"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded bg-black border ${
                errors.email ? "border-red-500" : "border-gray-700"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-3 rounded bg-black border ${
                errors.message ? "border-red-500" : "border-gray-700"
              }`}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-red-500 hover:bg-red-600 rounded-xl font-semibold"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
