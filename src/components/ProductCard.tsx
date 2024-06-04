import React from "react";
import Image from "next/image";

interface ProductCardProps {
  key: number;
  imgSrc: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  size?: string;
}

export const ProductCard: React.FC<ProductCardProps> = (
  props: ProductCardProps
) => {
  const { key, imgSrc, name, description, price, discount, size } = props;
  return (
    <div className=" min-w-[280px] m-4 max-w-[280px] rounded-md shadow-sm p-4 border-slate-150 border-2" key={key}>
      {discount && (
        <div className="relative -mb-4 -mt-4 h-8 leading-8 font-bold rounded-sm w-fit pl-2 pr-2 bg-green-700 text-white"
        >
          {discount}% off
        </div>
      )}
      <Image src={imgSrc} width={250} height={250} alt={name} className=" m-auto"/>
      <h2 className="mt-2 text-xl font-semibold">{name}</h2>
      <p>{description}</p>
      <p>
        {discount && (
          <span className="font-semibold mr-1">
            ${(price - price / discount).toFixed(2)}
          </span>
        )}
        <span className={`mr-5 ${discount ? "line-through" : "font-semibold"}`}>
          ${price.toFixed(2)}
        </span>

        {size}
      </p>
    </div>
  );
};
