import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import MyAxios from "../../util/MyAxios";
import {
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  FormControl,
  FormLabel,
  FormSelect,
  Alert,
} from "react-bootstrap";

//props: filter, setFilters, validatedFilter, setValidatedFilter
export default function WarehouseHistoryFilter(props) {
  const [productList, setProductList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [filterError, setFilterError] = useState("");

  const handleClearFilter = () => {
    props.setFilter({
      ...props.filter,
      start_date: "",
      end_date: "",
      // warehouse_id: -1,
      product_id: -1,
      product_name: "", //for show
      product_image: "", // for show
    });

    props.setValidatedFilter({});
  };

  const handleProductSelect = (selectedOption) => {
    props.setFilter({
      ...props.filter,
      product_id: selectedOption.product_id,
      product_name: selectedOption.value,
      product_image: selectedOption.image,
    });
  };

  const handleApplyFilter = () => {
    //Validation form

    if (props.filter.product_id < 0) {
      setFilterError("Please choose a product");
      return;
    }

    if (props.filter.start_date === "" || props.filter.end_date === "") {
      setFilterError("Start date and End date are required");
      return;
    }

    if (new Date(props.filter.start_date) > new Date(props.filter.end_date)) {
      setFilterError("Start date cannot be after End date");
      return;
    }

    setFilterError("");
    //continue

    props.setValidatedFilter(props.filter);
  };

  //    fet ProductList
  useEffect(() => {
    const fetchProduct = async () => {
      await MyAxios.get("products")
        .then((res) => {
          if (res.status === 200) {
            setProductList(res.data.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchProduct();
  }, []);

  //    fet Warehouse
  useEffect(() => {
    const fetchWarehouse = async () => {
      await MyAxios.get("warehouses")
        .then((res) => {
          if (res.status === 200) {
            setWarehouseList(res.data.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchWarehouse();
  }, []);

  //set init warehouse choose
  useEffect(() => {
    const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
    if (loggingUser.role === "admin") setIsAdmin(true);

    const selectedWarehouse =
      loggingUser?.role === "admin"
        ? parseInt(warehouseList[0]?.id)
        : parseInt(loggingUser.warehouse_id);

    props.setFilter({ ...props.filter, warehouse_id: selectedWarehouse });
  }, [warehouseList]);

  // console.log(props);

  return (
    <Alert>
      <Form>
        <Row>
          {/* <Col md={2} lg={2}>
            <div className="fs-5">
              <i className="bi bi-funnel-fill"></i> Filter
            </div>
          </Col> */}
          <Col>
            <FormLabel className="fw-bolder">Warehouse</FormLabel>
            <FormSelect
              disabled={!isAdmin}
              value={props.filter.warehouse_id.toString()}
              onChange={(e) => {
                props.setFilter({ ...props.filter, warehouse_id: parseInt(e.target.value) });
              }}
            >
              {warehouseList?.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))}
            </FormSelect>
          </Col>

          <Col>
            <label className="mb-2 fw-bolder">Product</label>
            <ReactSelect
              className="mb-2"
              isSearchable
              value={
                props.filter?.product_id > 0
                  ? {
                      label: props.filter?.product_name,
                      value: props.filter?.product_name,
                      image: props.filter?.product_image,
                    }
                  : null
              }
              onChange={handleProductSelect}
              options={productList?.map((product) => ({
                label: product.name,
                value: product.name,
                product_id: product.id,
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
                        : `../share/defaultProductImage.jpg`
                    }
                  ></img>
                  <label className="ms-1">{option.label}</label>
                </>
              )}
            />
          </Col>
          <Col>
            <FormGroup className="mb-3">
              <FormLabel className="fw-bolder">Start date</FormLabel>
              <FormControl
                type="date"
                value={props.filter?.start_date}
                onChange={(e) => {
                  props.setFilter({ ...props.filter, start_date: e.target.value });
                }}
              ></FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="mb-2">
              <FormLabel className="fw-bolder">End date</FormLabel>
              <FormControl
                type="date"
                value={props.filter?.end_date}
                onChange={(e) => {
                  props.setFilter({ ...props.filter, end_date: e.target.value });
                }}
              ></FormControl>
            </FormGroup>
          </Col>

          <Col>
            <div className="" style={{ paddingTop: "32px" }}>
              <Button className="me-3" variant="success" size="sm" onClick={handleApplyFilter}>
                <i className="fs-6 me-1 bi bi-arrow-right-square"></i>Apply
              </Button>
              <Button variant="danger" size="sm" onClick={handleClearFilter}>
                <i className="fs-6 bi bi-trash"></i> Clear
              </Button>
            </div>
          </Col>
        </Row>
        <label className="text-danger ms-5">{filterError}</label>
      </Form>
    </Alert>
  );
}
