import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import axios from '../../util/MyAxios';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [managerWarehouses, setManagerWarehouses] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [warehouseItems, setWarehouseItems] = useState([]);
    const [items, setItems] = useState([]);
    const [productQuantities, setProductQuantities] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [totalTransactions, setTotalTransactions] = useState(0);

    useEffect(() => {
        axios.get('users')
            .then(response => {
                const allUsers = response.data.data;
                const adminUsers = allUsers.filter(user => user.role === 'admin');
                setAdmins(adminUsers);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    useEffect(() => {
        axios.get('users/me')
            .then(response => {
                setUser(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the user!', error);
            });
    }, []);

    useEffect(() => {
        if (user) {
            axios.get(`users/${user.id}/warehouse`)
                .then(response => {
                    setManagerWarehouses(response.data.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the manager warehouses!', error);
                });

            axios.get('goodsdisposal')
                .then(response => {
                    const goodsDisposals = response.data.data;
                    const userGoodsDisposals = goodsDisposals.filter(item => item.maker_id === user.id);
                    const totalGoodsDisposal = userGoodsDisposals.length;

                    axios.get('inbound_transactions')
                        .then(response => {
                            const inboundTransactions = response.data.data;
                            const userInboundTransactions = inboundTransactions.filter(item => item.maker_id === user.id);
                            const totalInboundTransactions = userInboundTransactions.length;

                            axios.get('outbound_transactions')
                                .then(response => {
                                    const outboundTransactions = response.data.data;
                                    const userOutboundTransactions = outboundTransactions.filter(item => item.maker_id === user.id);
                                    const totalOutboundTransactions = userOutboundTransactions.length;

                                    setTotalTransactions(totalGoodsDisposal + totalInboundTransactions + totalOutboundTransactions);
                                })
                                .catch(error => {
                                    console.error('There was an error fetching the outbound transactions!', error);
                                });
                        })
                        .catch(error => {
                            console.error('There was an error fetching the inbound transactions!', error);
                        });
                })
                .catch(error => {
                    console.error('There was an error fetching the goods disposal!', error);
                });
        }
    }, [user]);

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
            })
            .catch(error => {
                console.error('There was an error fetching the warehouses!', error);
            });
    }, []);

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
            <style>
                {`
                    .scrollable-table {
                        max-height: 200px; /* Adjust the height as needed */
                        overflow-y: auto;
                    }
                `}
            </style>
            <Container>
                <header className="text-center mt-4 mb-4">
                    <h1>Warehouse Management Dashboard</h1>
                </header>
                <Row className="mb-4">
                    <Col sm={6}>
                        <Card className="stat-card">
                            <Card.Body>
                                <Card.Title>Total Products</Card.Title>
                                <Card.Text>{products.length}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6}>
                        <Card className="stat-card">
                            <Card.Body>
                                <Card.Title>Total Transaction</Card.Title>
                                <Card.Text>{totalTransactions}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                </Row>
                <Row>
                    <Col sm={6}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>Warehouse Details</Card.Title><br/>
                                <Card.Text>
                                    <>
                                        <strong>Name: </strong> {managerWarehouses.name} <br />
                                        <strong>ID: </strong> {managerWarehouses.id} <br />
                                        <strong>Address: </strong> {managerWarehouses.address}
                                    </>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>Admin Information</Card.Title>
                                <div className="scrollable-table">
                                    <Table striped bordered>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {admins.map(admin => (
                                                <tr key={admin.id}>
                                                    <td>{admin.id}</td>
                                                    <td>{admin.name}</td>
                                                    <td>{admin.email}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6}>
                        <Card className="mb-4">
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
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;
