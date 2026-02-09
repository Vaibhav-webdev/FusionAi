"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from 'react'

const Navbar = () => {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur text-slate-800 text-sm dark:bg-black/70">
      <div className="w-40 h-14 relative">
        <Image
          src="/logo.png"
          alt="Logo"
          fill
          className="object-contain"
        />
      </div>

      <div className="hidden md:flex items-center gap-8">
        <Link href="#" className="hover:text-slate-500">Home</Link>
        <Link href="#products" className="hover:text-slate-500">Products</Link>
        <Link href="#reviews" className="hover:text-slate-500">Reviews</Link>
        <Link href="#pricing" className="hover:text-slate-500">Pricing</Link>
      </div>

      <button onClick={() => {
        router.push("/Ai")
      }} className="hidden md:block px-6 py-2.5 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full">
        Request free trial
      </button>

      <div
        className={`fixed inset-0 z-[100] bg-white/60 backdrop-blur flex flex-col items-center justify-center gap-8 text-lg transition-transform duration-300
                ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/products" onClick={() => setMenuOpen(false)}>Products</Link>
        <Link href="/stories" onClick={() => setMenuOpen(false)}>Stories</Link>
        <Link href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>

        <button
          onClick={() => setMenuOpen(false)}
          className="bg-slate-100 hover:bg-slate-200 rounded-md p-2"
        >
          ✕
        </button>
      </div>
    </nav>
  )
}

export default Navbar