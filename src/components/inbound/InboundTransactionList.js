import React, { useState, useEffect } from "react";
import { Alert, Button, Nav, TabContainer, TabContent } from "react-bootstrap";
import InboundTransactionDetail from "./InboundTransactionDetail";
import MyAxios from "../../util/MyAxios";
import CreateInboundTransaction from "./CreateInboundTransaction";

//props: transactions
export default function InboundTransactionList(props) {
  const [transactionList, setTransactionList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  //fetch TransactionList
  useEffect(() => {
    const fetchTransactionListByRole = async () => {
      const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
      const endpoint =
        loggingUser.role === "admin"
          ? "inbound_transactions"
          : `inbound_transactions?warehouse_id=${loggingUser?.warehouse_id}`;

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
  }, []);

  return (
    <div>
      <Button
        className="mb-4"
        onClick={() => {
          setShowAddModal(true);
        }}
      >
        <i className="bi bi-file-earmark-plus-fill me-2"></i>New Inbound Transaction
      </Button>

      {/* TRANSACTION LIST */}
      {transactionList.map((transaction) => (
        <Alert key={transaction.id}>
          <InboundTransactionDetail
            productList={props.productList}
            itemList={props.itemList}
            userList={props.userList}
            zoneList={props.zoneList}
            warehouseList={props.warehouseList}
            transaction={transaction}
          />
        </Alert>
      ))}

      {/* ADD MODAL */}
      <CreateInboundTransaction
        show={showAddModal}
        setShow={setShowAddModal}
        warehouseList={props.warehouseList}
      ></CreateInboundTransaction>
    </div>
  );
}
