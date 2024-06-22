import React, { useEffect, useState } from "react";
import nextBase64 from "next-base64";
import { FilterMenu } from "@/components/products/FilterMenu";
import { ProductCard, ProductCardType } from "@/components/ProductCard";
import { Chip } from "primereact/chip";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { MainWrapper } from "@/components/MainWrapper";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import { ProgressSpinner } from "primereact/progressspinner";

export default function Products() {
  const sorts: { name: string }[] = [
    { name: "Best Match" },
    { name: "Lowest Price" },
    { name: "Highest Price" },
  ];
  const [visibleLeft, setVisibleLeft] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<{ name: string }>(sorts[0]);

  const [checkboxState, setCheckboxState] = useState<{
    [key: string]: boolean;
  }>({});

  const [chipState, setChipState] = useState<{
    priceRange: [number, number];
    filters: {
      [key: string]: boolean;
    };
  }>({ priceRange: [0, 300], filters: {} });

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [searchBar, setSearchBar] = useState<string>("");

  const [products, setProducts] = useState<ProductCardType[]>([]);

  async function updateProducts() {
    fetch(
      `/api/products?sortBy=${nextBase64.encode(
        selectedSort.name
      )}&searchText=${nextBase64.encode(searchBar)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setChipState({
          ...chipState,
          filters: checkboxState,
          priceRange: priceRange,
        });
      });
  }
  useEffect(() => {
    updateProducts();
  }, [selectedSort, checkboxState]);

  return (
    <MainWrapper title="Products">
      <div className="mobileFilterMenu">
        <Sidebar
          visible={visibleLeft}
          position="left"
          onHide={() => setVisibleLeft(false)}
        >
          <FilterMenu
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            checkboxState={checkboxState}
            setCheckboxState={setCheckboxState}
          />
        </Sidebar>
      </div>
      <div className="md:p-8 xs:p-4">
        <div className="md:flex md:flex-row md:justify-between">
          <div className="desktopFilterMenu">
            <div className="min-w-[230px] mr-8">
              <h1 className=" font-extrabold text-5xl text-primary">
                Products
              </h1>
              <div className="pr-4 mt-4 ">
                <FilterMenu
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
              <Button
                onClick={() => setVisibleLeft(true)}
                label="Filters"
                outlined
                className="mr-2 mobileFilterMenu h-11"
              />
              <div className="flex-grow flex">
                <InputText
                  className="md:flex-grow h-11 xs:w-[calc(100%-6rem)]"
                  type="text"
                  placeholder="Search"
                  value={searchBar}
                  onChange={(e) => setSearchBar(e.target.value)}
                />
                <Button
                  label="Search"
                  className="ml-2 md:w-44 h-11"
                  onClick={() => updateProducts()}
                />
              </div>
            </div>
            <div className="flex flex-row flex-wrap">
              <Chip
                label={`$${chipState.priceRange[0]} to $${chipState.priceRange[1]}`}
                className="mt-2 mr-2"
              />
              {Object.entries(chipState.filters).map(
                ([key, value]) =>
                  value && <Chip label={key} key={key} className="mt-2 mr-2" />
              )}
            </div>
            <div className="flex flex-row flex-wrap">
              {products.length > 0 ? (
                products.map((product, index: number) => (
                  <ProductCard
                    key={index}
                    imgsrc={product.imgsrc}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    discount={product.discount}
                    size={product.size}
                  />
                ))
              ) : (
                <ProgressSpinner />
              )}
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
}
