import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import GoogleLogin from "react-google-login";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";

import { Discover } from "./Discover";
import { SuggestedAccounts } from "./SuggestedAccounts";
import { Footer } from "./Footer";

export const Sidebar: NextPage = () => {
  const [showSidebar, setShowSidebar] = useState<Boolean>(true);
  const { pathname } = useRouter();

  const activeLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-start xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";

  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-start xl:justify-start cursor-pointer font-semibold rounded";

  return (
    <div>
      <div
        className="m-2 ml-6 mt-5 mb-0 block text-2xl md:hidden"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="mb-10 flex w-20 flex-col justify-start border-r-2 border-gray-100 p-3 xl:w-400 xl:border-0 ">
          <div className="border-gray-200 xl:border-b-2 xl:pb-4">
            <Link href="/">
              <div className={pathname === "/" ? activeLink : normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="hidden text-xl capitalize xl:block">For You</span>
              </div>
            </Link>
          </div>

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};
