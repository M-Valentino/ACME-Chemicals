import React from "react";

const Review = () => {
  return (
    <div className=" bg-white p-8 min-w-[200px] max-w-[500px] rounded-md">
      <p>fhfhj fs fshkj fsd jhsdhjfd fds jk dfshfshfjsa fdsjfshf shfs</p>
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
      <Review/>
      <Review/>
      <Review/>
    </div>
  );
};
