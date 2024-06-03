import React from "react";
import Image from "next/image";

const Review = () => {
  return (
    <div className="bg-white p-8  rounded-md">
      <div className=" flex flex-row">
        <Image
          src="/pexels-artempodrez-8533095.png"
          alt="avatar"
          width={56}
          height={56}
        />
        <div className=" ml-4">
          <div className="font-semibold">Name</div>
          <div className="text-sm">Title</div>
        </div>
      </div>
      <p>Acme Chemicals has been a reliable supplier for our laboratory. The quality of their products is top-notch and their customer service is exceptional.</p>
    </div>
  );
};

export const Testimonials = () => {
  return (
    <div className=" bg-slate-100 p-8">
      <h2 className="text-blue-800 font-bold text-3xl mb-2">
        What Our Customers Say
      </h2>
      <p className=" text-lg">
        Hear from our satisfied customers about their experience with Acme
        Chemicals.
      </p>
      <Review />
      <Review />
      <Review />
    </div>
  );
};
