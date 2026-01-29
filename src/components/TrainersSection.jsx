import { useState } from "react";
import { motion } from "framer-motion";
import TrainerModal from "./TrainerModal";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function TrainersSection() {
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const trainers = [
    {
      id: 1,
      name: "Arjun Mehta",
      role: "Certified Fitness Trainer",
      experience: "8+ Years",
      image: "/src/assets/trainers/trainer1.jpg",
      instagram: "#",
      twitter: "#",
      linkedin: "#",
      bio: "Specialist in weight training and body transformation.",
    },
    {
      id: 2,
      name: "Neha Sharma",
      role: "Yoga & Cardio Coach",
      experience: "6+ Years",
      image: "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=600&h=600&fit=crop",
      instagram: "#",
      twitter: "#",
      linkedin: "#",
      bio: "Expert in yoga, flexibility, and fat loss programs.",
    },
    {
      id: 3,
      name: "Saket Gokhale",
      role: "Strength & CrossFit Coach",
      experience: "10+ Years",
      image: "/src/assets/trainers/trainer3.jpg",
      instagram: "#",
      twitter: "#",
      linkedin: "#",
      bio: "Powerlifting & CrossFit expert with competition experience.",
    },
  ];

  return (
    <section className="bg-black text-white py-20 px-6 overflow-hidden">
      <h2 className="text-4xl font-extrabold text-center mb-16">
        Meet Our Expert Trainers
      </h2>

      {/* DESKTOP: Infinite horizontal scroll */}
      <div className="hidden md:flex overflow-hidden">
        <motion.div
          className="flex gap-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {[...trainers, ...trainers].map((trainer, index) => (
            <TrainerCard
              key={index}
              trainer={trainer}
              onClick={() => setSelectedTrainer(trainer)}
            />
          ))}
        </motion.div>
      </div>

      {/* MOBILE: stacked cards */}
      <div className="flex flex-col gap-8 md:hidden">
        {trainers.map((trainer) => (
          <TrainerCard
            key={trainer.id}
            trainer={trainer}
            onClick={() => setSelectedTrainer(trainer)}
          />
        ))}
      </div>

      {/* MODAL */}
      <TrainerModal
        trainer={selectedTrainer}
        onClose={() => setSelectedTrainer(null)}
      />
    </section>
  );
}

/* Trainer Card Component */
function TrainerCard({ trainer, onClick }) {
  return (
    <div className="min-w-75 md:min-w-70 bg-gray-900 rounded-2xl overflow-hidden shadow-lg shrink-0">
      <img
        src={trainer.image}
        className="w-full h-72 sm:h-80 object-cover rounded-xl"
        alt={trainer.name}
        
      />
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold">{trainer.name}</h3>
        <p className="text-red-500">{trainer.role}</p>

        {/* SOCIALS */}
        <div className="flex justify-center gap-4 mt-4 text-xl">
          <a href={trainer.instagram}><FaInstagram /></a>
          <a href={trainer.twitter}><FaTwitter /></a>
          <a href={trainer.linkedin}><FaLinkedin /></a>
        </div>

        <button
          onClick={onClick}
          className="mt-4 text-sm text-red-500 underline"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}
