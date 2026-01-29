import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import { Link } from "react-router-dom";
import TrainersSection from "../components/TrainersSection";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <PageWrapper>
      {/* HERO SECTION */}
      <section className="pt-20 h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1554284126-aa88f22d8b74')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/70" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold">
            Transform Your Body
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto">
            Join the best gym with professional trainers and world-class equipment.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mt-10"
          >
            <Link
              to="/memberships"
              className="bg-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700"
            >
              View Memberships
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { value: "500+", label: "Members" },
            { value: "20+", label: "Trainers" },
            { value: "10+", label: "Years Experience" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <h2 className="text-5xl font-bold text-red-500">
                {item.value}
              </h2>
              <p className="mt-4 text-gray-400">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <TrainersSection />

      {/* PREMIUM EQUIPMENT SECTION */}
      <section className="relative py-28 bg-linear-to-b from-black via-zinc-900 to-black overflow-hidden">

        {/* BACKGROUND GLOW */}
        <div className="absolute -top-32 -left-32 w-125 h-125 bg-red-600/20 blur-[140px]" />
        <div className="absolute top-1/3 -right-32 w-125 h-125 bg-red-500/20 blur-[140px]" />

        <div className="relative max-w-7xl mx-auto px-6">

          {/* TITLE */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <span className="text-red-500 tracking-widest text-sm uppercase">
              Power • Performance • Precision
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mt-4">
              Elite Training Equipments
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mt-6">
              Built for serious athletes, designed for ultimate performance.
            </p>
          </motion.div>

          {/* CARDS */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {[
              {
                name: "Commercial Treadmill",
                tag: "Cardio Area",
                img: "https://images.unsplash.com/photo-1576678927484-cc907957088c",
              },
              {
                name: "Dumbbell Rack",
                tag: "Free Weights",
                img: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e",
              },
              {
                name: "Bench Press Station",
                tag: "Strength Zone",
                img: "https://images.unsplash.com/photo-1571019613914-85f342c55f55",
              },
              {
                name: "Leg Press Machine",
                tag: "Lower Body",
                img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
              },
              {
                name: "Cable Crossover",
                tag: "Functional Zone",
                img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
              },
              {
                name: "Smith Machine",
                tag: "Assisted Lifts",
                img: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
              },
              {
                name: "Battle Ropes",
                tag: "HIIT Area",
                img: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1",
              },
              {
                name: "Kettlebells",
                tag: "Functional Training",
                img: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a",
              },
            ]

              .map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.6 }}
                  whileHover={{ y: -12 }}
                  className="group relative rounded-2xl p-[1.5px] bg-linear-to-br from-red-500 via-red-700 to-red-900"
                >
                  {/* GLASS CARD */}
                  <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl">

                    {/* IMAGE */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={item.img}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />


                      {/* FLOATING TAG */}
                      <span className="absolute top-4 left-4 bg-red-600/90 px-4 py-1 text-xs font-semibold rounded-full shadow-lg">
                        {item.tag}
                      </span>
                    </div>

                    {/* CONTENT */}
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-white">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 text-xs mt-2 tracking-wide uppercase">
                        Professional Gym Equipment
                      </p>


                      {/* CTA */}
                      <motion.button
                        whileHover={{ y: -10 }}
                        className="mt-6 px-6 py-2 text-sm font-semibold rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition"
                      >
                        Explore
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12  text-gray-800">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 ">
            {[
              "Modern Equipment",
              "Certified Trainers",
              "Flexible Timings",
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <h3 className="text-xl font-bold text-gray-800">{feature}</h3>
                <p className="mt-4 text-gray-600">
                  Experience top quality training with best facilities.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />


    </PageWrapper>
  );
}
