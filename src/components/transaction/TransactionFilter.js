import React, { useState } from "react";
import { Form, FormGroup, FormLabel, FormControl, FormSelect, Button } from "react-bootstrap";
import Select from "react-select";
import defaultProductImage from "./defaultProductImage.jpg";

//props: filter, setfilter, productList
export default function TransactionFilter(props) {
  console.log(props.productList);

  const handleClearFilter = () => {
    props.setFilter({
      start_date: "",
      end_date: "",
      product_id: "",
      status: "", //all, pending, shipping, completed, canceled
    });
  };

  return (
    <div className="">
      <Form className="mt-5">
        <div className="d-flex align-items-baseline justify-content-between">
          <div className="fs-5">
            <i className="bi bi-funnel-fill"></i> Filter
          </div>
          <div>
            <Button variant="danger" size="sm">
              <i className="fs-6 bi bi-trash"></i> Clear
            </Button>
          </div>
        </div>
        <hr></hr>
        {/* FILTER */}
        <FormGroup className="mb-3">
          <FormLabel>Start date</FormLabel>
          <FormControl type="date" size="sm"></FormControl>
        </FormGroup>
        <FormGroup className="mb-2">
          <FormLabel>End date</FormLabel>
          <FormControl type="date" size="sm"></FormControl>
        </FormGroup>
        {/* <FormGroup>
              <FormLabel>Product</FormLabel>
              <FormControl type="date" size="sm"></FormControl>
            </FormGroup> */}
        <label>Product</label>
        <Select
          className="mb-2"
          isSearchable
          options={props.productList?.map((product) => ({
            // ...product,
            product: product,
            label: product.name,
            value: product.name,
            image: product.image,
          }))}
          getOptionLabel={(option) => (
            <>
              <img
                height={30}
                width={30}
                src={
                  option?.image
                    ? `http://localhost:2000/imageproducts/${option?.image}`
                    : defaultProductImage
                }
              ></img>
              <label>{option.label}</label>
            </>
          )}
        />
        <label>Status</label>
        <FormSelect>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="shipping">Shipping</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </FormSelect>
      </Form>
    </div>
  );
}
