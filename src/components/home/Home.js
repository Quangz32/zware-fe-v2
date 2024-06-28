import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Container>
                <header className="text-center mt-4 mb-4">
                    <h1>Warehouse Management Dashboard</h1>
                </header>
                <Row className="mb-4">
                    <Col sm={3}>
                        <Card className="stat-card">
                            <Card.Body>
                                <Card.Title>Total Products</Card.Title>
                                <Card.Text>500</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col sm={3}>
                        <Card className="stat-card">
                            <Card.Body>
                                <Card.Title>Total Transaction</Card.Title>
                                <Card.Text>123</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={3}>
                        <Card className="stat-card">
                            <Card.Body>
                                <Card.Title>Total Disposed Product</Card.Title>
                                <Card.Text>123</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={3}>
                        <Card className="stat-card">
                            <Card.Body>
                                <Card.Title>Pending Transactions</Card.Title>
                                <Card.Text>2</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                </Row>
                <Row>
                    <Col sm={6}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>Warehouse Details</Card.Title>
                                <Card.Text>
                                    Main Warehouse <br />
                                    ID: 1 <br />
                                    Address: 123 Warehouse St.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>Top 5 Iteams by Quantity</Card.Title>
                                <Table striped bordered>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Example data */}
                                        <tr>
                                            <td>1</td>
                                            <td>Product A</td>
                                            <td>Category 1</td>
                                            <td>150</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Product B</td>
                                            <td>Category 2</td>
                                            <td>120</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Product C</td>
                                            <td>Category 1</td>
                                            <td>100</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Product D</td>
                                            <td>Category 3</td>
                                            <td>90</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>Product E</td>
                                            <td>Category 2</td>
                                            <td>80</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>Pending Transactions</Card.Title>
                                <Table striped bordered>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Date</th>
                                            <th>Type</th>
                                            <th>Status</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Example data */}
                                        <tr>
                                            <td>1</td>
                                            <td>2024-06-25</td>
                                            <td>Inbound</td>
                                            <td>Pending</td>
                                            <td>100</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>2024-06-24</td>
                                            <td>Outbound</td>
                                            <td>Pending</td>
                                            <td>50</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>Alerts</Card.Title>
                                <Card.Text>
                                    <div className="alert-item mb-2">
                                        <strong>Expiring Soon:</strong> Product X
                                    </div>
                                    <div className="alert-item">
                                        <strong>Expiring Soon:</strong> Product Y
                                    </div>
                                    {/* Add more alert items as needed */}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                
            </Container>
        </div>
    );
};

export default Dashboard;
