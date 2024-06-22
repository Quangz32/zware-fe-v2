import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import MyAxios from "../../util/MyAxios";
import {
  Alert,
  Form,
  Row,
  InputGroup,
  Container,
  Button,
} from "react-bootstrap";
import WarehouseList from "../warehouse/WarehouseList";

//props contain: searchTerm,
export default function ProductList() {
  const [productList, setProductList] = useState([]);

  const [filter, setFilter] = useState({ name: "", category: "Furniture" });
  const handleFilter = () => {
    console.log("hanelFil");
    console.log(productList);
    const filtedProducts = productList.filter((p) => {
      console.log(p.category);
      return (
        p.name.toLowerCase().includes(filter.name.toLowerCase()) &&
        (filter.category === "all" || p.category === filter.category)
      );
    });
    setProductList(filtedProducts);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MyAxios.get("products");
        setProductList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   handleFilter();
  //   // console.log(productList);
  // }, []);

  //   console.log(productList);

  // handleFilter();
  console.log(productList);
  console.log(filter);

  return (
    <Container>
      {/* Product Filter */}
      <div
        className="p-3 mb-4 rounded-3 con"
        style={{ backgroundColor: "#eee" }}
      >
        <h4>Product filter</h4>
        <Form className="row">
          <InputGroup className="col">
            <InputGroup.Text>{" Name "}</InputGroup.Text>
            <Form.Control placeholder="" />
          </InputGroup>
          <InputGroup className="col">
            <InputGroup.Text>Category</InputGroup.Text>
            <Form.Select>
              <option>All</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </InputGroup>
          <div className="col d-flex align-items-center">
            <Button className="py-0 mx-2" onClick={handleFilter}>
              <i className="bi bi-search  fs-5"></i>
            </Button>
            <Button variant="danger py-0 mx-2">
              <i className="bi bi-trash fs-5"></i>
            </Button>
          </div>
        </Form>
      </div>

      {productList.length === 0 && (
        <Alert style={{ maxWidth: "500px" }}>There are no product here</Alert>
      )}

      <Row>
        {productList.length > 0 &&
          productList.map((product) => (
            <ProductCard product={product} key={product.id}></ProductCard>
          ))}
      </Row>
    </Container>
  );
}
