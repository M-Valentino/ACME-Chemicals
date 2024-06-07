import React, { ReactNode } from "react";
import Head from "next/head";
import { Footer } from "./Footer";
import { TopNav } from "./TopNav";

interface MainWrapperProps {
  children: ReactNode;
  title: string;
}

export const MainWrapper: React.FC<MainWrapperProps> = (props) => {
  const { children, title } = props;
  return (
    <>
    <Head>
      <title>{title}</title>
    </Head>
      <TopNav />
      <main className="mt-12 min-h-[80vh]">{children}</main>
      <Footer />
    </>
  );
};
