import React, { Dispatch, SetStateAction } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Slider } from "primereact/slider";

interface SidebarProps {
  priceRange: [number, number];
  setPriceRange: Dispatch<SetStateAction<[number, number]>>;
  checkboxState: { [key: string]: boolean };
  setCheckboxState: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
}

export const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const { priceRange, setPriceRange, checkboxState, setCheckboxState } = props;

  const categories = [
    {
      category: "Agricultural",
      subCategories: [
        "Fertilizers",
        "Pesticides",
        "Herbicides",
        "Growth Regulators",
      ],
    },
    {
      category: "Industrial",
      subCategories: ["Acids", "Bases", "Solvents"],
    },
    {
      category: "Laboratory",
      subCategories: ["Reagents", "Buffers", "Analytical Chemicals"],
    },
  ];

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setCheckboxState((prevState) => {
      const newState = { ...prevState, [name]: checked };

      console.log(checkboxState);
      return newState;
    });
  };

  const priceInputFormatter = (val: string) => {
    return Math.min(parseInt(val.substring(1)), 300) || 0;
  };

  const handleSliderPriceUpdate = (range: [number, number]) => {
    setPriceRange([Math.min(range[0], range[1]), Math.max(range[0], range[1])]);
  };

  return (
    <div className=" max-w-[248px] mr-8">
      <h1 className=" font-extrabold text-5xl text-primary">Products</h1>
      <div className=" bg-secondary p-4 mt-4 rounded-md ">
        <h2 className="font-semibold text-lg ">Categories</h2>
        {categories.map((cat, i, row) => (
          <div key={cat.category}>
            <Accordion multiple activeIndex={[0]}>
              <AccordionTab header={cat.category}>
                {cat.subCategories.map((subCat) => (
                  <div className="mb-1" key={subCat}>
                    <Checkbox
                      inputId={subCat}
                      name={subCat}
                      value={subCat}
                      checked={checkboxState[subCat] || false}
                      onChange={(e) =>
                        handleCheckboxChange(subCat, e.checked as boolean)
                      }
                    />
                    <label
                      htmlFor={subCat}
                      className="ml-2 cursor-pointer text-gray-700"
                    >
                      {subCat}
                    </label>
                  </div>
                ))}
              </AccordionTab>
            </Accordion>
          </div>
        ))}
        <h2 className="mt-5 mb-2 font-semibold text-lg ">Price Range</h2>
        <div className="flex flex-row">
          <InputText
            value={`$${priceRange[0].toString()}`}
            className="w-1/2 mr-1 p-inputtext-sm"
            type="text"
            placeholder="$ Min"
            onChange={(e) => {
              const minPrice = priceInputFormatter(e.target.value);
              setPriceRange([minPrice, priceRange[1]]);
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
              setPriceRange([priceRange[0], maxPrice]);
            }}
          />
        </div>
        <Slider
          value={priceRange}
          onChange={(e) => handleSliderPriceUpdate(e.value as [number, number])}
          className="w-full mt-4"
          range
          min={0}
          max={300}
          step={5}
        />
      </div>
    </div>
  );
};
