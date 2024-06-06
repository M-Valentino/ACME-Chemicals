import React, { useState } from "react";
import { Sidebar } from "@/components/products/Sidebar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { MainWrapper } from "@/components/MainWrapper";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
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
