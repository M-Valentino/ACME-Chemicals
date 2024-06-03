import React from "react";
import { ProductCard } from "../ProductCard";

export const FeaturedProducts = () => {
  const prods = [
    {
      imgSrc: "/prodImgs/sulfuricAcid.jpg",
      name: "Sulfuric Acid",
      description: "High-purity sulfuric acid for industrial use.",
      price: 30.3,
      discount: 10,
      size: "20mL"
    },
    {
      imgSrc: "/prodImgs/sulfuricAcid.jpg",
      name: "Sodium Hydroxide",
      description: "Caustic soda for a variety of industrial applications.",
      price: 30.3,
      size: "10g"
    },
    {
      imgSrc: "/prodImgs/sulfuricAcid.jpg",
      name: "Hydrochloric Acid",
      description: "Concentrated hydrochloric acid for laboratory use.",
      price: 30.3,
      size: "40mL"
    },
    {
      imgSrc: "/prodImgs/sulfuricAcid.jpg",
      name: "Ethanol",
      description: "High-purity ethanol for laboratory and industrial use.",
      price: 30.3,
      size: "100mL"
    },
  ];
  return (
    <div className="m-8">
      <h2 className="text-blue-800 font-bold text-3xl mb-12">
        Featured Products
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 w-full">
        {prods.map((product, index) => (
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
    </div>
  );
};
