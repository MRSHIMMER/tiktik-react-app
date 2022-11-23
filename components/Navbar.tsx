import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import useAuthStore from "../store/authStore";
import { IUser } from "../types";
import { createOrGetUser } from "../utils";
import Logo from "../utils/tiktik-logo.png";

export const Navbar = () => {
  const [user, setUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const { userProfile, addUser, removeUser } = useAuthStore();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className="flex items-center justify-around border-b-2 border-gray-200 xl:h-16">
      <div className="flex  w-full items-center justify-between px-4   xl:w-[1200px]">
        <Link href="/">
          <div className="h-[38px] w-[100px] md:h-[30px] md:w-[129px]">
            <Image className="cursor-pointer" src={Logo} alt="logo" layout="responsive" />
          </div>
        </Link>

        <div className="relative hidden md:block">
          <form
            onSubmit={handleSearch}
            className="absolute top-10 -left-20 bg-white md:static"
          >
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="md:text-md w-[300px] rounded-full border-2 border-gray-100 bg-primary p-3 font-medium focus:border-2 focus:border-gray-300 focus:outline-none md:top-0  md:w-[350px]"
              placeholder="Search accounts and videos"
            />
            <button
              onClick={handleSearch}
              className="absolute right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400 md:right-5"
            >
              <BiSearch />
            </button>
          </form>
        </div>
        <div>
          {user ? (
            <div className="flex gap-5 md:gap-10">
              <Link href="/upload">
                <button className="text-md flex items-center gap-2 border-2 px-2 font-semibold md:px-4">
                  <IoMdAdd className="text-xl" />{" "}
                  <span className="hidden md:block">Upload </span>
                </button>
              </Link>
              {user.image && (
                <Link href={`/profile/${user._id}`}>
                  <div>
                    <Image
                      className="cursor-pointer rounded-full"
                      src={user.image}
                      alt="user"
                      width={40}
                      height={40}
                    />
                  </div>
                </Link>
              )}
              <button
                type="button"
                className=" cursor-pointer rounded-full border-2 p-2 shadow-md outline-none"
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
              onError={() => console.log("Login Failed")}
            />
          )}
        </div>
      </div>
    </div>
  );
};
