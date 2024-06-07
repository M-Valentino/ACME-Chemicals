import React, { ReactNode, useState } from "react";
import { Sidebar } from "@/components/products/Sidebar";
import { Chip } from "primereact/chip";
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
    <MainWrapper title="Products">
      <div className="p-8">
        <div className="flex flex-row  justify-between">
          <Sidebar
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            checkboxState={checkboxState}
            setCheckboxState={setCheckboxState}
          />
          <div className=" w-full flex-col">
            <div className="w-full flex">
              <div className="flex items-center mr-1">Sort By:</div>
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
              <Chip
                label={`$${priceRange[0]} to $${priceRange[1]}`}
                className="mt-2 mr-2"
              />
              {Object.entries(checkboxState).map(
                ([key, value]) =>
                  value && <Chip label={key} key={key} className="mt-2 mr-2" />
              )}
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
}
