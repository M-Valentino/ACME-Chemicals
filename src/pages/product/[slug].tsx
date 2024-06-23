import React, { useEffect, useState } from "react";
import Image from "next/image";
import nextBase64 from "next-base64";
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
  }, []);

  return (
    <MainWrapper title={productName as string}>
      {productData !== null && (
        <div className="flex flex-row justify-between max-w-[1000px] mt-12">
          <Image
            src={productData.imgsrc}
            alt={productData.name}
            width={500}
            height={500}
          />
          <div>
          <h1 className="pt-12 text-5xl text-primary font-extrabold text-center">
            {productName}
          </h1>
          <p className="mt-4 text-lg">{productData.description}</p>
          </div>
        </div>
      )}
    </MainWrapper>
  );
}
