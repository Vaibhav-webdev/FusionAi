"use client";
import { motion } from "framer-motion";

export default function StatCard({ title, value, icon, gradient }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between"
    >
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${gradient}`}
      >
        {icon}
      </div>
    </motion.div>
  );
}
