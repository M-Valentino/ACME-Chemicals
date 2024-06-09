import React from "react";
import { ProductCard } from "../ProductCard";
import { Scrollbar } from "react-scrollbars-custom";

// INSERT INTO products (imgsrc, description, price, size, name, discount)
// VALUES ('/prodImgs/sulfuricAcid.jpg', 'High-purity sulfuric acid for industrial use.', 30.30, '20mL', 'Sulfuric Acid', 10);

export const FeaturedProducts = () => {
  const prods = [
    {
      imgsrc: "/prodImgs/sulfuricAcid.jpg",
      name: "Sulfuric Acid",
      description: "High-purity sulfuric acid for industrial use.",
      price: "30.30",
      discount: 10,
      size: "20mL",
    },
    {
      imgsrc: "/prodImgs/sulfuricAcid.jpg",
      name: "Sodium Hydroxide",
      description: "Caustic soda for a variety of industrial applications.",
      price: "30.30",
      size: "10g",
    },
    {
      imgsrc: "/prodImgs/sulfuricAcid.jpg",
      name: "Hydrochloric Acid",
      description: "Concentrated hydrochloric acid for laboratory use.",
      price: "30.30",
      size: "40mL",
    },
    {
      imgsrc: "/prodImgs/sulfuricAcid.jpg",
      name: "Ethanol",
      description: "High-purity ethanol for laboratory and industrial use.",
      price: "30.30",
      size: "100mL",
    },
  ];

  return (
    <div className="border-b-2 pb-4 border-primary">
      <h2 className="text-primary font-bold text-3xl mt-8 ml-8">
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
              imgsrc={product.imgsrc}
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
