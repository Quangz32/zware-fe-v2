import React, { useEffect, useState } from 'react';
import axios from '../../util/MyAxios';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

const RoleManagementDashboard = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [totalWarehouses, setTotalWarehouses] = useState(0);
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [totalManagers, setTotalManagers] = useState(0);
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);


    useEffect(() => {
        axios.get('categories')
            .then(response => {
                setCategory(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the categories!', error);
            });
    }, []);


    useEffect(() => {
        axios.get('products')
            .then(response => {
                setProduct(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

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
    useEffect(() => {
        axios.get('users')
            .then(response => {
                const userData = response.data.data;
                setUsers(userData.slice(0, 10)); // Display first 10 users
                setTotalUsers(userData.length);

                // Count admins and managers
                const admins = userData.filter(user => user.role === 'admin');
                const managers = userData.filter(user => user.role === 'manager');
                setTotalAdmins(admins.length);
                setTotalManagers(managers.length);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
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
                                <Card.Text>{totalUsers}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={3}>
                        <Card className="stat-card">
                            <Card.Body>
                                <Card.Title>Total Admins</Card.Title>
                                <Card.Text>{totalAdmins}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={3}>
                        <Card className="stat-card">
                            <Card.Body>
                                <Card.Title>Total Managers</Card.Title>
                                <Card.Text>{totalManagers}</Card.Text>
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
                                <Card.Title>Top 5 Product by Quantity</Card.Title>
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
                                        {product.slice(0, 5).map((product) => (
                                            <tr key={product.id}>
                                                <td>{product.id}</td>
                                                <td>{product.name}</td>
                                                <td>{product.category_id}</td>
                                                <td>{product.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>List of Users</Card.Title>
                                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
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
                                            {users.map((user) => (
                                                <tr key={user.id}>
                                                    <td>{user.id}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.role}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RoleManagementDashboard;