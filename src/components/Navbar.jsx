import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import toast from "react-hot-toast";

export default function Navbar() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const { theme } = useTheme();

  const location = useLocation();
  const { role, user, logout } = useAuth();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen)
      document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  const isHome = location.pathname === "/";
  const bgColor =
    scrolled || !isHome
      ? theme === "dark"
        ? "#000000"
        : "#ffffff"
      : "rgba(0,0,0,0.35)";

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        animate={{
          boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.25)" : "none",
        }}
        transition={{ duration: 0.25 }}
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md"
        style={{
          backgroundColor: "var(--bg)",
          color: "var(--text)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* LEFT: LOGO + USER */}
          <div className="flex items-center gap-4 ">
            {/* LOGO */}
            <Link to="/" className="text-2xl font-extrabold">
              GymPro
            </Link>

            {/* USER INFO */}
            {role && user && (
              <div className="flex items-center gap-2">
                <span className="hidden sm:block text-sm opacity-80">
                  Hello, <span className="font-semibold">{user.name}</span>
                </span>

                <span className="sm:hidden text-sm font-semibold">
                  {user.name}
                </span>

                {role === "admin" && (
                  <span className="px-2 py-0.5 text-[10px] sm:text-xs rounded bg-red-500 text-white font-semibold">
                    ADMIN
                  </span>
                )}
              </div>
            )}
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-8 items-center text-gray-900 font-medium "> 
            <NavItem to="/" active={isActive("/")}>
              Home
            </NavItem>
            <NavItem to="/memberships" active={isActive("/memberships")}>
              Plans
            </NavItem>
            <NavItem to="/contact" active={isActive("/contact")}>
              Contact
            </NavItem>
            {!role && (
              <NavItem to="/login" active={isActive("/login")}>
                Login
              </NavItem>
            )}
            {role === "admin" && (
              <NavItem to="/dashboard" active={isActive("/dashboard")}>
                Dashboard
              </NavItem>
            )}
            {role === "user" && (
              <NavItem to="/attendance" active={isActive("/attendance")}>
                Attendance
              </NavItem>
            )}
            {role && (
              <button
                onClick={() => {
                  setShowLogoutConfirm(true);
                }}
                className="hover:text-red-500 transition text-gray-300"
              >
                Logout
              </button>
            )}
            <ThemeToggle />
          </div>

          {/* HAMBURGER (MOBILE) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-3xl">
            ☰
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 bg-black/80 backdrop-blur-md z-50 p-6 flex flex-col gap-6"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-xl self-end"
            >
              ✕
            </button>

            <NavItem to="/" active={isActive("/")}>
              Home
            </NavItem>
            <NavItem to="/memberships" active={isActive("/memberships")}>
              Plans
            </NavItem>
            <NavItem to="/contact" active={isActive("/contact")}>
              Contact
            </NavItem>
            {!role && (
              <NavItem to="/login" active={isActive("/login")}>
                Login
              </NavItem>
            )}
            {role === "admin" && (
              <NavItem to="/dashboard" active={isActive("/dashboard")}>
                Dashboard
              </NavItem>
            )}
            {role === "user" && (
              <NavItem to="/attendance" active={isActive("/attendance")}>
                Attendance
              </NavItem>
            )}
            {role && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowLogoutConfirm(true);
                }}
                className="text-left text-gray-300 hover:text-red-500"
              >
                Logout
              </button>
            )}

            <ThemeToggle />
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOGOUT MODAL */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-999">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm text-center">
            <h3 className="text-xl font-bold mb-4 text-black">
              Confirm Logout
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  toast.error("Logout cancelled");
                }}
                className="w-1/2 py-2 border text-black rounded "
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  logout();
                  toast.success("Logged out successfully");
                }}
                className="w-1/2 py-2 bg-red-600 text-white rounded"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* NAV ITEM */
function NavItem({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`
        relative px-1 py-1 transition font-medium
        ${
          active
            ? "text-red-500"
            : "text-gray-800 hover:text-red-500 dark:text-gray-200"
        }
      `}
    >
      {children}

      {active && (
        <motion.span
          layoutId="nav-underline-desktop"
          className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500 rounded"
        />
      )}
    </Link>
  );
}
