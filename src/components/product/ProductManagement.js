import React from "react";
import ProductCard from "./ProductCard";

export default function ProductManagement() {
  const products = [
    { name: "Mai", category: "Đào", supplier: "Phở", measureUnit: "Piano" },
    { name: "Mai", category: "Đào", supplier: "Phở", measureUnit: "Piano" },
    { name: "Mai", category: "Đào", supplier: "Phở", measureUnit: "Piano" },
    { name: "Mai", category: "Đào", supplier: "Phở", measureUnit: "Piano" },
    { name: "Mai", category: "Đào", supplier: "Phở", measureUnit: "Piano" },
    { name: "Mai", category: "Đào", supplier: "Phở", measureUnit: "Piano" },
    { name: "Mai", category: "Đào", supplier: "Phở", measureUnit: "Piano" },
    { name: "Mai", category: "Đào", supplier: "Phở", measureUnit: "Piano" },
    { name: "Mai", category: "Đào", supplier: "Phở", measureUnit: "Piano" },
  ];
  return (
    <div className="row">
      {products.map((product) => (
        <ProductCard product={product}></ProductCard>
      ))}
    </div>
  );
}
