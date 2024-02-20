/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession, signOut } from "next-auth/react";

export default function IndexPage() {
  const { data, status } = useSession();

  return data && data.user ? (
    <div>
      <h1> hi {data.user.name}</h1>
      <img src={data.user.image!} alt={data.user.name + " photo"} />
      <button onClick={() => signOut({ callbackUrl: "/signin" })}>
        sign out
      </button>
    </div>
  ) : (
    <p>loading</p>
  );
}
