import React, { useState } from "react";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { MainWrapper } from "@/components/MainWrapper";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
interface City {
  name: string;
  code: string;
}
export default function Products() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const cities: City[] = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  return (
    <>
      <MainWrapper>
        <div className="p-8">
          <div className="flex flex-row items-center">
            <h1 className="mr-16 font-extrabold text-5xl text-primary">
              Products
            </h1>

            <InputText
              className=" flex-grow"
              type="text"
              placeholder="Search"
            />
            <Button label="Search" className="ml-2" />
            <Dropdown
              value={selectedCity}
              onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value)}
              options={cities}
              optionLabel="name"
              placeholder="Select a City"
              className="ml-2 w-32"
            />
          </div>
        </div>
      </MainWrapper>
    </>
  );
}
