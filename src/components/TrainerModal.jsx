import { motion } from "framer-motion";

export default function TrainerModal({ trainer, onClose }) {
  if (!trainer) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 text-white max-w-md w-full rounded-2xl p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl"
        >
          ✕
        </button>

        <img
          src={trainer.image}
          className="w-full h-60 object-cover rounded-xl mb-4"
        />

        <h2 className="text-2xl font-bold">{trainer.name}</h2>
        <p className="text-red-500 font-semibold">{trainer.role}</p>
        <p className="text-gray-400 mt-2">{trainer.experience}</p>
        <p className="mt-4 text-gray-300">{trainer.bio}</p>
      </motion.div>
    </div>
  );
}
