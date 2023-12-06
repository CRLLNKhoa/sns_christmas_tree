"use client";
import { cn } from "@/lib/untils";
import { Button } from "@material-tailwind/react";
import { Carousel, IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useRouter, useSearchParams } from "next/navigation";
import { newWhises, readTree } from "@/actions/api";
import { useUser } from "@/store/user";
import { toast } from "react-toastify";

export default function Home() {
  const searchParams = useSearchParams();
  const search = searchParams.get("tree");
  const [length, setLength] = useState(1);
  const [itemSelect, setItemSelect] = useState(1);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleOpen = () => setOpen(!open);
  const numberArray = Array.from({ length: 26 }, (_, index) => index + 1);
  const setMyTree = useUser((state) => state.setMyTree);
  const list = useUser((state) => state.list);
  const setList = useUser((state) => state.setList);
  const tree = useUser((state) => state.tree);
  const [loading, setLoading] = useState(false);

  const readAll = async () => {
    try {
      const { data } = await readTree(search);
      console.log(data);
      setMyTree(data?.tree[0]);
      setList(data?.list);
      setLength(Math.ceil(data?.list?.length / 10));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search === null) {
      router.push("/auth");
    } else readAll();
  }, []);

  if (!tree) {
    return (
      <article
        style={{
          backgroundImage: `url(https://colormytree.me/tree/background/background_10.jpg)`,
        }}
        className="w-full flex justify-center css-5bdf4v"
      >
        <div className="css-1dt74mc">
          <div className=" bg-transparent flex flex-col p-4 justify-between w-full items-center text-white">
            <h1>Đang tải thông tin...</h1>
            <p className="text-sm">💌 Nhận được 0 tin nhắn!</p>
          </div>
          <div className="flex flex-col justify-between relative">
            <div className="top-0 h-[436px] w-full flex justify-center items-end md:items-center">
              <div className="w-full h-full">
                <div className="flex justify-center items-end h-full relative">
                  <img
                    src="https://colormytree.me/assets/tree-teaser-709196bd.png"
                    alt="image 1"
                    className="w-[280px] h-[384px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full absolute bottom-0 py-6 flex justify-center items-center gap-4">
            <Button color="white">Create tree</Button>
            <Button
              onClick={handleOpen}
              color="red"
            >
              Decorate
            </Button>
          </div>
          <span
            className="absolute bottom-0 left-1/2 -translate-x-1/2 px-2 text-[8px] flex flex-col leading-none text-center 
        font-bold text-white py-1"
          >
            Coded by Lương Khoa
          </span>
        </div>
      </article>
    );
  }

  const handleRender = () => {
    // Tạo mảng
    const array = list;
    // Số phần tử trong mỗi mảng con
    const itemsPerArray = 10;
    // Tạo mảng mới
    const newArray = [];
    for (var i = 0; i < array.length; i += itemsPerArray) {
      const chunk = array.slice(i, i + itemsPerArray);
      newArray.push(chunk);
    }

    if (newArray.length === 0) {
      return (
        <div className="flex justify-center items-end h-full relative">
          <img
            src={`/assets/tree/tree_${tree.tree}.webp`}
            alt="image 1"
            className="w-[320px] h-[384px] object-cover"
          />
          {tree?.toper !== 13 && (
            <img
              src={`/assets/toper/point_${tree.toper}.webp`}
              alt="image 1"
              className="absolute w-[100px] h-[100px] top-0"
            />
          )}
        </div>
      );
    }

    if (newArray.length === 1) {
      return newArray.map((numberTree, index) => (
        <div
          key={index}
          className="flex justify-center items-end h-full relative"
        >
          <img
            src={`/assets/tree/tree_${tree.tree}.webp`}
            alt="image 1"
            className="w-[320px] h-[384px] object-cover"
          />
          {tree?.toper !== 13 && (
            <img
              src={`/assets/toper/point_${tree.toper}.webp`}
              alt="image 1"
              className="absolute w-[100px] h-[100px] top-0"
            />
          )}
          {numberTree.map((item, index) => (
            <ItemV1
              key={item.id}
              position={index + 1}
              user={item.nickname}
              content={item.content}
              img={item.item}
            />
          ))}
        </div>
      ));
    }

    return newArray.map((numberTree, index) => (
      <div
        key={index}
        className="flex justify-center items-end h-full relative"
      >
        <img
          src={`/assets/tree/tree_${tree.tree}.webp`}
          alt="image 1"
          className="w-[320px] h-[384px] object-cover"
        />
        {tree?.toper !== 13 && (
          <img
            src={`/assets/toper/point_${tree.toper}.webp`}
            alt="image 1"
            className="absolute w-[100px] h-[100px] top-0"
          />
        )}
        {numberTree.map((item, index) => (
          <Item
            key={item.id}
            position={index + 1}
            user={item.nickname}
            content={item.content}
            img={item.item}
          />
        ))}
      </div>
    ));
  };

  const handleAddWhises = async () => {
    try {
      if(name!=="",content!==""){
        setLoading(true)
        const { data } = await newWhises({
          tree_id: tree?.tree_id,
          nickname: name,
          item: itemSelect,
          content: content,
        });
        await setList(list.concat(data[0]));
        toast("🎄 Gửi lời chúc thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false)
        handleOpen();
      }else alert("Bạn vui lòng nhập tên và nội dung!")
    
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  return (
    <>
      <article
        style={{
          backgroundImage: `url(https://colormytree.me/tree/background/background_${tree?.bg}.jpg)`,
        }}
        className="w-full flex justify-center css-5bdf4v"
      >
        <div className="css-1dt74mc">
          <div className=" bg-transparent flex flex-col p-4 justify-between w-full items-center text-white">
            <h1>
              <b className="text-red-600 text-lg">{tree.name_user}</b>
              {"'s tree"}
            </h1>
            <p className="text-sm">💌 Nhận được {list?.length} tin nhắn!</p>
          </div>
          <div className="flex flex-col justify-between relative">
            <div className="top-0 h-[436px] w-full flex justify-center items-end md:items-center">
              <div className="w-full h-full">
                <Carousel
                  transition={{ duration: 1 }}
                  loop={true}
                  className="rounded-xl"
                  navigation={({ setActiveIndex, activeIndex, length }) => {
                    if (length > 1) {
                      return (
                        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                          {new Array(length).fill("").map((_, i) => (
                            <span
                              key={i}
                              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                activeIndex === i
                                  ? "w-4 bg-white"
                                  : "w-2 bg-white/50"
                              }`}
                              onClick={() => setActiveIndex(i)}
                            />
                          ))}
                        </div>
                      );
                    }
                  }}
                  prevArrow={({ handlePrev }) => {
                    if (length > 1) {
                      return (
                        <IconButton
                          variant="text"
                          color="white"
                          size="lg"
                          onClick={handlePrev}
                          className="!absolute top-2/4 left-36 -translate-y-2/4"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            />
                          </svg>
                        </IconButton>
                      );
                    }
                  }}
                  nextArrow={({ handleNext }) => {
                    if (length > 1) {
                      return (
                        <IconButton
                          variant="text"
                          color="white"
                          size="lg"
                          onClick={handleNext}
                          className="!absolute top-2/4 !right-36 -translate-y-2/4"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </IconButton>
                      );
                    }
                  }}
                >
                  {handleRender()}
                </Carousel>
              </div>
            </div>
          </div>
          <div className="w-full absolute bottom-0 py-6 flex justify-center items-center gap-4">
            <Button
              onClick={handleRender}
              color="white"
            >
              Create tree
            </Button>
            <Button
              onClick={handleOpen}
              color="red"
            >
              Decorate
            </Button>
          </div>
          <span
            className="absolute bottom-0 left-1/2 -translate-x-1/2 px-2 text-[8px] flex flex-col leading-none text-center 
          font-bold text-white py-1"
          >
            Coded by Lương Khoa
          </span>
        </div>
      </article>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
      >
        <DialogHeader className="text-md">Trang trí cho cây của</DialogHeader>
        <DialogBody className="overflow-y-auto h-[28rem]">
          <div className="flex flex-col ">
            <div className="flex flex-col">
              <h1 className="mb-4">🎁Chọn đồ trang trí 🎄</h1>
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {numberArray.map((item) => (
                  <div
                    onClick={() => setItemSelect(item)}
                    key={item}
                    className={cn(
                      "bg-[#2B3041] rounded-lg cursor-pointer border-4 border-transparent",
                      itemSelect === item && "border-red-700"
                    )}
                  >
                    <img
                      src={`/assets/item/item${item}.webp`}
                      alt={`item${1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/*NOTE Letter */}
            <div className="border-[#896750] border-8 rounded-3xl bg-[#896750] mt-20">
              <div className="relative bg-[#896750] border-[#B9A89C] border-2 rounded-3xl bg-[url('https://colormytree.me/assets/message-texture-c2138e2b.png')]">
                <img
                  className="absolute right-0 -top-12 lg:-top-20 w-24 lg:w-40"
                  src="https://colormytree.me/ornaments/ornament/14/ornament_14_00_00.webp"
                  alt="deco"
                />
                <div className="border-[#896750] border-8 p-4 rounded-3xl bg-[#5E4736]">
                  <div className="text-white flex flex-col">
                    <label htmlFor="name">Ngưởi gửi.</label>
                    <input
                      id="name"
                      autoComplete="off"
                      type="text"
                      placeholder="Nhập tên (tối đa 8 kí tự)"
                      className="py-2 outline-none bg-transparent"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className=" rounded-md">
                    <div className="border-b-2 w-full mb-4"></div>
                    <textarea
                      placeholder="Viết lời chúc vào đây..."
                      name="content"
                      id="content"
                      rows="10"
                      className="w-full text-white outline-none bg-transparent"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color={loading ? "white" : "blue"}
            onClick={handleAddWhises}
            className="mr-4"
             disabled={loading}
          >
            {loading ? <img src="/loading.svg" className="w-4 h-4 animate-spin" alt="" /> : <span>Trang trí</span>}
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={handleOpen}
          >
            <span>Đóng</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

const Item = ({ position, img = 1, user = "kevin", content = "" }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    // Lấy ngày hiện tại
    var ngayHienTai = new Date();
    // Ngày bạn muốn kiểm tra (ví dụ: 1 tháng 1 năm 2023)
    var ngayCanKiemTra = new Date(2023, 11, 25);

    if (ngayHienTai > ngayCanKiemTra) {
      setOpen(!open);
    } else if (ngayHienTai < ngayCanKiemTra) {
      toast("🎄 Ngày 25/12 sẽ mở được!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setOpen(!open);
    }
  };

  return (
    <>
      <div
        onClick={handleOpen}
        className={cn(
          "w-[60px] h-[60px] cursor-pointer absolute select-none",
          position === 1 && "top-[100px] left-[220px]",
          position === 2 && "top-[100px] right-[220px]",
          position === 3 && "top-[180px] right-50",
          position === 4 && "top-[190px] right-[200px]",
          position === 5 && "top-[190px] left-[200px]",
          position === 6 && "top-[260px] right-[210px]",
          position === 7 && "top-[260px] left-[210px]",
          position === 8 && "top-[310px] right-50",
          position === 9 && "top-[280px] right-[150px]",
          position === 10 && "top-[280px] left-[150px]"
        )}
      >
        <h1 className="absolute w-[80px] -top-[10px] left-1/2 -translate-x-1/2 text-white text-[12px] font-bold">
          {user}
        </h1>
        <img
          src={`/assets/item/item${img}.webp`}
          alt=""
          className="w-full h-full"
        />
      </div>
      <Dialog
        open={open}
        handler={handleOpen}
      >
        <DialogHeader className="text-md">Người gửi: {user}</DialogHeader>
        <DialogBody>{content}</DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="red"
            onClick={handleOpen}
          >
            <span>Đóng</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

const ItemV1 = ({ position, img = 1, user = "kevin", content = "" }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    // Lấy ngày hiện tại
    var ngayHienTai = new Date();
    // Ngày bạn muốn kiểm tra (ví dụ: 1 tháng 1 năm 2023)
    var ngayCanKiemTra = new Date(2023, 11, 25);

    if (ngayHienTai > ngayCanKiemTra) {
      setOpen(!open);
    } else if (ngayHienTai < ngayCanKiemTra) {
      toast("🎄 Ngày 25/12 sẽ mở được!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setOpen(!open);
    }
  };
  return (
    <>
      <div
        onClick={handleOpen}
        className={cn(
          "w-[60px] h-[60px] cursor-pointer absolute select-none",
          position === 1 && "top-[110px] right-[80px]",
          position === 2 && "top-[110px] left-[80px]",
          position === 3 && "top-[180px] right-50",
          position === 4 && "top-[190px] right-[200px]",
          position === 5 && "top-[190px] left-[200px]",
          position === 6 && "top-[260px] left-[10px]",
          position === 7 && "top-[260px] right-[10px]",
          position === 8 && "top-[310px] right-50",
          position === 9 && "top-[280px] left-[80px]",
          position === 10 && "top-[280px] right-[80px]"
        )}
      >
        <h1 className="absolute w-[80px] text-center truncate -top-[10px] left-1/2 -translate-x-1/2 text-white text-[12px] font-bold">
          {user}
        </h1>
        <img
          src={`/assets/item/item${img}.webp`}
          alt=""
          className="w-full h-full"
        />
      </div>
      <Dialog
        open={open}
        handler={handleOpen}
      >
        <DialogHeader className="text-md">Người gửi: {user}</DialogHeader>
        <DialogBody>{content}</DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="red"
            onClick={handleOpen}
          >
            <span>Đóng</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
