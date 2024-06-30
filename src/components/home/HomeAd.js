import React, { useEffect, useState } from 'react';
import axios from '../../util/MyAxios';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

const AdDashboard = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [totalWarehouses, setTotalWarehouses] = useState(0);
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [totalManagers, setTotalManagers] = useState(0);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [warehouseItems, setWarehouseItems] = useState([]);
    const [items, setItems] = useState([]);
    const [productQuantities, setProductQuantities] = useState([]);

    useEffect(() => {
        axios.get('warehouseitems')
            .then(response => {
                setWarehouseItems(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the warehouse items!', error);
            });
    }, []);

    useEffect(() => {
        axios.get('categories')
            .then(response => {
                setCategories(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the categories!', error);
            });
    }, []);

    useEffect(() => {
        axios.get('products')
            .then(response => {
                setProducts(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    useEffect(() => {
        axios.get('items')
            .then(response => {
                setItems(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the items!', error);
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

    useEffect(() => {
        if (warehouseItems.length && items.length && products.length) {
            const productQuantityMap = warehouseItems.reduce((acc, warehouseItem) => {
                const item = items.find(item => item.id === warehouseItem.item_id);
                if (item) {
                    const product = products.find(product => product.id === item.product_id);
                    if (product) {
                        if (!acc[product.id]) {
                            acc[product.id] = { ...product, quantity: 0 };
                        }
                        acc[product.id].quantity += warehouseItem.quantity;
                    }
                }
                return acc;
            }, {});

            const sortedProductQuantities = Object.values(productQuantityMap).sort((a, b) => b.quantity - a.quantity);
            setProductQuantities(sortedProductQuantities.slice(0, 5));
        }
    }, [warehouseItems, items, products]);

    const getCategoryName = (categoryId) => {
        const categoryObj = categories.find(cat => cat.id === categoryId);
        return categoryObj ? categoryObj.name : 'Unknown Category';
    };

    return (
        <div style={{ marginTop: "-50px" }}>
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
                                <Card.Title>Top 5 Products by Quantity</Card.Title>
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
                                        {productQuantities.map((product) => (
                                            <tr key={product.id}>
                                                <td>{product.id}</td>
                                                <td>{product.name}</td>
                                                <td>{getCategoryName(product.category_id)}</td>
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

export default AdDashboard;
