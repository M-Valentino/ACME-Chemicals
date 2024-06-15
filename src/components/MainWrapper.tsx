import React, { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import { Footer } from "./Footer";
import { TopNav } from "./TopNav";
import { API_MESSAGES } from "@/utils/consts";

interface MainWrapperProps {
  children: ReactNode;
  title: string;
}

export const MainWrapper: React.FC<MainWrapperProps> = (props) => {
  const { children, title } = props;

  const [sessionInfo, setSessionInfo] = useState<string>("");

  useEffect(() => {
    fetch(`/api/auth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message !== API_MESSAGES.success) {
          localStorage.removeItem("sessionInfo");
        }
      });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSessionInfo = localStorage.getItem("sessionInfo");
      if (storedSessionInfo) {
        setSessionInfo(JSON.parse(storedSessionInfo)["name"]);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <TopNav title={title} sessionInfo={sessionInfo} />
      <main className="mt-12 min-h-[80vh]">{children}</main>
      <Footer />
    </>
  );
};
