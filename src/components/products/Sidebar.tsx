import { Dispatch, SetStateAction } from "react";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Slider } from "primereact/slider";

interface SidebarProps {
  priceRange: [number, number];
  setPriceRange: Dispatch<SetStateAction<[number, number]>>;
}

export const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const { priceRange, setPriceRange } = props;

  const priceInputFormatter = (val: string) => {
    return Math.min(parseInt(val.substring(1)), 300) || 0;
  };

  // For preventing min price from being higher than max price and vice versa.
  const handleSliderPriceUpdate = (range: [number, number]) => {
    setPriceRange([Math.min(range[0], range[1]), Math.max(range[0], range[1])]);
  };

  return (
    <div className=" max-w-[256px] mr-16">
      <h1 className=" font-extrabold text-5xl text-primary">Products</h1>
      <div className=" bg-slate-100 p-4 mt-4 rounded-md border-stone-200 border-2">
        <h2 className=" mb-2 font-semibold text-lg ">Categories</h2>
        <div className="flex align-items-center ">
          <Checkbox inputId="ingredient1" name="pizza" value="Cheese" checked />
          <label htmlFor="ingredient1" className="ml-2 ">
            Cheese
          </label>
        </div>
        <div className="flex align-items-center ">
          <Checkbox inputId="ingredient1" name="pizza" value="Cheese" checked />
          <label htmlFor="ingredient1" className="ml-2 ">
            Cheese
          </label>
        </div>
        <div className="flex align-items-center ">
          <Checkbox inputId="ingredient1" name="pizza" value="Cheese" checked />
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
