import React, { useState } from "react";
import { Card, Typography, Carousel, Tooltip } from "antd";

export interface Product {
  productId: number;
  landingPageUrl: string;
  product: string;
  productName: string;
  rating: number;
  ratingCount: number;
  discount: number;
  brand: string;
  searchImage: string;
  effectiveDiscountPercentageAfterTax: number;
  effectiveDiscountAmountAfterTax: number;
  inventoryInfo: Array<{
    skuId: number;
    label: string;
    inventory: number;
    available: boolean;
  }>;
  sizes: string;
  images: Array<{ view: string; src: string }>;
  gender: string;
  primaryColour: string;
  discountLabel: string;
  discountDisplayLabel: string;
  additionalInfo: string;
  category: string;
  mrp: number;
  price: number;
  colorVariantAvailable: boolean;
  discountType: string;
  catalogDate: string;
  season: string;
  year: string;
}

interface ProductItemProps {
  product: Product;
}

const { Meta } = Card;
const { Text } = Typography;

const renderProductDescription = (product: Product, hoverActive: boolean) => {
  return (
    <div>
      <Text style={{ fontSize: "11px" }}>
        {hoverActive ? `Sizes: ${product.sizes}` : product.additionalInfo}
      </Text>
      <div style={{ display: "flex" }}>
        <Text strong style={{ fontSize: "12px" }}>
          Rs. {product.price}
        </Text>
        <Text
          type="secondary"
          delete
          style={{ fontSize: "12px", marginLeft: "5px" }}
        >
          Rs. {product.mrp}
        </Text>
        <Text type="warning" style={{ fontSize: "12px", marginLeft: "5px" }}>
          {product.discountDisplayLabel}
        </Text>
      </div>
    </div>
  );
};

const renderCarousel = (
  images: Array<{ view: string; src: string }>
): JSX.Element => {
  return (
    <Carousel
      dots
      autoplay
      autoplaySpeed={1000}
      pauseOnDotsHover
      pauseOnHover={false}
      speed={500}
      infinite
    >
      {images.map((image, index) => {
        return <img key={index} alt="Product" src={image.src} />;
      })}
    </Carousel>
  );
};

const ProductItem = React.memo(function ProductsList(
  props: ProductItemProps
): JSX.Element {
  const [hoverActive, setHoverActive] = useState(false);
  const { product } = props;
  return (
    <Tooltip title={product.productName}>
      <Card
        style={{ width: "250px" }}
        hoverable
        cover={
          hoverActive ? (
            renderCarousel(product.images)
          ) : (
            <img alt={product.productName} src={product.searchImage} />
          )
        }
        onMouseEnter={() => {
          setHoverActive(true);
        }}
        onMouseLeave={() => {
          setHoverActive(false);
        }}
      >
        <Meta
          title={product.brand}
          description={renderProductDescription(product, hoverActive)}
        />
      </Card>
    </Tooltip>
  );
});

export default ProductItem;
