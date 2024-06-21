import React, { useEffect, useState } from "react";
import { ProductCard, ProductCardType } from "../ProductCard";
import { ProgressSpinner } from "primereact/progressspinner";
import { Scrollbar } from "react-scrollbars-custom";

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<ProductCardType[]>([]);

  useEffect(() => {
    fetch(`/api/products`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

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
        <div className="flex flex-row ml-8">
          {products.length > 0 ? (
            products.map((product, index: number) => (
              <ProductCard
                key={index}
                imgsrc={product.imgsrc}
                name={product.name}
                description={product.description}
                price={product.price}
                discount={product.discount}
                size={product.size}
              />
            ))
          ) : (
            <ProgressSpinner />
          )}
        </div>
      </Scrollbar>
    </div>
  );
};
