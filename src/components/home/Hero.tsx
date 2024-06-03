import React from 'react';
import Image from 'next/image';

export const Hero = () => {
  return (
    <div className="mt-12 border-b-4 border-blue-800">
        <div className=" justify-between bg-[url('/bgstripe.png')]">
          <div className=" bg-gradient-to-r from-slate-100 from-10% to-transparent h-[540px] w-full flex items-center justify-between">
            <div className="ml-24 max-w-[640px] inline-flex flex-col">
              <h1 className="font-extrabold text-5xl text-blue-800">
                Your One-Stop Shop for Chemical Supplies
              </h1>
              <p className="mt-6 text-slate-700 text-lg">
                Discover a wide range of high-quality chemical products for all
                your needs. Shop with confidence and get fast, reliable
                delivery.
              </p>
              <button className="bg-blue-800 text-gray-50 font-semibold w-48 p-2 text-xl mt-8 rounded-md shadow-sm">
                Shop Now
              </button>
            </div>
            <div className="pr-24 pl-24 pt-8 pb-8 w-full h-full">
            <Image
              src="/pexels-artempodrez-8533095.png"
              width={960}
              height={540}
              alt="chemist"
              className=" object-cover h-full"
              style={{
                clipPath:
                  "polygon(20% 0%, 80% 0%, 100% 20%, 100% 100%, 80% 100%, 20% 100%, 0% 80%, 0% 0%)",
              }}
            />
            </div>
          </div>
        </div>
      </div>
  );
}
