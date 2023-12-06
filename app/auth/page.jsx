"use client";
import React, { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { createBrowserClient } from "@supabase/ssr";
import { useUser } from "@/store/user";
import { useRouter } from "next/navigation";

export default function Page() {
    const user = useUser((state) => state.user)
    const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // NOTE Login github
  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: location.origin + "/auth/callback?next=/check",
      },
    });
  };

  useEffect(() => {
    if(user){
        router.push("/my-tree")
    }
  }, []);

  return (
    <div className="flex bg-black h-screen text-white flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Color my tree!</h1>
      <p>Fill your tree with love💝</p>
      <img
        src="https://colormytree.me/assets/tree-teaser-709196bd.png"
        alt="img"
        className="w-[120px] my-4"
      />
      <Button
        color="white"
        className="flex items-center gap-3"
        onClick={handleLogin}
      >
        <img
          src="/gg.svg"
          className="w-8 h-8"
        />
        Đăng nhập với Google
      </Button>
    </div>
  );
}
