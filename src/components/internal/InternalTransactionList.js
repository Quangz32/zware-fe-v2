import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import InternalTransactionDetail from "./InternalTransactionDetail";
import MyAxios from "../../util/MyAxios";
import CreateInternalTransaction from "./CreateInternalTransaction";

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

  const [renderTrigger, setRenderTrigger] = useState(false);
  const triggerRender = () => {
    setRenderTrigger(!renderTrigger);
  };

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

  return (
    <div>
      <Button
        className="mb-4 me-2"
        onClick={() => {
          setShowAddModal(true);
        }}
      >
        <i className="bi bi-file-earmark-plus-fill me-2"></i>New Outbound
        Transaction
      </Button>
      <Button
        className="mb-4"
        onClick={() => {
          setShowAddModal(true);
        }}
      >
        <i className="bi bi-file-earmark-plus-fill me-2"></i>View Incoming
        Warehouse Orders
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

      <CreateInternalTransaction
        show={showAddModal}
        setShow={setShowAddModal}
        warehouseList={props.warehouseList}
        productList={props.productList}
        zoneList={props.zoneList}
        triggerRender={triggerRender}
      />
    </div>
  );
}
