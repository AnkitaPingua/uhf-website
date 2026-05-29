"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        setLoading(false);
      }
    };
    checkUser();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-[#F1A42F] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] p-6 lg:p-12 relative overflow-hidden text-white pt-[120px]">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#F1A42F]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1440px] mx-auto relative z-10"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 border-b border-white/10 pb-8 gap-6">
          <div>
            <h1 className="font-cormorant text-[42px] leading-none mb-2 text-[#F5F2EB]">
              Welcome, <span className="italic text-[#F1A42F]">{user?.user_metadata?.full_name || "Admin"}</span>
            </h1>
            <p className="font-inter text-sm text-white/50">{user?.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="font-inter text-xs tracking-widest uppercase border border-white/20 px-6 h-[40px] flex items-center rounded-full hover:bg-white/10 transition-colors">
              Home
            </Link>
            <button 
              onClick={async () => {
                await supabase.auth.signOut();
                router.push("/");
              }}
              className="bg-red-500/10 text-red-400 font-inter text-xs tracking-widest uppercase px-6 h-[40px] flex items-center rounded-full hover:bg-red-500/20 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 p-8 rounded-xl">
            <h3 className="font-cormorant text-2xl mb-2 text-[#F1A42F]">Profile details</h3>
            <p className="font-inter text-sm text-white/60">Manage your account information here.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-xl">
            <h3 className="font-cormorant text-2xl mb-2 text-[#F1A42F]">Donation history</h3>
            <p className="font-inter text-sm text-white/60">View and download your tax receipts.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-xl">
            <h3 className="font-cormorant text-2xl mb-2 text-[#F1A42F]">Impact reports</h3>
            <p className="font-inter text-sm text-white/60">See the real change your support enables.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
