"use client"

import React from 'react'
import Image from 'next/image'

const footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#eaf1ff] to-[#FFFFFF] text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col items-center">
        <div className="w-50 h-14 relative mb-4">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
        <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
          Empowering creators worldwide with the most advanced AI content creation tools. Transform your ideas
          into reality.
        </p>
      </div>
      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
          <a href='#'>FusionAi</a> ©2026. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default footer
