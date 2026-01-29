import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Memberships from "./pages/Memberships";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import Members from "./pages/Members";
import Contact from "./pages/Contact";
import Attendance from "./pages/Attendance";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import { Toaster } from "react-hot-toast";


export default function App() {
  const location = useLocation();
  
  return (
    <>
      <Navbar/>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/payment" element={<Payment />} />

          {/* ADMIN ONLY */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Attendance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/members"
            element={
              <ProtectedRoute role="admin">
                <Members />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />

        </Routes>
      </AnimatePresence>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#111",
            color: "#fff",
            borderRadius: "10px",
            padding: "14px 18px",
          },
        }}
      />
    </>
  );
}
