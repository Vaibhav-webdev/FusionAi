"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Lock, User, Mail } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    if (searchParams.get("show") === "true") setIsSignup(true);
  }, [searchParams]);

  async function handleLogin() {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Invalid Email or Password!");
    } else {
      toast.success("Login Successfully!");
      router.push("/Ai");
    }
  }

  async function handleSignup() {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (data.success) setIsSignup(false);
  }

  return (
    <section className="relative min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      {/* Background blur */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[220px] opacity-40" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[220px] opacity-40" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl">
        <div className="p-6 sm:p-8 space-y-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white text-center">
            {isSignup ? "Create your account" : "Sign in to your account"}
          </h1>

          <form className="space-y-4">
            {isSignup && (
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-white">
                  <User size={18} /> Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full h-11 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            )}

            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-white">
                <Mail size={18} /> Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full h-11 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-white">
                <Lock size={18} /> Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <button
              type="button"
              onClick={isSignup ? handleSignup : handleLogin}
              className="w-full h-11 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition"
            >
              {isSignup ? "Create Account" : "Sign In"}
            </button>

            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              {isSignup ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignup(false)}
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignup(true)}
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    Sign up
                  </button>
                </>
              )}
            </p>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
              <span className="text-xs text-gray-500">OR</span>
              <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/Ai" })}
                className="flex items-center justify-center gap-2 h-11 w-full border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Image src="/google-color.svg" alt="Google" width={20} height={20} />
                Google
              </button>

              <button
                type="button"
                onClick={() => signIn("github", { callbackUrl: "/Ai" })}
                className="flex items-center justify-center gap-2 h-11 w-full border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Image src="/github-142.svg" alt="GitHub" width={20} height={20} />
                GitHub
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
