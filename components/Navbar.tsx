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
  const { userProfile, addUser, removeUser } = useAuthStore();

  // console.log(userProfile);

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
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />
                {` `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <>
                  <Image
                    width={40}
                    height={40}
                    className=" rounded-full cursor-pointer"
                    // 由于网络问题，先暂时用国内的地址代替
                    // src={userProfile.image}
                    src={`https://i2.hdslb.com/bfs/face/da2f8f63a8fdb15c7ce337c984f3409f9870db76.jpg@240w_240h_1c_1s.webp`}
                    alt="user-profile"
                  />
                </>
              </Link>
            )}
            <button
              type="button"
              className="px-2"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
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
