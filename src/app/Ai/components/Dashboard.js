"use client";

import Sidebar from "./Sidebar";
import Dash from "./Dash";
import ArticleGenerator from "./Article";
import BlogGenerator from "./Blog";
import ImageGenerator from "./Image";
import { useState, useEffect } from "react";
import BackgroundRemoval from "./Remove";
import { Menu, X } from "lucide-react";
import ObjectRemoval from "./Object";
import YoutubeGenerator from "./Youtube";
import EmailGenerator from "./Email";
import { useSearchParams } from "next/navigation";

export default function Dashboard() {
  const searchParams = useSearchParams()
  const [show, setshow] = useState(0)
  const [plan, setPlan] = useState("")
  const [creations, setCreations] = useState(0)
  const [credits, setCredits] = useState(0)
  const [render, setRender] = useState(true)

  const show_id = searchParams.get("show")
  useEffect(() => {
    setshow(Number(show_id))
  }, [show_id])

  useEffect(() => {
    async function main() {
      const response = await fetch("/api/data")
      const data = await response.json()
      setPlan(data.plan)
      setCreations(data.creations)
      setCredits(data.credits)
    }
    main()
  }, [render])

  // frontend component
const updateUser = async (cre) => {
  const res = await fetch("/api/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      creditUsed: cre, // jitna credit use hua
    }),
  });

  const data = await res.json();
};

const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="bg-gray-50 flex relative">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static z-40 top-0 left-0 h-full shadow-lg
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Mobile close button */}
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>
        <Sidebar />
      </div>

      {/* Right Content */}
      <div className="flex-1 w-full">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-20 bg-white border-b px-4 py-3 flex items-center">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>
          <h1 className="ml-4 font-semibold text-gray-700">Dashboard</h1>
        </div>

        {/* Page Content */}
        <div className="sm:p-4">
          {show === 0 && (
            <Dash credits={credits} plan={plan} creations={creations} />
          )}
          {show === 1 && (
            <ArticleGenerator
              refresh={() => setRender((p) => !p)}
              credits={credits}
              updateUser={updateUser}
            />
          )}
          {show === 2 && (
            <BlogGenerator
              refresh={() => setRender((p) => !p)}
              credits={credits}
              updateUser={updateUser}
            />
          )}
          {show === 3 && (
            <ImageGenerator
              refresh={() => setRender((p) => !p)}
              credits={credits}
              updateUser={updateUser}
            />
          )}
          {show === 4 && (
            <BackgroundRemoval
              refresh={() => setRender((p) => !p)}
              credits={credits}
              updateUser={updateUser}
            />
          )}
          {show === 5 && (
            <ObjectRemoval
              refresh={() => setRender((p) => !p)}
              credits={credits}
              updateUser={updateUser}
            />
          )}
          {show === 6 && (
            <YoutubeGenerator
              refresh={() => setRender((p) => !p)}
              credits={credits}
              updateUser={updateUser}
            />
          )}
          {show === 7 && (
            <EmailGenerator
              refresh={() => setRender((p) => !p)}
              credits={credits}
              updateUser={updateUser}
            />
          )}
        </div>
      </div>
    </div>
  );
}
