import React, { useState, useEffect } from "react";
import { Alert, Nav, TabContainer, TabContent } from "react-bootstrap";
import InboundTransactionDetail from "./InboundTransactionDetail";
import MyAxios from "../../util/MyAxios";

//props: transactions
export default function InboundTransactionList(props) {
  const [transactionList, setTransactionList] = useState([]);

  //fetch TransactionList
  useEffect(() => {
    const fetchTransactionList = async () => {
      await MyAxios.get("inbound_transactions")
        .then((res) => {
          if (res.status === 200) {
            setTransactionList(res.data.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchTransactionList();
  }, []);

  return (
    <div>
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
    </div>
  );
}
