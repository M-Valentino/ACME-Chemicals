import React from "react";
import Image from "next/image";

const reviews = [
  { imgSrc: "/pexels-artempodrez-8533095.png", name: "Jane Dursel", title: "Production Manager", description: "Acme Chemicals has been a reliable supplier for our laboratory. The quality of their products is top-notch and their customer service is exceptional." },
  { imgSrc: "/pexels-artempodrez-8533095.png", name: "Dr. Priya Mehta", title: "Senior Research Scientist", description: "ACME Chemicals consistently delivers high-quality products on time, making them an invaluable partner for our research projects. Their customer service team is knowledgeable and always ready to assist." },
  { imgSrc: "/pexels-artempodrez-8533095.png", name: "Jonathan Burke", title: "Chemical Engineer", description: "I\'ve been using Acme Chemicals for years and their products have always exceeded my expectations. The fast delivery and competitive pricing make them a top choice for our business." },
  { imgSrc: "/pexels-artempodrez-8533095.png", name: "Joseph Mwangi", title: "Procurement Manager", description: "We have been sourcing our laboratory chemicals from ACME Chemicals for over five years, and their reliability is unmatched. Their competitive pricing and product range have been key to our operational success." },
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
          <div className="text-sm text-gray-700">{title}</div>
        </div>
      </div>
      <p className="mt-2 text-gray-700">
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
