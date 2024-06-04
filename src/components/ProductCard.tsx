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
    <div className=" min-w-[280px] mr-4 ml-4 max-w-[280px] bg-slate-100 rounded-md shadow-sm p-4" key={key}>
      {discount && (
        <div className="relative -mb-4 -mt-4 h-8 leading-8 font-bold text-green-800"
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
