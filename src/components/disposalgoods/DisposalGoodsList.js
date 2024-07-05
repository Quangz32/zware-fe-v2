import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import { Link } from "react-router-dom";

const DisposalGoodsList = () => {
  const [disposalGoods, setDisposalGoods] = useState([]);

  useEffect(() => {
    const fetchDisposalGoods = async () => {
      try {
        const response = await MyAxios.get("/goods_disposal");
        setDisposalGoods(response.data.data);
      } catch (error) {
        console.error("Error fetching disposal goods:", error);
      }
    };

    fetchDisposalGoods();
  }, []);

  return (
    <Container>
      <h1>Disposed Goods</h1>
      <Link to="/create-disposal">
        <Button variant="primary" className="mb-3">
          Create Disposal Form
        </Button>
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Warehouse ID</th>
            <th>Product ID</th>
            <th>Zone ID</th>
            <th>Expire Date</th>
            <th>Quantity</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {disposalGoods.map((item, index) => (
            <tr key={index}>
              <td>{item.warehouse_id}</td>
              <td>{item.product_id}</td>
              <td>{item.zone_id}</td>
              <td>{item.expire_date}</td>
              <td>{item.quantity}</td>
              <td>{item.reason}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DisposalGoodsList;
