import { Product } from "../components/ProductItem";

export interface Filter {
  value: string;
  count: number;
}

export interface AppliedFilters {
  [key: string]: string[];
}

export const getAllFiltersData = (products: Product[]) => {
  const allCategoriesObj: { [key: string]: number } = {};
  const allBrandsObj: { [key: string]: number } = {};
  products.forEach((product) => {
    if (!allCategoriesObj[product.category])
      allCategoriesObj[product.category] = 0;
    allCategoriesObj[product.category]++;
    if (!allBrandsObj[product.brand]) allBrandsObj[product.brand] = 0;
    allBrandsObj[product.brand]++;
  });
  const allCategories = getFilterArray(allCategoriesObj);
  const allBrands = getFilterArray(allBrandsObj);
  return { allCategories, allBrands };
};

const getFilterArray = (obj: { [key: string]: number }): Filter[] => {
  return Object.keys(obj)
    .reduce((arr: Filter[], key) => {
      arr.push({ value: key, count: obj[key] });
      return arr;
    }, [])
    .sort((a, b) => (a.count > b.count ? -1 : 1));
};

export const applyFilters = (
  products: Product[],
  filters: AppliedFilters
): Product[] => {
  return products.filter((product) => {
    let include = true;
    Object.keys(filters).forEach((filterName) => {
      if (filters[filterName].length > 0)
        include =
          include &&
          filters[filterName].includes(
            product[filterName as "category" | "brand"]
          );
    });
    return include;
  });
};

export const getSortedProducts = (
  products: Product[],
  currentSort?: string
) => {
  let sorted = products;
  if (currentSort) {
    const order = currentSort?.split("_")?.[1] !== "asc" ? -1 : 1;
    const sortField = currentSort?.split("_")[0] as
      | "rating"
      | "price"
      | "discount";
    if (["rating", "price", "discount"].includes(sortField)) {
      sorted = [...products].sort((a, b) =>
        a[sortField] > b[sortField] ? order : -order
      );
    }
  }
  return sorted;
};
