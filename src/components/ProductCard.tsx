import React from "react";
import Image from "next/image";

interface ProductCardProps {
  key: number;
  imgSrc: string;
  name: string;
  description: string;
  price: number;
  size?: string;
}

export const ProductCard: React.FC<ProductCardProps> = (
  props: ProductCardProps
) => {
  const { key, imgSrc, name, description, price, size } = props;
  return (
    <div className="w-[240px]" key={key}>
      <Image src={imgSrc} width={240} height={240} alt={name}/>
      <h2 className=" text-xl font-semibold">{name}</h2>
      <p>{description}</p>
      <p>
        <span className="font-semibold mr-5">${price.toFixed(2)}</span>
        {size}
      </p>
    </div>
  );
};
