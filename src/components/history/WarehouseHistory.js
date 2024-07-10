import React, { useState } from "react";
import ProductQuantityChart from "./ProductQuantityChart";
import WarehouseHistoryFilter from "./WarehouseHistoryFilter";
import { Container } from "react-bootstrap";
export default function WarehouseHistory() {
  const [filter, setFilter] = useState({
    start_date: "",
    end_date: "",
    warehouse_id: -1,
    product_id: -1,
    product_name: "", //for show
    product_image: "", // for show
  });

  const [validatedFilter, setValidatedFilter] = useState({});

  console.log(filter);
  return (
    <Container>
      <WarehouseHistoryFilter
        filter={filter}
        setFilter={setFilter}
        validatedFilter={validatedFilter} //May be remove
        setValidatedFilter={setValidatedFilter}
      ></WarehouseHistoryFilter>
      <hr></hr>
      <ProductQuantityChart filter={validatedFilter}></ProductQuantityChart>
    </Container>
  );
}
