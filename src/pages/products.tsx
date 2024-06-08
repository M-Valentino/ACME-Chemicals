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
      <div className="md:p-8 xs:p-4">
        <div className="md:flex md:flex-row md:justify-between">
          <div className="desktopSideBar">
            <div className="min-w-[230px] mr-8">
              <h1 className=" font-extrabold text-5xl text-primary">
                Products
              </h1>
              <div className="pr-4 mt-4 ">
                <Sidebar
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  checkboxState={checkboxState}
                  setCheckboxState={setCheckboxState}
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-wrap">
              <div className="flex items-center mr-1 h-11">Sort:</div>
              <Dropdown
                value={selectedSort}
                onChange={(e: DropdownChangeEvent) => setSelectedSort(e.value)}
                options={sorts}
                optionLabel="name"
                className="mr-2 h-11 w-40 mb-2"
              />
              <div className="flex-grow flex">
                <InputText
                  className="md:flex-grow h-11 xs:w-[calc(100%-6rem)]"
                  type="text"
                  placeholder="Search"
                />
                <Button label="Search" className="ml-2 md:w-44 h-11" />
              </div>
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
