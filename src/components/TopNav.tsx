import React from "react";

type NavButtonProps = {
  name: string;
};

const NavButton = ({ name }: NavButtonProps) => {
  return (
    <div className="h-12 flex items-center mr-8">
      <div className="text-lg">{name}</div>
    </div>
  );
};

export const TopNav = () => {
  return (
    <div className="top-0 w-full bg-blue-800/90 backdrop-blur-sm fixed z-10">
      <div className="flex justify-between items-center h-12 text-gray-50">
        <div className="ml-8 font-bold text-3xl">ACME Chemicals</div>
        <div className=" flex justify-end">
          <NavButton name="Products" />
          <NavButton name="About" />
          <NavButton name="Contact" />
        </div>
      </div>
    </div>
  );
};
