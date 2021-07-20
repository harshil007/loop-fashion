export const getAllProducts = () => {
  const data = require("../data/products.json");
  return { data, error: false };
};
