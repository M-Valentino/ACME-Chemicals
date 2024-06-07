import React, { Dispatch, SetStateAction } from "react";
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
      category: "Agricultural Chemicals",
      subCategories: [
        "Fertilizers",
        "Pesticides",
        "Herbicides",
        "Growth Regulators",
      ],
    },
    {
      category: "Industrial Chemicals",
      subCategories: ["Acids", "Bases", "Solvents"],
    },
    {
      category: "Laboratory Chemicals",
      subCategories: ["Reagents", "Buffers", "Analytical Chemicals"],
    },
  ];

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setCheckboxState((prevState) => {
      const newState = { ...prevState, [name]: checked };

      // Check if the changed checkbox is a category
      const category = categories.find((cat) => cat.category === name);
      if (category) {
        // Update subcategories based on category state
        category.subCategories.forEach((subCat) => {
          newState[subCat] = checked;
        });
      } else {
        // If a subcategory is checked, check the parent category
        categories.forEach((cat) => {
          if (cat.subCategories.includes(name) && checked) {
            newState[cat.category] = checked;
          }
        });
      }

      // Ensure category is unchecked if all subcategories are unchecked
      categories.forEach((cat) => {
        if (cat.subCategories.every((subCat) => !newState[subCat])) {
          newState[cat.category] = false;
        }
      });
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
      <div className=" bg-slate-100 p-4 mt-4 rounded-md border-stone-200 border-2">
        <h2 className="font-semibold text-lg ">Categories</h2>
        {categories.map((cat, i, row) => (
          <div key={cat.category}>
            <div className="flex align-items-center mt-2">
              <Checkbox
                inputId={cat.category}
                name={cat.category}
                value={cat.category}
                checked={checkboxState[cat.category] || false}
                onChange={(e) =>
                  handleCheckboxChange(cat.category, e.checked as boolean)
                }
              />
              <label htmlFor={cat.category} className="ml-2 cursor-pointer">
                {cat.category}
              </label>
            </div>
            {cat.subCategories.map((subCat) => (
              <div className="flex align-items-center ml-6 mt-1" key={subCat}>
                <Checkbox
                  inputId={subCat}
                  name={subCat}
                  value={subCat}
                  checked={checkboxState[subCat] || false}
                  onChange={(e) =>
                    handleCheckboxChange(subCat, e.checked as boolean)
                  }
                />
                <label htmlFor={subCat} className="ml-2 cursor-pointer text-gray-700">
                  {subCat}
                </label>
              </div>
            ))}
            {i !== row.length - 1 && (
              <hr className="border-stone-200 border-1 mt-1" />
            )}
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
