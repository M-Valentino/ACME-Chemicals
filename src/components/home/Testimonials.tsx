import React from "react";
import Image from "next/image";

const reviews = [
  { imgSrc: "/pexels-artempodrez-8533095.png", name: "fs", title: "rw", description: "Acme Chemicals has been a reliable supplier for our\n laboratory. The quality of their products is top-notch\n and their customer service is exceptional." },
  { imgSrc: "/pexels-artempodrez-8533095.png", name: "fs", title: "rew", description: "" },
  { imgSrc: "/pexels-artempodrez-8533095.png", name: "fd", title: "rw", description: "" },
  { imgSrc: "/pexels-artempodrez-8533095.png", name: "fs", title: "rewre", description: "" },
];

interface ReviewProps {
  key: number;
  imgSrc: string;
  name: string;
  title: string;
  description: string;
}

const Review: React.FC<ReviewProps> = (props: ReviewProps) => {
  const { key, imgSrc, name, title, description } = props;
  return (
    <div
      className="bg-white p-6 mb-2 rounded-md border-stone-200 border-2"
      key={key}
    >
      <div className=" flex flex-row">
        <Image
          src={imgSrc}
          alt="avatar"
          width={56}
          height={56}
        />
        <div className=" ml-4">
          <div className="font-semibold">{name}</div>
          <div className="text-sm">{title}</div>
        </div>
      </div>
      <p className="mt-2">
       {description}
      </p>
    </div>
  );
};

export const Testimonials = () => {
  return (
    <div className=" bg-slate-100 p-8 ">
      <h2 className="text-blue-800 font-bold text-3xl mb-2">
        What Our Customers Say
      </h2>
      <p className=" text-lg mb-4">
        Hear from our satisfied customers about their experience with Acme
        Chemicals.
      </p>
      {reviews.map((rev, index: number) => (
        <Review
          key={index}
          imgSrc={rev.imgSrc}
          name={rev.name}
          title={rev.title}
          description={rev.description}
        />
      ))}
    </div>
  );
};
