"use client";
import { useUser } from "@/store/user";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const user = useUser((state) => state.user);
  useEffect(() => {
    if (user) {
      router.push("/my-tree");
    }
  }, [user]);
  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <img
        src="/loading.svg"
        alt="loading"
        className="w-24 animate-spin"
      />
    </div>
  );
}
