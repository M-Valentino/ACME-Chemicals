import React, { Dispatch, SetStateAction } from "react";
import { Button } from "primereact/button";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Checkbox } from "primereact/checkbox";
import { Slider } from "primereact/slider";

interface FilterMenuProps {
  priceRange: [number, number];
  setPriceRange: Dispatch<SetStateAction<[number, number]>>;
  checkboxState: { [key: string]: boolean };
  setCheckboxState: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  updateProducts: Function;
}

export const FilterMenu: React.FC<FilterMenuProps> = (
  props: FilterMenuProps
) => {
  const {
    priceRange,
    setPriceRange,
    checkboxState,
    setCheckboxState,
    updateProducts,
  } = props;

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

  const handleSliderPriceUpdate = (range: [number, number]) => {
    setPriceRange([Math.min(range[0], range[1]), Math.max(range[0], range[1])]);
  };

  return (
    <>
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
      <h2 className="mt-5 font-semibold text-lg ">Price Range</h2>
      <div className="flex flex-row space-x-2">
        <div>{`$${priceRange[0].toString()}`}</div>
        <div className="flex items-center">to</div>
        <div>{`$${priceRange[1].toString()}`}</div>
      </div>

      <div className="flex flex-row justify-between mt-1">
        <div className="flex flex-col justify-center w-full mr-2">
          <Slider
            value={priceRange}
            onChange={(e) =>
              handleSliderPriceUpdate(e.value as [number, number])
            }
            className="w-full"
            range
            min={0}
            max={300}
            step={5}
          />
        </div>
        <div
          className="cursor-pointer transition ease-in-out hover:scale-105"
          onClick={() => updateProducts()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#0078d4"
            className="size-9"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </>
  );
};
