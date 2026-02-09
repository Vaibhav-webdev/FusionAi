"use client";

import Sidebar from "./Sidebar";
import Dash from "./Dash";
import ArticleGenerator from "./Article";
import BlogGenerator from "./Blog";
import ImageGenerator from "./Image";
import { useState, useEffect } from "react";
import BackgroundRemoval from "./Remove";
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

  return (
    <div className="flex bg-gray-50">
      <Sidebar />
      {show === 0 && <Dash credits={credits} plan={plan} creations={creations} />}
      {show === 1 && <ArticleGenerator setRender={setRender} credits={credits} updateUser={updateUser}/>}
      {show === 2 && <BlogGenerator setRender={setRender} credits={credits} updateUser={updateUser}/>}
      {show === 3 && <ImageGenerator setRender={setRender} credits={credits} updateUser={updateUser}/>}
      {show === 4 && <BackgroundRemoval setRender={setRender} credits={credits} updateUser={updateUser}/>}
      {show === 5 && <ObjectRemoval setRender={setRender} credits={credits} updateUser={updateUser}/>}
      {show === 6 && <YoutubeGenerator setRender={setRender} credits={credits} updateUser={updateUser}/>}
      {show === 7 && <EmailGenerator setRender={setRender} credits={credits} updateUser={updateUser}/>}
    </div>
  );
}
