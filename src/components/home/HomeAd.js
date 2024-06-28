import React, { useEffect, useState } from 'react';
import axios from '../../util/MyAxios';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

const RoleManagementDashboard = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [totalWarehouses, setTotalWarehouses] = useState(0);

    useEffect(() => {
        axios.get('warehouses')
            .then(response => {
                setWarehouses(response.data.data);
                setTotalWarehouses(response.data.data.length);
            })
            .catch(error => {
                console.error('There was an error fetching the warehouses!', error);
            });
    }, []);

    return (
        <div className="dashboard" style={{ marginTop: "-50px" }}>
            <Container>
                <header className="text-center mt-4 mb-4">
                    <h1>Role Management Dashboard</h1>
                </header>
                <Row className="mb-2">
                    <Col sm={3}>
                        <Card className="stat-card">
                            <Card.Body>
                                <Card.Title>Total Warehouses</Card.Title>
                                <Card.Text>{totalWarehouses}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={3}>
                        <Card className="stat-card">
                            <Card.Body>
                                <Card.Title>Total Users</Card.Title>
                                <Card.Text>50</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={3}>
                        <Card className="stat-card">
                            <Card.Body>
                                <Card.Title>Admin</Card.Title>
                                <Card.Text>10</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={3}>
                        <Card className="stat-card">
                            <Card.Body>
                                <Card.Title>Manage</Card.Title>
                                <Card.Text>50</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Card className="mb-1">
                            <Card.Body>
                                <Card.Title>List of Warehouses</Card.Title>
                                <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                    <Table striped bordered>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {warehouses.map((warehouse) => (
                                                <tr key={warehouse.id}>
                                                    <td>{warehouse.id}</td>
                                                    <td>{warehouse.name}</td>
                                                    <td>{warehouse.address}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>Top 5 Items by Quantity</Card.Title>
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
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>User Roles</Card.Title>
                                <Table striped bordered>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Example data */}
                                        <tr>
                                            <td>1</td>
                                            <td>John Doe</td>
                                            <td>john.doe@example.com</td>
                                            <td>Admin</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Jane Smith</td>
                                            <td>jane.smith@example.com</td>
                                            <td>Manager</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>John Doe</td>
                                            <td>john.doe@example.com</td>
                                            <td>Admin</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Jane Smith</td>
                                            <td>jane.smith@example.com</td>
                                            <td>Manager</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>John Doe</td>
                                            <td>john.doe@example.com</td>
                                            <td>Manager</td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>Jane Smith</td>
                                            <td>jane.smith@example.com</td>
                                            <td>Admin</td>
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td>John Doe</td>
                                            <td>john.doe@example.com</td>
                                            <td>Admin</td>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td>John Doe</td>
                                            <td>john.doe@example.com</td>
                                            <td>Manager</td>
                                        </tr>
                                        <tr>
                                            <td>9</td>
                                            <td>John Doe</td>
                                            <td>john.doe@example.com</td>
                                            <td>Admin</td>
                                        </tr>
                                        <tr>
                                            <td>10</td>
                                            <td>John Doe</td>
                                            <td>john.doe@example.com</td>
                                            <td>Manager</td>
                                        </tr>
                                        {/* Add more rows as needed */}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RoleManagementDashboard;
