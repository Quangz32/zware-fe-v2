import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import InternalTransactionDetail from "./InternalTransactionDetail";
import MyAxios from "../../util/MyAxios";
import CreateInternalTransaction from "./CreateInternalTransaction";

// props: transactions, productList, itemList, userList, zoneList, warehouseList, filter
export default function InternalTransactionList(props) {
  const [transactionList, setTransactionList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

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
        className="mb-4"
        onClick={() => {
          setShowAddModal(true);
        }}
      >
        <i className="bi bi-file-earmark-plus-fill me-2"></i>New Internal
        Transaction
      </Button>

      {transactionList.map((transaction) => {
        const startDate = new Date(props.filter?.start_date);
        const endDate = new Date(props.filter?.end_date);
        const transactionDate = new Date(transaction.date);

        if (!isNaN(startDate) && startDate > transactionDate) {
          return;
        }

        if (!isNaN(endDate) && endDate < transactionDate) {
          return;
        }

        if (
          props.filter?.status !== "all" &&
          transaction.status !== props.filter?.status
        ) {
          return;
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
      ></CreateInternalTransaction>
    </div>
  );
}
