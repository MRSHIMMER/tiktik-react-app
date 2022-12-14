import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "../styles/globals.css";

import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;
  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <div className="m-auto h-[100vh] overflow-hidden xl:w-[100vw]">
        <Navbar />
        <div className="m-auto  flex gap-6 md:gap-20 xl:w-[1200px]">
          <div className="h-[92vh] overflow-hidden  xl:hover:overflow-auto">
            <Sidebar />
          </div>
          <Component {...pageProps} />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
