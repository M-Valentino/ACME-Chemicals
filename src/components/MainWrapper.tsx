import React, { ReactNode } from "react";
import { Footer } from "./Footer";
import { TopNav } from "./TopNav";

interface MainWrapperProps {
  children: ReactNode;
}

export const MainWrapper: React.FC<MainWrapperProps> = (props) => {
  const { children } = props;
  return (
    <>
      <TopNav />
      <main className="mt-12 min-h-[80vh]">{children}</main>
      <Footer />
    </>
  );
};
