import React, { useEffect, useState } from "react";
import nextBase64 from "next-base64";
import { MainWrapper } from "@/components/MainWrapper";
import { API_MESSAGES } from "@/utils/consts";
import { getCurrentUser } from "@/utils/authFunctions";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function Admin() {
  const [userInfo, setUserInfo] = useState<{
    id: number;
    name: string;
    email: string;
    isadmin: boolean;
  }>({ id: -1, name: "", email: "", isadmin: false });

  const [newProduct, setNewProduct] = useState<{
    imgsrc: string;
    description: string;
    price: string;
    size: string;
    name: string;
  }>({
    imgsrc: "",
    description: "",
    price: "",
    size: "",
    name: "",
  });

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (currentUser) {
      fetch(`/api/user?userId=${currentUser.userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.message === API_MESSAGES.success) {
            setUserInfo(data.data);
            console.log(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const productFields = [
    { id: "name", label: "Name" },
    { id: "imgsrc", label: "Image Source" },
    { id: "description", label: "Description" },
    { id: "price", label: "Price" },
    { id: "size", label: "Size" },
  ];

  async function createProduct(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch(`/api/products`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userInfo.id,
        name: nextBase64.encode(newProduct.name),
        imgsrc: nextBase64.encode(newProduct.imgsrc),
        description: nextBase64.encode(newProduct.description),
        price: nextBase64.encode(newProduct.price),
        size: nextBase64.encode(newProduct.size),
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Product added successfully:", data);
    } else {
      console.error("Error adding product:", data);
    }
  }

  return (
    <MainWrapper title="Admin">
      <h1 className="pt-12 text-6xl text-primary font-extrabold text-center">
        Add Product
      </h1>
      {userInfo.isadmin && (
        <form onSubmit={createProduct} className="max-w-xl m-auto mt-8 mb-8">
          {productFields.map((field) => (
            <div key={field.id} className="mt-1 flex flex-col gap-1">
              <label htmlFor={field.id} className="text-sm">
                {field.label}
              </label>
              <InputText
                id={field.id}
                value={newProduct[field.id as keyof typeof newProduct]}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    [field.id]: e.target.value,
                  })
                }
              />
            </div>
          ))}
          <Button label="Add Product" className="w-full mt-8" type="submit" />
        </form>
      )}
    </MainWrapper>
  );
}
