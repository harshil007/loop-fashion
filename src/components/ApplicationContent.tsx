import React, { useEffect, useState, useCallback } from "react";
import { Layout, Card, Skeleton, Typography, Button } from "antd";
import { getAllProducts } from "../apis/products";
import ProductsList from "./ProductsList";
import { Product } from "./ProductItem";
import ProductFilters from "./ProductFilters";
import { AppliedFilters, applyFilters } from "../helpers/filterHelpers";

const { Content, Sider } = Layout;
const { Text } = Typography;

const ApplicationContent = React.memo(
  function ApplicationContent(): JSX.Element {
    const [fetching, setFetching] = useState(false);
    const [fetchError, setFetchError] = useState(false);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const fetchProducts = useCallback(() => {
      setFetching(true);
      const { data, error } = getAllProducts();
      if (error) setFetchError(error);
      else if (data) {
        setAllProducts(data);
        setFilteredProducts(data);
      }
      setFetching(false);
    }, []);

    const onFiltersChange = useCallback(
      (filters: AppliedFilters) => {
        const filtered = applyFilters(allProducts, filters);
        setFilteredProducts(filtered);
      },
      [allProducts]
    );

    useEffect(() => {
      fetchProducts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Layout style={{ width: "100%", height: "100%" }}>
        <Sider style={{ backgroundColor: "#ffffff" }} width={250}>
          {fetching && <Skeleton />}
          {allProducts && allProducts.length > 0 && (
            <ProductFilters
              products={allProducts}
              onFiltersChange={onFiltersChange}
            />
          )}
        </Sider>
        <Content>
          <Card style={{ margin: "10px" }}>
            {fetching && (
              <>
                Fetching products...
                <Skeleton />
              </>
            )}
            {fetchError && (
              <span>
                <Text>{fetchError}</Text>
                <Button type="link" onClick={fetchProducts}>
                  Retry
                </Button>
              </span>
            )}
            {filteredProducts && filteredProducts.length > 0 && (
              <ProductsList products={filteredProducts} />
            )}
          </Card>
        </Content>
      </Layout>
    );
  }
);

export default ApplicationContent;
