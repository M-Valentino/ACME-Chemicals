import React, { ReactNode } from "react";
import Head from "next/head";
import { Footer } from "./Footer";
import { TopNav } from "./TopNav";

interface MainWrapperProps {
  children: ReactNode;
  title: string;
  showBG?: boolean;
}

export const MainWrapper: React.FC<MainWrapperProps> = (props) => {
  const { children, title, showBG } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <TopNav title={title} />
      <main className={`mt-12 min-h-[75vh] ${showBG && "mainBG"}`}>
        {children}
      </main>
      <Footer />
    </>
  );
};
