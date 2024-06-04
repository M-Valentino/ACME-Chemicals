import React from "react";
import Image from "next/image";
import { Button } from "primereact/button";

export const Hero = () => {
  return (
    <div className="border-b-2 border-primary">
      <div className=" justify-between md:bg-[url('/bgstripe.png')] xs:bg-slate-100">
        <div className=" md:bg-gradient-to-r from-slate-100 from-10% to-transparent md:h-[540px] w-full flex items-center justify-between">
          <div className="xl:ml-24 lg:ml-16 md:ml-8 xs:ml-4 xs:mr-4 max-w-[640px] inline-flex flex-col">
            <h1 className="font-extrabold lg:text-5xl md:text-4xl xs:text-3xl text-primary mt-8">
              Your One-Stop Shop for Chemical Supplies
            </h1>
            <p className="md:mt-6 xs:mt-3 text-slate-700 md:text-lg">
              Discover a wide range of high-quality chemical products for all
              your needs. Shop with confidence and get fast, reliable delivery.
            </p>
            <Button label="Shop Now" className="w-48 mt-4" />
          </div>
          <div className="desktopHeroImage xl:pr-24 lg:pr-16 md:pr-8 xl:pl-24 lg:pl-16 md:pl-8 pt-8 pb-8 w-full h-full">
            <Image
              src="/pexels-artempodrez-8533095.png"
              width={960}
              height={540}
              alt="chemist"
              className="object-cover h-full heroClipP"
            />
          </div>
        </div>
        <div className="mobileHeroImage p-4 w-full h-full">
          <Image
            src="/pexels-artempodrez-8533095.png"
            width={480}
            height={260}
            alt="chemist"
            className="object-cover h-full heroClipP"
          />
        </div>
      </div>
    </div>
  );
};
