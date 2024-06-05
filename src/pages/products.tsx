import React, { useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { MainWrapper } from "@/components/MainWrapper";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Slider } from "primereact/slider";
interface Sort {
  name: string;
}
export default function Products() {
  const sorts: Sort[] = [
    { name: "Best Match" },
    { name: "Lowest Price" },
    { name: "Highest Price" },
  ];
  const [selectedSort, setSelectedSort] = useState<Sort>(sorts[0]);
  const [value, setValue] = useState<[number, number]>([20, 80]);
  return (
    <MainWrapper>
      <div className="p-8">
        <div className="flex flex-row  justify-between">
          <div className=" max-w-[256px] mr-16">
            <h1 className=" font-extrabold text-5xl text-primary">Products</h1>
            <div className=" bg-slate-100 p-4 mt-4 rounded-md border-stone-200 border-2">
              <h2 className=" mb-2 font-semibold text-lg ">Categories</h2>
              <div className="flex align-items-center ">
                <Checkbox
                  inputId="ingredient1"
                  name="pizza"
                  value="Cheese"
                  checked
                />
                <label htmlFor="ingredient1" className="ml-2 ">
                  Cheese
                </label>
              </div>
              <div className="flex align-items-center ">
                <Checkbox
                  inputId="ingredient1"
                  name="pizza"
                  value="Cheese"
                  checked
                />
                <label htmlFor="ingredient1" className="ml-2 ">
                  Cheese
                </label>
              </div>
              <div className="flex align-items-center ">
                <Checkbox
                  inputId="ingredient1"
                  name="pizza"
                  value="Cheese"
                  checked
                />
                <label htmlFor="ingredient1" className="ml-2 ">
                  Cheese
                </label>
              </div>
              <h2 className="mt-4 mb-2 font-semibold text-lg ">Price Range</h2>
              <div className="flex flex-row">
                <InputText
                  className="w-1/2 mr-1 p-inputtext-sm"
                  type="text"
                  placeholder="$ Min"
                />
                <InputText
                  className="w-1/2 ml-1 p-inputtext-sm"
                  type="text"
                  placeholder="$ Max"
                />
              </div>
              <Slider
                value={value}
                onChange={(e) => setValue(e.value as [number, number])}
                className="w-full mt-4"
                range
              />
            </div>
          </div>
          <div className=" w-full flex">
            <Dropdown
              value={selectedSort}
              onChange={(e: DropdownChangeEvent) => setSelectedSort(e.value)}
              options={sorts}
              optionLabel="name"
              className="mr-2 h-11"
            />
            <InputText
              className="w-full h-11"
              type="text"
              placeholder="Search"
            />
            <Button label="Search" className="ml-2 w-44 h-11" />
          </div>
        </div>
      </div>
    </MainWrapper>
  );
}
