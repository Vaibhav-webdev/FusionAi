"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import {
  FiHome,
  FiEdit,
  FiHash,
  FiImage,
  FiScissors,
  FiLayers,
  FiMail,
  FiType,
} from "react-icons/fi";

const menu = [
  { name: "Dashboard", icon: FiHome },

  // Writing tools
  { name: "Write Article", icon: FiEdit },
  { name: "Generate Keyword", icon: FiHash },

  // Image tools
  { name: "Generate Images", icon: FiImage },
  { name: "Remove Background", icon: FiScissors },
  { name: "Remove Object", icon: FiLayers },

  // Business tools
  { name: "Social Media Titles", icon: FiType },
  { name: "AI Email Writer", icon: FiMail },
];

export default function Sidebar() {
  const { data: session } = useSession();
  const searchParams = useSearchParams()
  const [image, setImage] = useState("")
  const [name, setName] = useState("")
  const router = useRouter()
  const [show, setShow] = useState(0)
  const show_id = searchParams.get("show")

  useEffect(() => {
    const image = session?.user?.image;
    const name = session?.user?.name || "A";

    setImage(image)
    setName(name)
  }, [session])

  useEffect(() => {
    setShow(Number(show_id))
  }, [show_id])

  return (
    <aside className="w-78 h-screen bg-white border-r flex flex-col">
      {/* Logo */}
      <div className="flex justify-center items-center py-5 border-gray-200 border-b text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
        ✳ Fusion Ai
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-6 px-4 space-y-1">
        {menu.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.04 }}
            onClick={() => {
              router.push(`/Ai?show=${i}`)
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
              ${show === i
                ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
                : "text-gray-600 hover:bg-purple-50"
              }`}
          >
            <item.icon size={18} />
            <span className="text-sm font-medium">{item.name}</span>
          </motion.div>
        ))}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t flex items-center justify-between gap-3 px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
            {image ? (
              <Image
                src={image}
                alt="User Avatar"
                fill
                className="object-cover"
              />
            ) : (
              <span>{name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-xs text-gray-500">Free Plan</p>
          </div>
        </div>
        <div onClick={() => {
          signOut({ redirect: true, callbackUrl: "/login" })
        }} className="hover:bg-gray-200 cursor-pointer rounded-full p-1">
          <LogOut size={20} className="text-gray-700" />
        </div>
      </div>
    </aside>
  );
}
