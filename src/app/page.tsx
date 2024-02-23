/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import { jwtDecode } from "jwt-decode";
import * as jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import axios from "axios";

export default function IndexPage() {
  const { data, status } = useSession();
  console.log(data);
  const router = useRouter();
  return data && data.user ? (
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
          <button
            className="mr-5 bg-[#601EF0] text-white py-2 px-5 rounded mt-10"
            onClick={async () => {
              const token = jwt.sign("data", "secret", {}, (err, token) => {
                console.log(err);
                console.log(token);
              });
              console.log(token);
              const res = await axios.post(
                process.env.NEXT_PUBLIC_BACKEND_URL + "/user/verifytoken",
                { token }
              );
            }}
          >
            Verify Token
          </button>
        </div>
      </div>
    </>
  ) : (
    <p>loading</p>
  );
}
