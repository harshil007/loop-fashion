import React, { useEffect, useState } from "react";
import { List, PageHeader, Select, Input } from "antd";
import ProductItem, { Product } from "./ProductItem";
import debounce from "../helpers/debounce";
import { getSortedProducts } from "../helpers/filterHelpers";

interface ProductsListProps {
  products: Product[];
}

const { Option } = Select;

const PAGE_SIZE = 20;

const ProductsList = React.memo(function ProductsList(
  props: ProductsListProps
): JSX.Element {
  const { products } = props;

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const [currentSort, setCurrentSort] = useState<string | undefined>(undefined);

  useEffect(() => {
    setFilteredProducts(getSortedProducts(products, currentSort));
  }, [currentSort, products]);

  const filterBySearchQuery = debounce((searchQuery: string) => {
    setFilteredProducts(
      searchQuery
        ? filteredProducts.filter((product) =>
            product.productName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
        : getSortedProducts(products, currentSort)
    );
  }, 500);

  return (
    <div>
      <PageHeader
        ghost={false}
        title="Fashion Products"
        subTitle={`(Found ${filteredProducts.length} items)`}
        extra={[
          <Input
            style={{ width: 300, marginRight: "15px" }}
            placeholder="Search for products"
            allowClear
            onChange={(e) => {
              const value = e.target.value;
              filterBySearchQuery(value);
            }}
          />,
          <>
            Sort By:&nbsp;
            <Select
              value={currentSort}
              allowClear
              style={{ width: 200 }}
              placeholder="Sort products by..."
              onChange={(value?: string) => setCurrentSort(value)}
            >
              <Option value="rating">Customer Rating</Option>
              <Option value="price_desc">Price: High to Low</Option>
              <Option value="price_asc">Price: Low to High</Option>
              <Option value="discount">Better Discount</Option>
            </Select>
          </>,
        ]}
      ></PageHeader>
      <List
        style={{ height: "76vh", overflowY: "scroll" }}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
        }}
        pagination={{
          pageSize: PAGE_SIZE,
          showSizeChanger: false,
          position: "bottom",
        }}
        dataSource={filteredProducts}
        key={currentSort || "default"}
        renderItem={(item) => (
          <List.Item key={item.productId}>
            <ProductItem product={item} />
          </List.Item>
        )}
      />
    </div>
  );
});

export default ProductsList;
