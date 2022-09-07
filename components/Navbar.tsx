import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import { createOrGetUser } from "../utils";
import Logo from "../utils/tiktik-logo.png";

import useAuthStore from "../store/authStore";

export const Navbar = () => {
  const { userProfile, addUser } = useAuthStore();

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px] md:h-[30px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="TIkTik"
            layout="responsive"
          ></Image>
        </div>
      </Link>
      <div>search</div>
      <div>
        {userProfile ? (
          <div>{userProfile.userName}</div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Login Error")}
          />
        )}
      </div>
    </div>
  );
};
