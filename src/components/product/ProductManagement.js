import React from "react";
import ProductCard from "./ProductCard";

export default function ProductManagement() {
  const products = [
    { name: "Đào", supplier: "Phở", measureUnit: "Piano" },
    { name: "Đào", supplier: "Phở", measureUnit: "Piano" },
    { name: "Đào", supplier: "Phở", measureUnit: "Piano" },
    { name: "Đào", supplier: "Phở", measureUnit: "Piano" },
    { name: "Đào", supplier: "Phở", measureUnit: "Piano" },
    { name: "Đào", supplier: "Phở", measureUnit: "Piano" },
    { name: "Đào", supplier: "Phở", measureUnit: "Piano" },
    { name: "Đào", supplier: "Phở", measureUnit: "Piano" },
    { name: "Đào", supplier: "Phở", measureUnit: "Piano" },
    { name: "Đào", supplier: "Phở", measureUnit: "Piano" },
  ];
  return (
    <div className="row">
      {products.map((product) => (
        <ProductCard product={product}></ProductCard>
      ))}
    </div>
  );
}
