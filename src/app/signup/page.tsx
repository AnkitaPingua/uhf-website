"use client";

import React, { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      alert(error.message);
      setError(error.message);
      return;
    }

    alert("Signup successful!");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#F1A42F]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-[#F1A42F]/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[440px] relative z-10 py-12"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8">
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden border border-[#F1A42F]/40 mx-auto shadow-[0_0_15px_rgba(241,164,47,0.1)]">
              <img src="/logo-enhanced.png" alt="Logo" className="w-full h-full object-cover scale-[1.2]" />
            </div>
          </Link>
          <h1 className="font-cormorant font-light text-[42px] leading-[1.1] text-[#F5F2EB] tracking-wide mb-3">
            Join the <span className="italic text-[#F1A42F]">Movement.</span>
          </h1>
          <p className="font-inter text-sm text-white/50 tracking-wider uppercase">
            Create your account
          </p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 font-inter text-xs px-4 py-3 rounded-md text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="font-inter text-[11px] text-white/60 uppercase tracking-widest pl-1">Full Name</label>
            <input 
              type="text" 
              required
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg h-[50px] px-4 font-inter text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F1A42F]/50 focus:bg-white/10 transition-all"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="font-inter text-[11px] text-white/60 uppercase tracking-widest pl-1">Email</label>
            <input 
              type="email" 
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg h-[50px] px-4 font-inter text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F1A42F]/50 focus:bg-white/10 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-inter text-[11px] text-white/60 uppercase tracking-widest pl-1">Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg h-[50px] px-4 font-inter text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F1A42F]/50 focus:bg-white/10 transition-all"
            />
          </div>

          <button 
            type="submit"
            className="mt-4 bg-[#F1A42F] text-[#050505] font-inter font-semibold text-[12px] tracking-[0.18em] uppercase rounded-full h-[52px] flex items-center justify-center hover:bg-white transition-colors"
          >
            SIGN UP
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="font-inter text-xs text-white/40">
            Already have an account?{" "}
            <Link href="/login" className="text-[#F1A42F] hover:text-white transition-colors underline-offset-4 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
