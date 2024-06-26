import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "primereact/button";
import { MainWrapper } from "@/components/MainWrapper";
import { useRouter } from "next/router";
import { getCurrentUser } from "@/utils/authFunctions";

export default function Page() {
  const router = useRouter();
  const productID = router.query.slug;
  const [productData, setProductData] = useState<{
    imgsrc: string;
    description: string;
    price: string;
    size: string;
    name: string;
  } | null>(null);

  async function getProductData() {
    fetch(`/api/product?productId=${productID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProductData(data[0]);
      });
  }
  useEffect(() => {
    if (productID !== undefined) {
      getProductData();
    }
  }, [productID]);

  const currentUser = getCurrentUser();

  async function addToCart() {
    console.log(currentUser)
    fetch(`/api/cart?productId=${productID}&userId=${currentUser.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <MainWrapper title={productData?.name as string}>
      {productData !== null && (
        <div className="flex md:flex-row xs:flex-col justify-between max-w-[1000px] mt-12 md:ml-8 md:mr-8 xs:ml-4 xs:mr-4 mb-16">
          <Image
            src={productData?.imgsrc}
            alt={productData?.name}
            width={500}
            height={500}
            className="lg:max-w-[500px] md:max-w-[400px] xs:max-w-[350px] w-full m-auto"
          />
          <div className="min-w-[280px] md:ml-8">
            <h1 className="md:text-5xl xs:text-4xl xs:mt-6 text-primary font-extrabold text-center">
              {productData?.name}
            </h1>
            <p className="mt-4 text-lg">{productData?.description}</p>
            <p>{productData?.size}</p>
            <Button
              label="Add to Cart"
              className="mt-2 w-full"
              onClick={() => addToCart()}
            />
          </div>
        </div>
      )}
    </MainWrapper>
  );
}
