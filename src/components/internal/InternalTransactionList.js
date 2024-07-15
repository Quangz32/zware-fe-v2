import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Table, Alert } from "react-bootstrap";
import InternalTransactionDetail from "./InternalTransactionDetail";
import MyAxios from "../../util/MyAxios";
import CreateInternalTransaction from "./CreateInternalTransaction";
import CreateOutboundTransaction from "./CreateOutboundTransaction";
import UpdateOutboundTransaction from "./UpdateOutboundTransaction";
import CreateInboundTransaction from "./CreateInboundTransaction";

// CSS filter
const filterStyles = {
  filterContainer: {
    background: "#f8f9fa",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  filterLabel: {
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#495057",
  },
  filterSelect: {
    borderColor: "#ced4da",
    borderRadius: "4px",
    padding: "8px 12px",
    fontSize: "14px",
    width: "100%",
    maxWidth: "300px",
  },
};

// props: transactions, productList, itemList, userList, zoneList, warehouseList, filter
export default function InternalTransactionList(props) {
  const [transactionList, setTransactionList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [showIncomingModal, setShowIncomingModal] = useState(false);
   const [selectedOrder, setSelectedOrder] = useState(null);
   const [selectedTransaction, setSelectedTransaction] = useState(null)
   const [showInboundModal, setShowInboundModal] = useState(false);
   const [showOutboundModal, setShowOutboundModal] = useState(false);
   const [showInbound, setShowInbound] = useState(false);

  const [renderTrigger, setRenderTrigger] = useState(false);
  const triggerRender = () => {
    setRenderTrigger(!renderTrigger);
  };
  const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
   const isAdmin = loggingUser.role === "admin";

   
  useEffect(() => {
    const fetchTransactionListByRole = async () => {
      const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
      const endpoint =
        loggingUser.role === "admin"
          ? "internal_transactions"
          : `internal_transactions?warehouse_id=${loggingUser?.warehouse_id}`;

      await MyAxios.get(endpoint)
        .then((res) => {
          if (res.status === 200) {
            setTransactionList(res.data.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchTransactionListByRole();
  }, [props, renderTrigger]);

  const fetchIncomingOrders = async () => {
    const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
    let endpoint;

    if (loggingUser.role === "admin") {
      endpoint = "internal_transactions/all_outbound";
    } else {
      endpoint = `internal_transactions/outbound?warehouse_id=${loggingUser?.warehouse_id}`;
    }

    try {
      const response = await MyAxios.get(endpoint);
      if (response.status === 200) {
        setIncomingOrders(response.data.data);
        setShowIncomingModal(true);
      }
    } catch (error) {
      console.error("Error fetching incoming orders:", error);
    }
  };
  const handleConfirmInbound = async (order) => {
    try {
      const detailsResponse = await MyAxios.get(
        `internal_transaction_details?transaction_id=${order.id}`
      );
      const transactionResponse = await MyAxios.get(
        `internal_transactions/${order.id}`
      );

      if (
        detailsResponse.status === 200 &&
        transactionResponse.status === 200
      ) {
        setSelectedOrder({ ...detailsResponse.data });
        setSelectedTransaction({ ...transactionResponse.data });
        setShowIncomingModal(false);
        setShowInboundModal(true);
      }
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    }
  };

  const handleCancelInbound = async (order) => {
    // Implement cancel logic here
    console.log("Cancelled order:", order);
  };

  useEffect(() => {
     if (selectedOrder) {
       setShowInboundModal(true);
     }
    console.log("Selected Order updated:", selectedOrder);
  }, [selectedOrder]);
  

  const IncomingOrdersModal = ({
    show,
    onHide,
    orders,
    onConfirm,
    onCancel,
    isAdmin,
  }) => {
    const getWarehouseName = (warehouseId) => {
      const warehouse = props.warehouseList.find((w) => w.id == warehouseId);
      return warehouse ? warehouse.name : "Unknown";
    };

    return (
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Incoming Warehouse Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orders.length === 0 ? (
            <Alert variant="info">
              There are no incoming orders at the moment.
            </Alert>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Source Warehouse</th>
                  {isAdmin && <th>Destination Warehouse</th>}
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{getWarehouseName(order.source_warehouse)}</td>
                    {isAdmin && (
                      <td>{getWarehouseName(order.destination_warehouse)}</td>
                    )}
                    <td>{order.date}</td>
                    <td>{order.status}</td>
                    <td>
                      <Button
                        variant="primary"
                        className="me-2"
                        onClick={() => onConfirm(order)}
                      >
                        View
                      </Button>
                      <Button variant="danger" onClick={() => onCancel(order)}>
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div>
      <Button className="mb-4 me-2" onClick={() => setShowOutboundModal(true)}>
        <i className="bi bi-file-earmark-plus-fill me-2"></i>New Outbound
        Transaction
      </Button>
      <Button className="mb-4 me-2" onClick={() => setShowInbound(true)}>
        <i className="bi bi-file-earmark-plus-fill me-2"></i>New Inbound
        Transaction
      </Button>
      <Button className="mb-4" onClick={fetchIncomingOrders}>
        <i className="bi bi-file-earmark-plus-fill me-2"></i>
        {loggingUser.role === "admin"
          ? "View All Incoming Orders"
          : "View Incoming Warehouse Orders"}
      </Button>
      <Button className="mb-4" onClick={fetchIncomingOrders}>
        <i className="bi bi-file-earmark-plus-fill me-2"></i>
        {loggingUser.role === "admin"
          ? "View All Requests from Other Warehouses"
          : "View Requests from Other Warehouses"}
      </Button>

      <div style={filterStyles.filterContainer}>
        <Form.Group>
          <Form.Label style={filterStyles.filterLabel}>
            Filter by Type:
          </Form.Label>
          <Form.Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={filterStyles.filterSelect}
          >
            <option value="all">All</option>
            <option value="inbound">Inbound</option>
            <option value="outbound">Outbound</option>
          </Form.Select>
        </Form.Group>
      </div>

      {transactionList.map((transaction) => {
        const startDate = new Date(props.filter?.start_date);
        const endDate = new Date(props.filter?.end_date);
        const transactionDate = new Date(transaction.date);

        if (!isNaN(startDate) && startDate > transactionDate) {
          return null;
        }

        if (!isNaN(endDate) && endDate < transactionDate) {
          return null;
        }

        if (
          props.filter?.status !== "all" &&
          transaction.status !== props.filter?.status
        ) {
          return null;
        }

        if (typeFilter !== "all" && transaction.type !== typeFilter) {
          return null;
        }

        return (
          <InternalTransactionDetail
            key={transaction.id}
            productList={props.productList}
            itemList={props.itemList}
            userList={props.userList}
            zoneList={props.zoneList}
            warehouseList={props.warehouseList}
            transaction={transaction}
            filter={props.filter}
            triggerRender={triggerRender}
          />
        );
      })}

      <CreateOutboundTransaction
        show={showOutboundModal}
        setShow={setShowOutboundModal}
        warehouseList={props.warehouseList}
        productList={props.productList}
        zoneList={props.zoneList}
        triggerRender={triggerRender}
      />

      <CreateInboundTransaction
        show={showInbound}
        setShow={setShowInbound}
        warehouseList={props.warehouseList}
        productList={props.productList}
        zoneList={props.zoneList}
        triggerRender={triggerRender}
      />

      <UpdateOutboundTransaction
        show={showInboundModal}
        setShow={setShowInboundModal}
        warehouseList={props.warehouseList}
        productList={props.productList}
        zoneList={props.zoneList}
        itemList={props.itemList}
        triggerRender={triggerRender}
        selectedOrder={selectedOrder}
        selectedTransaction={selectedTransaction}
      />

      <IncomingOrdersModal
        show={showIncomingModal}
        onHide={() => setShowIncomingModal(false)}
        orders={incomingOrders}
        onConfirm={handleConfirmInbound}
        onCancel={handleCancelInbound}
        isAdmin={isAdmin}
      />
    </div>
  );
}


//haha