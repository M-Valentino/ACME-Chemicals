import React from "react";
import Image from "next/image";

export const Hero = () => {
  return (
    <div className="mt-12 border-b-4 border-blue-800">
      <div className=" justify-between bg-[url('/bgstripe.png')]">
        <div className=" bg-gradient-to-r from-slate-100 from-10% to-transparent h-[540px] w-full flex items-center justify-between">
          <div className="xl:ml-24 lg:ml-16 md:ml-8 xs:ml-4 max-w-[640px] inline-flex flex-col">
            <h1 className="font-extrabold text-5xl text-blue-800">
              Your One-Stop Shop for Chemical Supplies
            </h1>
            <p className="mt-6 text-slate-700 text-lg">
              Discover a wide range of high-quality chemical products for all
              your needs. Shop with confidence and get fast, reliable delivery.
            </p>
            <button className="bg-blue-800 text-gray-50 font-semibold w-48 p-2 text-xl mt-8 rounded-md shadow-sm">
              Shop Now
            </button>
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
        <Image
        src="/pexels-artempodrez-8533095.png"
        width={960}
        height={540}
        alt="chemist"
        className="mobileHeroImage object-cover h-full heroClipP"
      />
      </div>
    </div>
  );
};
