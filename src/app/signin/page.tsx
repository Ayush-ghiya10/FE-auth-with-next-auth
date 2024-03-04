/* eslint-disable @next/next/no-img-element */
"use client";

import axiosInstance from "@/utils/axiosInstance";
import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import Cookies from "js-cookie";

const Page = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            const response = await axiosInstance.post<{
              success: boolean;
              token: string;
            }>("/user", {
              access_token: credentialResponse.credential,
            });
            Cookies.set("token", response.data.token);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </>
  );
};

export default Page;
