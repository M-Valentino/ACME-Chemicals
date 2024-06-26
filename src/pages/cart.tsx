import React, { useEffect, useState } from "react";
import { MainWrapper } from "@/components/MainWrapper";
import { getCurrentUser } from "@/utils/authFunctions";
import { API_MESSAGES } from "@/utils/consts";

export default function Cart() {
  const [cartItems, setCartItems] = useState<string>("");

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
            setCartItems(JSON.stringify(data.cart.rows));
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);
  return (
    <MainWrapper title="Cart">
      <div>{cartItems}</div>
    </MainWrapper>
  );
}
