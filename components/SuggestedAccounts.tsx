import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../store/authStore";
import { IUser } from "../types";

export const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);
  return (
    <div className="border-gray-200 pb-4 xl:border-b-2">
      <p className="m-3 mt-4 hidden font-semibold text-gray-500 xl:block">
        Suggested accounts
      </p>
      <div>
        {allUsers?.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex cursor-pointer gap-3 rounded p-2 font-semibold hover:bg-primary">
              <div className="h-8 w-8">
                <Image
                  width={34}
                  height={34}
                  className="rounded-full"
                  src={user.image}
                  alt="user-profile"
                  layout="responsive"
                />
              </div>

              <div className="hidden xl:block">
                <p className="text-md flex items-center gap-1 font-bold lowercase text-primary">
                  {user.userName.replace(/\s+/g, "")}{" "}
                  <GoVerified className="text-blue-400" />
                </p>
                <p className="text-xs capitalize text-gray-400">{user.userName}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
