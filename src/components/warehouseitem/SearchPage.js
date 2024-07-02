import React, { useState, useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";

const SearchPage = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [zones, setZones] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useState({
    warehouse: "",
    zone: "",
    product: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const warehouseResponse = await MyAxios.get('/warehouses');
        setWarehouses(warehouseResponse.data.data);

        const zoneResponse = await MyAxios.get('/zones');
        setZones(zoneResponse.data.data);

        const productResponse = await MyAxios.get('/products');
        setProducts(productResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

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
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Error during search:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Search Page</h1>
      <Form onSubmit={handleSearch}>
        <Form.Group controlId="warehouse">
          <Form.Label>Warehouse</Form.Label>
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

        <Form.Group controlId="zone">
          <Form.Label>Zone</Form.Label>
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

        <Form.Group controlId="product">
          <Form.Label>Product</Form.Label>
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

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </Form>

      {searchResults.length > 0 && (
        <Table striped bordered hover style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Warehouse</th>
              <th>Zone</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Expire Date</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result) => (
              <tr key={result.id}>
                <td>{result.warehouse_name}</td>
                <td>{result.zone_name}</td>
                <td>{result.product_name}</td>
                <td>{result.quantity}</td>
                <td>{result.expire_date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default SearchPage;
