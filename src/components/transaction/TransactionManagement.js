import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import InboundTransactionList from "../inbound/InboundTransactionList";

export default function TransactionManagement() {
  // STYLE
  const myNavStyle = {
    fontSize: "1.1rem",
    marginRight: "32px",
    cursor: "pointer",
  };

  const myActiveNavStyle = {
    fontSize: "1.15rem",
    marginRight: "32px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  // STATEs
  const [itemList, setItemList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [zoneList, setZoneList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);

  const [page, setPage] = useState("inbound"); //only inbound, outbound, internal

  //   fetch ItemList
  useEffect(() => {
    const fetchItems = async () => {
      await MyAxios.get("items")
        .then((res) => {
          if (res.status === 200) {
            setItemList(res.data.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchItems();
  }, []);

  //    fet ProductList
  useEffect(() => {
    const fetchProduct = async () => {
      await MyAxios.get("products")
        .then((res) => {
          if (res.status === 200) {
            setProductList(res.data.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchProduct();
  }, []);

  //    fet User
  useEffect(() => {
    const fetchUser = async () => {
      await MyAxios.get("users")
        .then((res) => {
          if (res.status === 200) {
            setUserList(res.data.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchUser();
  }, []);

  //    fet Zone
  useEffect(() => {
    const fetchZone = async () => {
      await MyAxios.get("zones")
        .then((res) => {
          if (res.status === 200) {
            setZoneList(res.data.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchZone();
  }, []);

  //    fet Warehouse
  useEffect(() => {
    const fetchWarehouse = async () => {
      await MyAxios.get("warehouses")
        .then((res) => {
          if (res.status === 200) {
            setWarehouseList(res.data.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchWarehouse();
  }, []);

  return (
    <Container>
      {/*  Navbar */}
      <div className="">
        <label
          style={page === "inbound" ? myActiveNavStyle : myNavStyle}
          onClick={() => {
            setPage("inbound");
          }}
        >
          Inbound Transaction
        </label>
        <label
          style={page === "outbound" ? myActiveNavStyle : myNavStyle}
          onClick={() => {
            setPage("outbound");
          }}
        >
          Outbound Transaction
        </label>
        <label
          style={page === "internal" ? myActiveNavStyle : myNavStyle}
          onClick={() => {
            setPage("internal");
          }}
        >
          Internal Transaction
        </label>
      </div>
      <hr />
      <div className="">
        {page === "inbound" && (
          <InboundTransactionList
            itemList={itemList}
            productList={productList}
            userList={userList}
            zoneList={zoneList}
            warehouseList={warehouseList}
          />
        )}
      </div>
    </Container>
  );
}