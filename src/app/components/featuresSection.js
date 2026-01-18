"use client"

import React from 'react'
import { motion, spring } from "framer-motion"

const featuresSection = () => {
  return (
    <section
  id="feature"
  className="py-16 sm:py-20 md:py-24 flex flex-col items-center gap-4 px-4"
>
  {/* Badge */}
  <div className="flex items-center gap-2 text-gray-500 border border-gray-200 rounded-full px-4 py-2 text-sm">
    <div className="relative flex size-3.5 items-center justify-center">
      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
      <span className="relative inline-flex size-2 rounded-full bg-green-600"></span>
    </div>
    <span>Book a live demo today</span>
  </div>

  {/* Heading */}
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-600 text-center">
    Powerful Features
  </h1>

  {/* Description */}
  <p className="text-base sm:text-lg text-slate-500 text-center mt-2 max-w-xl sm:max-w-2xl">
    Our streamlined process helps you create a professional resume in minutes
    with intelligent AI-powered tools and features.
  </p>

  {/* Feature Cards */}
  <div className="flex items-center justify-center flex-wrap gap-6 mt-12 sm:mt-16 max-w-6xl">
    
    {/* Card 1 */}
    <motion.div initial={{ opacity: 0}} whileInView={{ opacity: 1}} transition={{ duration: 0.6, ease: "easeInOut"}}>
    <div className="flex flex-col text-center items-center justify-center 
      hover:bg-purple-50 transition rounded-xl p-6 border border-violet-200 
      gap-6 w-full sm:w-[300px]"
    >
      <div className="p-6 aspect-square bg-violet-100 rounded-full">
        {/* icon unchanged */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 18.667V24.5m4.668-8.167V24.5m4.664-12.833V24.5m2.333-21L15.578 13.587a.584.584 0 0 1-.826 0l-3.84-3.84a.583.583 0 0 0-.825 0L2.332 17.5M4.668 21v3.5m4.664-8.167V24.5" stroke="#7F22FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-slate-700">
          Real-Time Analytics
        </h3>
        <p className="text-sm text-slate-600">
          Get instant insights into your finances with live dashboards.
        </p>
      </div>
    </div>
      </motion.div>

    {/* Card 2 */}
    <motion.div initial={{ opacity: 0}} whileInView={{ opacity: 1}} transition={{ duration: 1, ease: "easeInOut"}}>
    <div className="flex flex-col text-center items-center justify-center 
      hover:bg-green-50 transition rounded-xl p-6 border border-green-200 
      gap-6 w-full sm:w-[300px]"
    >
      <div className="p-6 aspect-square bg-green-100 rounded-full">
        {/* icon unchanged */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 11.667A2.333 2.333 0 0 0 11.667 14c0 1.19-.117 2.929-.304 4.667m4.972-3.36c0 2.776 0 7.443-1.167 10.36m5.004-1.144c.14-.7.502-2.683.583-3.523M2.332 14a11.667 11.667 0 0 1 21-7m-21 11.667h.01m23.092 0c.233-2.333.152-6.246 0-7" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-slate-700">
          Bank-Grade Security
        </h3>
        <p className="text-sm text-slate-600">
          End-to-end encryption, 2FA, compliance with GDPR standards.
        </p>
      </div>
    </div>
    </motion.div>

    {/* Card 3 */}
    <motion.div initial={{ opacity: 0}} whileInView={{ opacity: 1}} transition={{ duration: 1.2, ease: "easeInOut"}}>
    <div className="flex flex-col text-center items-center justify-center 
      hover:bg-red-50 transition rounded-xl p-6 border border-orange-200 
      gap-6 w-full sm:w-[300px]"
    >
      <div className="p-6 aspect-square bg-orange-100 rounded-full">
        {/* icon unchanged */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M4.668 25.666h16.333a2.333 2.333 0 0 0 2.334-2.333V8.166L17.5 2.333H7a2.333 2.333 0 0 0-2.333 2.333v4.667" stroke="#F54900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-slate-700">
          Customizable Reports
        </h3>
        <p className="text-sm text-slate-600">
          Export professional, audit-ready financial reports.
        </p>
      </div>
    </div>
</motion.div>
  </div>
</section>

  )
}

export default featuresSection