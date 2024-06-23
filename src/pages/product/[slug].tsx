import React, { useEffect, useState } from "react";
import Image from "next/image";
import nextBase64 from "next-base64";
import { Button } from "primereact/button";
import { MainWrapper } from "@/components/MainWrapper";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const productName = router.query.slug;
  const [productData, setProductData] = useState<{
    imgsrc: string;
    description: string;
    price: string;
    size: string;
    name: string;
  } | null>(null);

  async function updateProduct() {
    fetch(
      `/api/product?productName=${nextBase64.encode(productName as string)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProductData(data[0]);
      });
  }
  useEffect(() => {
    if (productName !== undefined) {
      updateProduct();
    }
  }, [productName]);

  return (
    <MainWrapper title={productName as string}>
      {productData !== null && (
        <div className="flex md:flex-row xs:flex-col justify-between max-w-[1000px] mt-12 md:ml-8 md:mr-8 xs:ml-4 xs:mr-4">
          <Image
            src={productData.imgsrc}
            alt={productData.name}
            width={500}
            height={500}
            className="lg:max-w-[500px] md:max-w-[400px] xs:max-w-[350px] w-full m-auto"
          />
          <div className="min-w-[280px] md:ml-8 xs:mb-16">
            <h1 className="md:text-5xl xs:text-4xl xs:mt-6 text-primary font-extrabold text-center">
              {productName}
            </h1>
            <p className="mt-4 text-lg">{productData.description}</p>
            <p>{productData.size}</p>
            <Button
              label="Add to Cart"
              className="mt-2 w-full"
              onClick={() => alert("Feature not added yet.")}
            />
          </div>
        </div>
      )}
    </MainWrapper>
  );
}
