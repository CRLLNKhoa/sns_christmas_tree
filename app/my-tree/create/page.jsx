"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
} from "@material-tailwind/react";
import { cn } from "@/lib/untils";
import { useRouter } from "next/navigation";
import { useUser } from "@/store/user";
import { newTree } from "@/actions/api";

export default function Page() {
  const [toper, setToper] = useState(13);
  const [bg, setBg] = useState(10);
  const [tree, setTree] = useState(10);
  const router = useRouter();
  const user = useUser((state) => state.user);
  const setMyTree = useUser((state) => state.setMyTree);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, []);

  async function handleCreate() {
    try {
      setIsLoading(true);
      const { data } = await newTree({
        bg,
        tree,
        toper,
        user_id: user?.id,
        name_user: user?.user_metadata?.full_name,
      });
      await setMyTree(data[0]);
      setIsLoading(false);
      router.push("/my-tree");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-black h-[700px] flex justify-center">
      <div className="max-w-[37.5rem] text-white p-4">
        <h1 className="font-bold text-lg">Tạo cây của bạn thôi!</h1>
        <div className="css-wqghcw relative border-gray-500 border-2 overflow-hidden rounded-md">
          <img
            src={`/assets/bg/background_${bg}.webp`}
            alt=""
          />
          <img
            src={`/assets/tree/tree_${tree}.webp`}
            alt="tree"
            className="absolute w-[200px] bottom-8"
          />
          {toper !== 13 && (
            <img
              src={`/assets/toper/point_${toper}.webp`}
              alt="tree"
              className="absolute w-[80px] bottom-[232px] rounded-md"
            />
          )}
        </div>
        <Tabs value="tree">
          <TabsHeader className="bg-black text-white">
            <Tab
              key="tree"
              value="tree"
            >
              Cây
            </Tab>
            <Tab
              key="bg"
              value="bg"
            >
              Hình nền
            </Tab>
            <Tab
              key="toper"
              value="toper"
            >
              Đỉnh
            </Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel
              key="tree"
              value="tree"
            >
              <div className="grid grid-cols-4">
                <div
                  onClick={() => setTree(10)}
                  className={cn(
                    "w-20 cursor-pointer h-20 border-transparent border-4 rounded-md overflow-hidden",
                    tree === 10 && "border-green-500"
                  )}
                >
                  <img
                    src={`/assets/tree/tree_10.webp`}
                    alt="thumb"
                  />
                </div>
                <div
                  onClick={() => setTree(11)}
                  className={cn(
                    "w-20 cursor-pointer h-20 border-transparent border-4 rounded-md overflow-hidden",
                    tree === 11 && "border-green-500"
                  )}
                >
                  <img
                    src={`/assets/tree/tree_11.webp`}
                    alt="thumb"
                  />
                </div>
                <div
                  onClick={() => setTree(12)}
                  className={cn(
                    "w-20 cursor-pointer h-20 border-transparent border-4 rounded-md overflow-hidden",
                    tree === 12 && "border-green-500"
                  )}
                >
                  <img
                    src={`/assets/tree/tree_12.webp`}
                    alt="thumb"
                  />
                </div>
                <div
                  onClick={() => setTree(13)}
                  className={cn(
                    "w-20 cursor-pointer h-20 border-transparent border-4 rounded-md overflow-hidden",
                    tree === 13 && "border-green-500"
                  )}
                >
                  <img
                    src={`/assets/tree/tree_13.webp`}
                    alt="thumb"
                  />
                </div>
                <div
                  onClick={() => setTree(14)}
                  className={cn(
                    "w-20 cursor-pointer h-20 border-transparent border-4 rounded-md overflow-hidden",
                    tree === 14 && "border-green-500"
                  )}
                >
                  <img
                    src={`/assets/tree/tree_14.webp`}
                    alt="thumb"
                  />
                </div>
                <div
                  onClick={() => setTree(15)}
                  className={cn(
                    "w-20 cursor-pointer h-20 border-transparent border-4 rounded-md overflow-hidden",
                    tree === 15 && "border-green-500"
                  )}
                >
                  <img
                    src={`/assets/tree/tree_15.webp`}
                    alt="thumb"
                  />
                </div>
                <div
                  onClick={() => setTree(16)}
                  className={cn(
                    "w-20 cursor-pointer h-20 border-transparent border-4 rounded-md overflow-hidden",
                    tree === 16 && "border-green-500"
                  )}
                >
                  <img
                    src={`/assets/tree/tree_16.webp`}
                    alt="thumb"
                  />
                </div>
                <div
                  onClick={() => setTree(17)}
                  className={cn(
                    "w-20 cursor-pointer h-20 border-transparent border-4 rounded-md overflow-hidden",
                    tree === 17 && "border-green-500"
                  )}
                >
                  <img
                    src={`/assets/tree/tree_17.webp`}
                    alt="thumb"
                  />
                </div>
              </div>
            </TabPanel>
            <TabPanel
              key="bg"
              value="bg"
            >
              <div className="grid grid-cols-4">
                <div
                  onClick={() => setBg(13)}
                  className={cn(
                    "w-20 cursor-pointer h-20 border-transparent border-4 rounded-md overflow-hidden",
                    bg === 13 && "border-green-500"
                  )}
                >
                  <img
                    src={`/assets/bg/background_13.webp`}
                    alt="thumb"
                  />
                </div>
                <div
                  onClick={() => setBg(12)}
                  className={cn(
                    "w-20 cursor-pointer h-20 border-transparent border-4 rounded-md overflow-hidden",
                    bg === 12 && "border-green-500"
                  )}
                >
                  <img
                    src={`/assets/bg/background_12.webp`}
                    alt="thumb"
                  />
                </div>
                <div
                  onClick={() => setBg(11)}
                  className={cn(
                    "w-20 cursor-pointer h-20 border-transparent border-4 rounded-md overflow-hidden",
                    bg === 11 && "border-green-500"
                  )}
                >
                  <img
                    src={`/assets/bg/background_11.webp`}
                    alt="thumb"
                  />
                </div>
                <div
                  onClick={() => setBg(10)}
                  className={cn(
                    "w-20 cursor-pointer h-20 border-transparent border-4 rounded-md overflow-hidden",
                    bg === 10 && "border-green-500"
                  )}
                >
                  <img
                    src={`/assets/bg/background_10.webp`}
                    alt="thumb"
                  />
                </div>
              </div>
            </TabPanel>
            <TabPanel
              key="toper"
              value="toper"
            >
              <div className="grid grid-cols-4">
                <div
                  onClick={() => setToper(13)}
                  className={cn(
                    "w-20 cursor-pointer h-20 border-transparent border-4 rounded-md",
                    toper === 13 && "border-green-500"
                  )}
                >
                  <img
                    src={`/assets/toper/thumbnail/point_thumbnail_13.webp`}
                    alt="thumb"
                  />
                </div>
                <div
                  onClick={() => setToper(11)}
                  className={cn(
                    "w-20 cursor-pointer h-20 border-transparent border-4 rounded-md",
                    toper === 11 && "border-green-500"
                  )}
                >
                  <img
                    src={`/assets/toper/thumbnail/point_thumbnail_11.webp`}
                    alt="thumb"
                  />
                </div>
                <div
                  onClick={() => setToper(10)}
                  className={cn(
                    "w-20 cursor-pointer h-20 border-transparent border-4 rounded-md",
                    toper === 10 && "border-green-500"
                  )}
                >
                  <img
                    src={`/assets/toper/thumbnail/point_thumbnail_10.webp`}
                    alt="thumb"
                  />
                </div>
                <div
                  onClick={() => setToper(12)}
                  className={cn(
                    "w-20 cursor-pointer h-20 border-transparent border-4 rounded-md",
                    toper === 12 && "border-green-500"
                  )}
                >
                  <img
                    src={`/assets/toper/thumbnail/point_thumbnail_12.webp`}
                    alt="thumb"
                  />
                </div>
              </div>
            </TabPanel>
          </TabsBody>
        </Tabs>
        <div className="flex gap-4">
          <Button>Trở lại</Button>
          <Button
            className="flex-1"
            color="red"
            onClick={handleCreate}
            disabled={isLoading}
          >
            {isLoading ? "Đang lưu..." : "Lưu cây lại"}
          </Button>
        </div>
      </div>
    </div>
  );
}
