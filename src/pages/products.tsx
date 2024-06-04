import React, { useState } from "react";
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
  const [selectedSort, setSelectedSort] = useState<Sort | null>(sorts[0]);

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
            <Dropdown
              value={selectedSort}
              onChange={(e: DropdownChangeEvent) => setSelectedSort(e.value)}
              options={sorts}
              optionLabel="name"
              className="ml-2 w-40 "
            />
            <Button label="Search" className="ml-2 w-44" />
          </div>
        </div>
      </MainWrapper>
    </>
  );
}
