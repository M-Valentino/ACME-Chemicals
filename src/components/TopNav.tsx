import React, { useState } from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import { Squash as Hamburger } from "hamburger-react";

const getIcon = (name: string) => {
  switch (name) {
    case "Cart":
      return (
        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
      );
    case "Products":
      return (
        <path
          fillRule="evenodd"
          d="M10.5 3.798v5.02a3 3 0 0 1-.879 2.121l-2.377 2.377a9.845 9.845 0 0 1 5.091 1.013 8.315 8.315 0 0 0 5.713.636l.285-.071-3.954-3.955a3 3 0 0 1-.879-2.121v-5.02a23.614 23.614 0 0 0-3 0Zm4.5.138a.75.75 0 0 0 .093-1.495A24.837 24.837 0 0 0 12 2.25a25.048 25.048 0 0 0-3.093.191A.75.75 0 0 0 9 3.936v4.882a1.5 1.5 0 0 1-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0 1 15 8.818V3.936Z"
          clipRule="evenodd"
        />
      );
    case "Log In":
      return (
        <path
          fillRule="evenodd"
          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
          clipRule="evenodd"
        />
      );
  }
};

type NavButtonProps = {
  name: string;
  title: string;
};

const DesktopNavButton = ({ name, title }: NavButtonProps) => {
  return (
    <Button
      className="h-12 ml-1"
      onClick={() => window.open(`/${name.toLowerCase()}`, "_self")}
    >
      <div className="flex flex-col items-center translate-y-[0.125rem]">
        <div className="flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            {getIcon(name)}
          </svg>
          <div className="text-lg">{name}</div>
        </div>
        <div
          className={`w-full border-t-2 ${
            name === title ? "border-white" : " border-transparent"
          }`}
        />
      </div>
    </Button>
  );
};

const MobileNavButton = ({ name, title }: NavButtonProps) => {
  return (
    <Button
      className="mt-1"
      onClick={() => window.open(`/${name.toLowerCase()}`, "_self")}
    >
      <div className="text-lg mr-1">{name}</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6"
      >
        {getIcon(name)}
      </svg>
    </Button>
  );
};

interface TopNavProps {
  title: string;
}

export const TopNav: React.FC<TopNavProps> = (props) => {
  const { title } = props;
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <>
      <div className="desktopMenu top-0 w-full bg-primary fixed z-10">
        <div className="flex justify-between items-center h-12 text-white">
          <Link href="/">
            <div className="ml-8 font-bold text-3xl">ACME Chemicals</div>
          </Link>
          <div className="flex justify-end flex-row mr-8">
            <DesktopNavButton name="Products" title={title} />
            <DesktopNavButton name="Cart" title={title} />
            <DesktopNavButton name="Log In" title={title} />
          </div>
        </div>
      </div>
      <div
        className={`mobileMenu fixed top-0 z-10 h-fit w-full bg-primary ${
          menuOpen ? " shadow-2xl" : ""
        }`}
      >
        <div className="ml-4 font-bold text-2xl text-white mt-2">
          <Link href="/">ACME Chemicals</Link>
        </div>
        <div className="absolute top-0 right-2">
          <Hamburger toggled={menuOpen} toggle={setMenuOpen} color="#fff" />
        </div>
        <div className="flex flex-col bg-primary mt-1 pb-1">
          {menuOpen && (
            <>
              <MobileNavButton name="Products" title={title} />
              <MobileNavButton name="Cart" title={title} />
              <MobileNavButton name="Log In" title={title} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
