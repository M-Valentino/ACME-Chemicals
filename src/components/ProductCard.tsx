import React from "react";
import Image from "next/image";

interface ProductCardProps {
  key: number;
  imgsrc: string;
  name: string;
  description: string;
  price: string;
  discount?: number;
  size?: string;
}

export const ProductCard: React.FC<ProductCardProps> = (
  props: ProductCardProps
) => {
  const { key, imgsrc, name, description, price, discount, size } = props;
  
  return (
    <div className=" min-w-[280px] m-4 max-w-[280px] rounded-md shadow-sm p-4 border-secondary border-2" key={key}>
      {discount && (
        <div className="relative -mb-4 -mt-4 h-8 leading-8 font-bold rounded-2xl w-fit pl-2 pr-2 bg-green-700 text-white"
        >
          {discount}% off
        </div>
      )}
      <Image src={imgsrc} width={250} height={250} alt={name} data-loaded='false'
   onLoad={event => {
      event.currentTarget.setAttribute('data-loaded', 'true')
   }}
   className='data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10'/>
      <h2 className="mt-2 text-xl font-semibold">{name}</h2>
      <p>{description}</p>
      <p>
        {discount && (
          <span className="font-semibold mr-1">
            ${(parseFloat(price) - parseFloat(price) / discount).toFixed(2)}
          </span>
        )}
        <span className={`mr-5 ${discount ? "line-through" : "font-semibold"}`}>
          ${price}
        </span>

        {size}
      </p>
    </div>
  );
};
