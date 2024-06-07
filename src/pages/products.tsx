import React, { useState } from "react";
import { Sidebar } from "@/components/products/Sidebar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { MainWrapper } from "@/components/MainWrapper";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function Products() {
  const sorts: { name: string }[] = [
    { name: "Best Match" },
    { name: "Lowest Price" },
    { name: "Highest Price" },
  ];
  const [selectedSort, setSelectedSort] = useState<{ name: string }>(sorts[0]);

  const [checkboxState, setCheckboxState] = useState<{
    [key: string]: boolean;
  }>({});

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);

  return (
    <MainWrapper>
      <div className="p-8">
        <div className="flex flex-row  justify-between">
          <Sidebar
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            checkboxState={checkboxState}
            setCheckboxState={setCheckboxState}
          />
          <div className=" w-full flex-col">
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
            <div className="flex flex-row flex-wrap">
              <div className="rounded-3xl border-primary border-2 text-primary text-sm mr-2 mt-2 pt-1 pb-1 pl-2 pr-2 ">
                ${priceRange[0]} to ${priceRange[1]}
              </div>
              {Object.entries(checkboxState).map(
                ([key, value]) =>
                  value && (
                    <div
                      className="rounded-3xl border-primary border-2 text-primary text-sm mr-2 mt-2 pt-1 pb-1 pl-2 pr-2 "
                      key={key}
                    >
                      {key}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
}
