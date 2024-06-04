import React from "react";
import { ProductCard } from "../ProductCard";
import { Scrollbar } from "react-scrollbars-custom";

export const FeaturedProducts = () => {
  const prods = [
    {
      imgSrc: "/prodImgs/sulfuricAcid.jpg",
      name: "Sulfuric Acid",
      description: "High-purity sulfuric acid for industrial use.",
      price: 30.3,
      discount: 10,
      size: "20mL",
    },
    {
      imgSrc: "/prodImgs/sulfuricAcid.jpg",
      name: "Sodium Hydroxide",
      description: "Caustic soda for a variety of industrial applications.",
      price: 30.3,
      size: "10g",
    },
    {
      imgSrc: "/prodImgs/sulfuricAcid.jpg",
      name: "Hydrochloric Acid",
      description: "Concentrated hydrochloric acid for laboratory use.",
      price: 30.3,
      size: "40mL",
    },
    {
      imgSrc: "/prodImgs/sulfuricAcid.jpg",
      name: "Ethanol",
      description: "High-purity ethanol for laboratory and industrial use.",
      price: 30.3,
      size: "100mL",
    },
  ];

  return (
    <div className="border-b-2 pb-4 border-blue-800">
      <h2 className="text-blue-800 font-bold text-3xl mt-8 ml-8">
        Featured Products
      </h2>
      <Scrollbar
        style={{ width: "100%", height: 440 }}
        thumbXProps={{ className: "thumbX" }}
        trackXProps={{ className: "trackX" }}
      >
        <div className="flex flex-row ">
          {prods.map((product, index: number) => (
            <ProductCard
              key={index}
              imgSrc={product.imgSrc}
              name={product.name}
              description={product.description}
              price={product.price}
              discount={product.discount}
              size={product.size}
            />
          ))}
        </div>
      </Scrollbar>
    </div>
  );
};
