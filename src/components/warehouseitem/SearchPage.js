import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import ZoneList from "./ZoneList";
import WarehouseItemList from "./WarehouseItemList";

const SearchPage = ({ onSearchResults }) => {
  const [warehouses, setWarehouses] = useState([]);
  const [zones, setZones] = useState([]);
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useState({
    warehouse: "",
    zone: "",
    item: "",
    product: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const warehouseResponse = await MyAxios.get('/warehouses');
        setWarehouses(warehouseResponse.data.data);

        const zoneResponse = await MyAxios.get('/zones');
        setZones(zoneResponse.data.data);

        const itemResponse = await MyAxios.get('/items');
        setItems(itemResponse.data.data);

        const productResponse = await MyAxios.get('/products');
        setProducts(productResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await MyAxios.get('/search', {
        params: searchParams
      });
      onSearchResults(response.data.data); // Pass search results to parent component
    } catch (error) {
      console.error("Error during search:", error);
    }
    setLoading(false);
  };

  const handleZoneSearch = async (zoneName) => {
    setLoading(true);
    try {
      const response = await MyAxios.get('/zones', {
        params: { name: zoneName }
      });
      setZones(response.data.data); // Update zones state with search results
    } catch (error) {
      console.error("Error searching zones:", error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Form onSubmit={handleSearch} className="mb-3">
            <Row>
              <Col>
                <Form.Group controlId="warehouse">
                  <Form.Control
                    as="select"
                    name="warehouse"
                    value={searchParams.warehouse}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Warehouse</option>
                    {warehouses.map((warehouse) => (
                      <option key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="zone">
                  <Form.Control
                    as="select"
                    name="zone"
                    value={searchParams.zone}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Zone</option>
                    {zones.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="item">
                  <Form.Control
                    as="select"
                    name="item"
                    value={searchParams.item}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Item</option>
                    {items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="product">
                  <Form.Control
                    as="select"
                    name="product"
                    value={searchParams.product}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Search"}
                </Button>
              </Col>
            </Row>
          </Form>
          <Form onSubmit={(e) => { e.preventDefault(); handleZoneSearch(searchParams.zone); }} className="mb-3">
            <Row>
              <Col>
                <Form.Group controlId="zoneSearch">
                  <Form.Control
                    type="text"
                    placeholder="Search Zone"
                    name="zone"
                    value={searchParams.zone}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Search"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchPage;
