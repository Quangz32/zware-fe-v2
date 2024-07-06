import React, { useState } from "react";
import { Form, FormGroup, FormLabel, FormControl, FormSelect, Button } from "react-bootstrap";
import Select from "react-select";
import defaultProductImage from "./defaultProductImage.jpg";

//props: filter, setfilter, productList
export default function TransactionFilter(props) {
  // console.log(props.productList);

  const handleClearFilter = () => {
    props.setFilter({
      start_date: "",
      end_date: "",
      product_name: "",
      status: "", //all, pending, shipping, completed, canceled
    });
  };

  const handleProductSelect = (selectedOption) => {
    console.log("hadnlProSel");
    props.setFilter({
      ...props.filter,
      product_name: selectedOption.value,
      product_image: selectedOption.image,
    });
  };

  console.log(props.filter);
  return (
    <div className="">
      <Form className="mt-5">
        <div className="d-flex align-items-baseline justify-content-between">
          <div className="fs-5">
            <i className="bi bi-funnel-fill"></i> Filter
          </div>
          <div>
            <Button variant="danger" size="sm" onClick={handleClearFilter}>
              <i className="fs-6 bi bi-trash"></i> Clear
            </Button>
          </div>
        </div>
        <hr></hr>
        {/* FILTER */}
        <FormGroup className="mb-3">
          <FormLabel>Start date</FormLabel>
          <FormControl
            type="date"
            size="sm"
            value={props.filter?.start_date}
            onChange={(e) => {
              props.setFilter({ ...props.filter, start_date: e.target.value });
            }}
          ></FormControl>
        </FormGroup>
        <FormGroup className="mb-2">
          <FormLabel>End date</FormLabel>
          <FormControl
            type="date"
            size="sm"
            value={props.filter?.end_date}
            onChange={(e) => {
              props.setFilter({ ...props.filter, end_date: e.target.value });
            }}
          ></FormControl>
        </FormGroup>
        {/* <FormGroup>
              <FormLabel>Product</FormLabel>
              <FormControl type="date" size="sm"></FormControl>
            </FormGroup> */}
        <label>Product</label>
        {/* <span>{props.filter?.product_name}</span> */}
        <Select
          className="mb-2"
          isSearchable
          value={
            props.filter?.product_name !== ""
              ? {
                  label: props.filter?.product_name,
                  value: props.filter?.product_name,
                  image: props.filter?.product_image,
                }
              : null
          }
          onChange={handleProductSelect}
          options={props.productList?.map((product) => ({
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
              <label className="ms-1">{option.label}</label>
            </>
          )}
        />
        <label>Status</label>
        <FormSelect
          value={props.filter?.status}
          onChange={(e) => {
            props.setFilter({ ...props.filter, status: e.target.value });
          }}
        >
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
