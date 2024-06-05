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
  const [priceRange, setpriceRange] = useState<[number, number]>([0, 300]);

  const priceInputFormatter = (val: string) => {
    return Math.min(parseInt(val.substring(1)), 300) || 0;
  };

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
                  value={`$${priceRange[0].toString()}`}
                  className="w-1/2 mr-1 p-inputtext-sm"
                  type="text"
                  placeholder="$ Min"
                  onChange={(e) => {
                    const minPrice = priceInputFormatter(e.target.value);
                    setpriceRange([minPrice, priceRange[1]]);
                  }}
                />
                <div className="flex items-center">to</div>
                <InputText
                  value={`$${priceRange[1].toString()}`}
                  className="w-1/2 ml-1 p-inputtext-sm"
                  type="text"
                  placeholder="$ Max"
                  onChange={(e) => {
                    const maxPrice = priceInputFormatter(e.target.value);
                    setpriceRange([priceRange[0], maxPrice]);
                  }}
                />
              </div>
              <Slider
                value={priceRange}
                onChange={(e) => setpriceRange(e.value as [number, number])}
                className="w-full mt-4"
                range
                min={0}
                max={300}
                step={5}
              />
            </div>
          </div>
          <div className=" w-full flex">
            <Dropdown
              value={selectedSort}
              onChange={(e: DropdownChangeEvent) => setSelectedSort(e.value)}
              options={sorts}
              optionLabel="name"
              className="mr-2 h-11 w-40"
            />
            <InputText
              className="flex-grow h-11"
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
