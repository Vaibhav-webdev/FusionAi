import React from 'react'
import Dashboard from './components/Dashboard'
import { auth } from '../auth';
import { redirect } from "next/navigation";

const page = async () => {
   const session = await auth();

  if (!session) {
    redirect("/login");
  }
  return (
    <Dashboard />
  )
}

export default page