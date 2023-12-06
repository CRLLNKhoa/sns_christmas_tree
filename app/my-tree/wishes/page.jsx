"use client";
import React, { useEffect } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useUser } from "@/store/user";
import Loading from "@/components/Loading";
import { getWhises } from "@/actions/api";
import {
    Collapse,
    Card,
    CardBody,
  } from "@material-tailwind/react";


export default function Page() {
  const router = useRouter();
  const user = useUser((state) => state.user);
  const tree = useUser((state) => state.tree);
  const setList = useUser((state) => state.setList);
  const list = useUser((state) => state.list);

  const handleList = async () => {
    try {
      const { data } = await getWhises(tree?.tree_id);
      setList(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      handleList();
    } else router.push("/auth");
  }, []);

  if (!user && !list) {
    return <Loading />;
  }

  return (
    <div className="w-screen h-screen bg-black/80 flex justify-center items-start">
      <div className="container flex flex-col gap-4 text-white py-4">
        <div className="flex justify-between items-center">
          <h1>Danh sách lời chúc:</h1>
          <Button color="red">Trở lại</Button>
        </div>
        <div className="flex justify-center items-center">
            <Item/>
        </div>
      </div>
    </div>
  );
}


const Item = () => {
    const [open, setOpen] = React.useState(false);
 
    const toggleOpen = () => setOpen((cur) => !cur);
    return(
        <div>
        <Button onClick={toggleOpen}>Open Collapse</Button>
        <Collapse open={open}>
          <Card className="my-4 mx-auto w-8/12">
            <CardBody>
              <Typography>
                Use our Tailwind CSS collapse for your website. You can use if for
                accordion, collapsible items and much more.
              </Typography>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    )
}