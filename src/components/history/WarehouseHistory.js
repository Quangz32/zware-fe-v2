import React, { useEffect, useState } from "react";
import ProductQuantityChart from "./ProductQuantityChart";
import WarehouseHistoryFilter from "./WarehouseHistoryFilter";
import { Alert, Container } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
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

  const [startQuantity, setStartQuantity] = useState(0);
  const [endQuantity, setEndQuantity] = useState(0);

  useEffect(() => {
    const fetchStartQuantity = async () => {
      MyAxios.get(
        `history/last_quantity_before_date` +
          `?warehouse_id=${validatedFilter.warehouse_id}` +
          `&product_id=${validatedFilter.product_id}` +
          `&date=${validatedFilter.start_date}`
      )
        .then((res) => {
          // console.log(res);
          setStartQuantity(res.data.data);
        })
        .catch(() => {});
    };
    const fetchEndQuantity = async () => {
      MyAxios.get(
        `history/last_quantity_before_date` +
          `?warehouse_id=${validatedFilter.warehouse_id}` +
          `&product_id=${validatedFilter.product_id}` +
          `&date=${validatedFilter.end_date}`
      )
        .then((res) => {
          // console.log(res);
          setEndQuantity(res.data.data);
        })
        .catch(() => {});
    };

    fetchStartQuantity();
    fetchEndQuantity();
  }, [validatedFilter]);

  // console.log(filter);
  return (
    <Container>
      <WarehouseHistoryFilter
        filter={filter}
        setFilter={setFilter}
        validatedFilter={validatedFilter} //May be remove
        setValidatedFilter={setValidatedFilter}
      ></WarehouseHistoryFilter>
      <hr></hr>
      {/* <h2>Changes</h2> */}
      <Alert className="fs-4">
        <span className="me-5">Start quantity: {startQuantity}</span>
        <span></span>
        <span>End quantity: {endQuantity}</span>
      </Alert>
      <ProductQuantityChart
        filter={validatedFilter}
        startQuantity={startQuantity}
        endQuantity={endQuantity}
      ></ProductQuantityChart>
    </Container>
  );
}
