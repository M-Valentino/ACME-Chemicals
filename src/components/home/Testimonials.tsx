import React from "react";
import Image from "next/image";

const reviews = [
  {
    imgSrc: "/JaneDursel.jpg",
    name: "Jane Dursel",
    title: "Production Manager",
    date: "May 2022",
    description:
      "Acme Chemicals has been a reliable supplier for our laboratory. The quality of their products is top-notch and their customer service is exceptional.",
  },
  {
    imgSrc: "/DrPriyaMehta.jpg",
    name: "Dr. Priya Mehta",
    title: "Senior Research Scientist",
    date: "April 2023",
    description:
      "ACME Chemicals consistently delivers high-quality products on time, making them an invaluable partner for our research projects. Their customer service team is knowledgeable and always ready to assist.",
  },
  {
    imgSrc: "/JonathanBurke.jpg",
    name: "Jonathan Burke",
    title: "Chemical Engineer",
    date: "December 2024",
    description:
      "I've been using Acme Chemicals for years and their products have always exceeded my expectations. The fast delivery and competitive pricing make them a top choice for our business.",
  },
  {
    imgSrc: "/JosephMwangi.jpg",
    name: "Joseph Mwangi",
    date: "October 2023",
    title: "Procurement Manager",
    description:
      "We've been sourcing our laboratory chemicals from ACME Chemicals for over five years, and their reliability is unmatched. Their competitive pricing and product range have been key to our success.",
  },
];

interface ReviewProps {
  key: number;
  imgSrc: string;
  name: string;
  title: string;
  date: string;
  description: string;
}

const Review: React.FC<ReviewProps> = (props: ReviewProps) => {
  const { key, imgSrc, name, title, date, description } = props;
  return (
    <div
      className="bg-white md:p-6 xs:p-4 rounded-md border-secondary border-2 xs:mb-2 md:mb-0"
      key={key}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <Image
            src={imgSrc}
            alt={`${name}'s portrait`}
            width={56}
            height={56}
            className="rounded-md max-h-[56px]"
          />
          <div className="ml-4">
            <div className="font-semibold">{name}</div>
            <div className="text-sm text-gray-700">{title}</div>
          </div>
        </div>
        <div className="text-gray-700 lg:text-sm xs:text-xs mt-1">{date}</div>
      </div>
      <p className="mt-2 text-gray-700">{description}</p>
    </div>
  );
};

export const Testimonials = () => {
  return (
    <div className=" bg-slate-100 md:p-8 xs:p-4">
      <h2 className="text-primary font-bold text-3xl mb-2">
        What Our Customers Say
      </h2>
      <p className=" text-lg mb-4">
        Hear from our satisfied customers about their experience with Acme
        Chemicals.
      </p>
      <div className="md:grid md:grid-cols-2 md:gap-2">
        {reviews.map((rev, index: number) => (
          <Review
            key={index}
            imgSrc={rev.imgSrc}
            name={rev.name}
            title={rev.title}
            date={rev.date}
            description={rev.description}
          />
        ))}
      </div>
    </div>
  );
};
