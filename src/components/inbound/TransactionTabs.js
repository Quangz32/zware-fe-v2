import React from 'react';
import { Tab, Nav, Row, Col, Table } from 'react-bootstrap';

const TransactionTabs = ({ transactions = [] }) => {
  return (
    <Tab.Container defaultActiveKey={transactions.length > 0 ? transactions[0]?.id : ""}>
      <Nav variant="tabs">
        {transactions.map(transaction => (
          <Nav.Item key={transaction.id}>
            <Nav.Link eventKey={transaction.id}>{transaction.id}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <Tab.Content>
        {transactions.map(transaction => (
          <Tab.Pane eventKey={transaction.id} key={transaction.id}>
            <Row className="mt-3">
              <Col md={3}><strong>Date:</strong> {transaction?.date}</Col>
              <Col md={3}><strong>Status:</strong> {transaction?.status}</Col>
              <Col md={3}><strong>Source:</strong> {transaction?.source}</Col>
              <Col md={3}><strong>Maker ID:</strong> {transaction?.maker_id}</Col>
            </Row>
            <Table striped bordered className="mt-3">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Expire Date</th>
                  <th>Supplier</th>
                  <th>Measure Unit</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {transaction?.items?.length > 0 ? (
                  transaction.items.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{"category"}</td>
                      <td>{item.expire_date}</td>
                      <td>{item.supplier}</td>
                      <td>{"unit"}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">No items available</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Tab.Pane>
        ))}
      </Tab.Content>
    </Tab.Container>
  );
};

export default TransactionTabs;
