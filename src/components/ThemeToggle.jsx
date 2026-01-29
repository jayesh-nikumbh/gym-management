import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center px-1"
    >
      {/* SLIDER */}
      <motion.div
  layout
  transition={{ type: "spring", stiffness: 150, damping: 10 }}
  className={`w-6 h-6 rounded-full flex items-center justify-center
    ${isDark ? "bg-black text-white translate-x-6" : "bg-white text-black"}
  `}
>
  {isDark ? "🌙" : "🌞"}
</motion.div>

    </button>
  );
}
