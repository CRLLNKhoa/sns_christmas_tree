"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useUser } from "@/store/user";
import Loading from "@/components/Loading";
import { createBrowserClient } from "@supabase/ssr";
import { getTree } from "@/actions/api";
import {toast} from "react-toastify"

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser((state) => state.user);
  const tree = useUser((state) => state.tree);
  const setUser = useUser((state) => state.setUser);
  const setMyTree = useUser((state) => state.setMyTree);
  const router = useRouter();

  const ReadTree = async (user) => {
    try {
      const { data } = await getTree(user);
      setMyTree(data[0]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    } else ReadTree(user?.id);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(undefined);
    router.push("/auth");
  };

  const handleShare = () => {
    toast.success('Sao chép link thành công!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    navigator.clipboard.writeText(`https://christmas-tree.vercel.app?tree=${tree?.tree_id}`);
  }

  return (
    <div className="bg-black">
      <div className="css-1dt74mclong min-h-screen p-4 bg-black flex flex-col justify-between">
        <div className="text-white">
          <h1 className="font-bold text-lg text-white">
            Chào {user?.user_metadata?.full_name}
          </h1>
          <h1>🤫 Bạn đã nhận được nhiều tin nhắn!</h1>
        </div>
        {tree && (
          <div className="css-wqghcw relative border-gray-500 border-2 overflow-hidden rounded-md">
            <img
              src={`/assets/bg/background_${tree.bg}.webp`}
              alt=""
            />
            <img
              src={`/assets/tree/tree_${tree.tree}.webp`}
              alt="tree"
              className="absolute w-[200px] bottom-8"
            />
            {tree.toper !== 13 && (
              <img
                src={`/assets/toper/point_${tree.toper}.webp`}
                alt="tree"
                className="absolute w-[80px] bottom-[232px] rounded-md"
              />
            )}
          </div>
        )}
        {!tree && (
          <div className="css-wqghcw w-[300px] relative border-gray-500 border-2 overflow-hidden rounded-md">
            <img
              src={`/assets/tree/tree-empty.png`}
              alt="tree"
              className="absolute w-[200px] bottom-8"
            />
          </div>
        )}
        <div className="flex gap-4">
          {!tree && (
            <Button
              className="flex-1"
              color="green"
              onClick={() => router.push("my-tree/create")}
            >
              Tạo cây mới
            </Button>
          )}
            {tree?.tree_id &&  <Button className="flex-1" onClick={handleShare} color="white">Chia sẻ</Button>}
          <Button
            onClick={handleLogout}
            color="red"
            className="text-white"
          >
            <img
              src="/logout.svg"
              className="w-5 h-5"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
