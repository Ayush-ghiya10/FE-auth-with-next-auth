/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";

export default function IndexPage() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <div className="w-full h-full">
        <div className=" w-full flex flex-col items-center justify-center mt-10">
          <h1 className="text-xl">Welcome to CastIT Admin Panel</h1>
          <button
            className="mr-5 bg-[#601EF0] text-white py-2 px-5 rounded mt-10"
            onClick={() => {
              router.push("/admin/list");
            }}
          >
            Show Admin List
          </button>
        </div>
      </div>
    </>
  );
}
