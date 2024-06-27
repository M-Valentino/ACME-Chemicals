import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MainWrapper } from "@/components/MainWrapper";
import { getCurrentUser } from "@/utils/authFunctions";
import { API_MESSAGES } from "@/utils/consts";
import { ProductCardType } from "@/components/ProductCard";

export default function Cart() {
  const [cartItems, setCartItems] = useState<ProductCardType[]>([]);

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (currentUser) {
      fetch(`/api/cart?userId=${currentUser.userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.message === API_MESSAGES.success) {
            setCartItems(data.cart.rows);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const CartItem: React.FC<ProductCardType> = (props: ProductCardType) => {
    const { key, imgsrc, name } = props;
    return (
      <div key={key} className="flex flex-row mt-8">
        <Image src={imgsrc} alt={name} width={100} height={100} />
        <h2 className="ml-8 font-semibold text-lg">{name}</h2>
      </div>
    );
  };

  return (
    <MainWrapper title="Cart">
      <div className="md:ml-8 xs:ml-4 ">
        <h1 className="text-6xl text-primary font-extrabold">Cart</h1>
        {cartItems.length > 0 &&
          cartItems.map((product: ProductCardType, index: number) => (
            <CartItem
              id={product.id}
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
    </MainWrapper>
  );
}
