import React, { useEffect, useState } from "react";
import {
  AppliedFilters,
  Filter,
  getAllFiltersData,
} from "../helpers/filterHelpers";
import { Product } from "./ProductItem";
import { Typography, Divider, Select } from "antd";

interface ProductFiltersProps {
  products: Product[];
  onFiltersChange: (filters: AppliedFilters) => void;
}

const { Title } = Typography;

const ProductFilters = React.memo(function ProductFilters(
  props: ProductFiltersProps
): JSX.Element {
  const { products, onFiltersChange } = props;
  const [allFilters, setAllFilters] = useState<{ [key: string]: Filter[] }>({});
  const [appliedFilters, setAppliedFilters] = useState<{
    [key: string]: string[];
  }>({});

  const onFilterChange = (key: string, values: string[]) => {
    const newFilters = { ...appliedFilters, [key]: values };
    setAppliedFilters(newFilters);
    onFiltersChange(newFilters);
  };

  useEffect(() => {
    const { allCategories, allBrands } = getAllFiltersData(products);
    setAllFilters({ category: allCategories, brand: allBrands });
  }, [products]);

  return (
    <div style={{ marginTop: "30px", marginLeft: "10px", marginRight: "10px" }}>
      <Title level={4}>FILTERS</Title>
      <Divider />
      {Object.keys(allFilters).map((filterName) => {
        const filters = allFilters[filterName];
        return (
          <div>
            <Title level={5}>{filterName.toUpperCase()}</Title>
            <Select
              value={appliedFilters[filterName]}
              mode="multiple"
              style={{ width: "100%" }}
              placeholder={`Select ${filterName}`}
              onChange={(values) => {
                onFilterChange(filterName, values);
              }}
              options={filters.map((filter) => ({
                label: `${filter.value} (${filter.count})`,
                value: filter.value,
              }))}
            />
            <Divider />
          </div>
        );
      })}
    </div>
  );
});

export default ProductFilters;
