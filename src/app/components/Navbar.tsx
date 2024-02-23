/* eslint-disable @next/next/no-img-element */
"use client";

import { signOut, useSession } from "next-auth/react";
import { CiMail } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const { data } = useSession();
  return (
    <div className="flex justify-between items-center px-4 py-2 shadow-md mb-3 sticky top-0 z-50 bg-white">
      <div className="flex items-center">
        <a href={`/dashboard`}>
          <img
            className="h-12"
            src="https://castit.biz/images/castit-main-logo.gif"
            alt="Logo"
          />
        </a>
        <a
          href={`/dashboard`}
          className="ml-4 font-semibold text-black underline"
        >
          Client List
        </a>
      </div>

      <div className="flex items-center gap-3">
        <ul className="flex gap-3">
          <li title="Inbox">
            <a href={`/dashboard`}>
              <CiMail size="1.9rem" className="ml-auto mr-auto my-2" />
              Inbox
            </a>
          </li>
          <li title="Help">
            <a href="">
              <IoIosHelpCircleOutline
                size="1.9rem"
                className="ml-auto mr-auto my-2"
              />
              Help
            </a>
          </li>
        </ul>

        <div className="flex items-center justify-center">
          <div className="flex items-center justify-between rounded mx-4   px-2 py-2 my-2  gap-x-3 border-gray-500 border">
            <img
              src={data?.user?.image!}
              alt={data?.user?.name + " photo"}
              className="h-7 w-7 rounded-full"
            />
            <p className="text-xl">{data?.user?.name}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/signin" })}
            className=" flex items-center justify-center my-2 mr-4"
          >
            <FaSignOutAlt className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
