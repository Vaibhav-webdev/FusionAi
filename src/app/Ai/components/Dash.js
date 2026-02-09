import React from 'react'
import StatCard from "./Startcard";
import { FiZap } from "react-icons/fi";
import { BsGem } from "react-icons/bs";
import { FiCreditCard } from 'react-icons/fi';

const Dash = ({plan, creations, credits}) => {
  return (
    <main className="flex-1 p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Creations"
            value={creations}
            icon={<FiZap size={22} />}
            gradient="bg-gradient-to-r from-blue-500 to-cyan-400"
          />
          <StatCard
            title="Active Plan"
            value={plan}
            icon={<BsGem size={22} />}
            gradient="bg-gradient-to-r from-pink-500 to-purple-500"
          />
          <StatCard
            title="Your Credits"
            value={credits}
            icon={<FiCreditCard size={22} />}
            gradient="bg-gradient-to-r from-yellow-500 to-orange-500"
          />
        </div>

        {/* Recent Creations */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">
            Recent Creations
          </h2>

          <div className="bg-white rounded-xl h-40 flex items-center justify-center text-gray-400 text-sm">
            No creations yet
          </div>
        </div>
      </main>
  )
}

export default Dash