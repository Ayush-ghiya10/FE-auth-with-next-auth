/* eslint-disable @next/next/no-img-element */
"use client";

import { signIn } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";

const Page = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <button
        className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-black hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
        onClick={() => {
          signIn("google", {
            redirect: false,
            callbackUrl: "/",
          });
        }}
      >
        <img
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google logo"
        />
        <span>Login with Google</span>
      </button>
    </div>
  );
};

export default Page;
