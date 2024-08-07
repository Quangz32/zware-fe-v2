import React, { useState, useEffect } from "react";

import MyAxios from "../../util/MyAxios";
import InboundTransactionList from "../inbound/InboundTransactionList";
// import TransactionFilter from "./TransactionFilter";
import OutboundTransactionList from "../outbound/OutboundTransactionList";
import WarehouseHistory from "../history/WarehouseHistory";
import Statistics from "../statistics/Statistics";
export default function Report() {

  const [username, setUsername] = useState("");


  const fetchUsername = () => {
    MyAxios.get("/users/me")
      .then((response) => {
        const nameData = response.data.data;
        setUsername(nameData.name);
      })
      .catch((error) => {
        console.error("Error fetching username:", error);
        setUsername("Error");
      });
  };
  const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));

  useEffect(() => {
    if (loggingUser && loggingUser.id) {
      fetchUsername();
    }
  }, [loggingUser?.id]);


  useEffect(() => {
    fetchUsername();
  }, []);

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

  const [filter, setFilter] = useState({
    start_date: "",
    end_date: "",
    product_name: "",
    product_image: "", //TO SHOW only
    status: "all", //all, pending, shipping, completed, canceled
  });

  const [page, setPage] = useState("history"); //only inbound, outbound, internal

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
    <>
      <div className="d-flex flex-row">
        <div className="me-3 " style={{ width: "10%" }}>

        </div>

        <div style={{ width: "80%" }}>
          {/*  Navbar */}
          <div className="">
            <label
              style={page === "history" ? myActiveNavStyle : myNavStyle}
              onClick={() => {
                setPage("history");
              }}
            >
              History
            </label>
            <label
              style={page === "outbound" ? myActiveNavStyle : myNavStyle}
              onClick={() => {
                setPage("outbound");
              }}
            >
              Report
            </label>

          </div>
          <hr />
          <div className="">
            {page === "history" && (
              <WarehouseHistory
                itemList={itemList}
                productList={productList}
                userList={userList}
                zoneList={zoneList}
                warehouseList={warehouseList}
                filter={filter}
              />
            )}
            {page === "outbound" && (
              <Statistics
                itemList={itemList}
                productList={productList}
                userList={userList}
                zoneList={zoneList}
                warehouseList={warehouseList}
                filter={filter}
              />
            )}


          </div>
        </div>
      </div>
    </>
  );
}
