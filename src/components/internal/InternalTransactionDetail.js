
import React, { useState, useEffect, useRef } from "react";
import MyAxios from "../../util/MyAxios";
import { Table, Stack, Badge, Button, Alert, Form } from "react-bootstrap";
import defaultProductImage from "./defaultProductImage.jpg";
import ChangeStatus from "./ChangeStatus";

// props: itemList, productList, userList, zoneList, transaction, filter, triggerRender, warehouseList
export default function InternalTransactionDetail(props) {
  const [transactionInfo, setTransactionInfo] = useState({});
  const [details, setDetails] = useState([]);
  const [showStatusModal, setShowStatusModal] = useState(false);
    const [shouldDisplayOutbound, setShouldDisplayOutbound] = useState(false);

  const [shouldDisplay, setShouldDisplay] = useState(false);
const [canOnlyCancel, setCanOnlyCancel] = useState(false);
const [showMore, setShowMore] = useState(false);

const printRef = useRef();

  useEffect(() => {
    const fetchTransactionInfo = async () => {
      const tempInfo = { ...props.transaction };
      tempInfo.maker = props?.userList.find((user) => user.id == tempInfo.maker_id);
      tempInfo.sourceWarehouse = props.warehouseList.find(
        (warehouse) => warehouse.id == tempInfo.source_warehouse
      );
      tempInfo.destinationWarehouse = props.warehouseList.find(
        (warehouse) => warehouse.id == tempInfo.destination_warehouse
      );
      setTransactionInfo(tempInfo);
    };

    const fetchDetails = async () => {
      await MyAxios.get(`internal_transaction_details?transaction_id=${props.transaction.id}`)
        .then((res) => {
          if (res.status === 200) {
            const detailListResponse = res.data.data;
            const detailList = []; //save full data
            detailListResponse.forEach((detail) => {
              const itemInfo = props.itemList.find((itemx) => itemx.id == detail.item_id);
              detailList.push({
                ...detail,
                item: itemInfo,
                product: props.productList.find(
                  (prd) => prd.id == itemInfo?.product_id
                ),
                zone: props.zoneList.find(
                  (zonex) => zonex.id == detail.destination_zone
                ),
                source: props.zoneList.find(
                  (zonex) => zonex.id == detail.source_zone
                ),
              });
            });

            setDetails(detailList);

            const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
            const isAdmin = loggingUser.role === "admin";
            const hasDestinationZone = detailList.some((detail) => detail.zone);
            const userWarehouseMatches =
              loggingUser.warehouse_id == props.transaction.source_warehouse;

            setShouldDisplay(
              hasDestinationZone || isAdmin || userWarehouseMatches
            );
            setCanOnlyCancel(
              !hasDestinationZone && !isAdmin && userWarehouseMatches
            );
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchTransactionInfo();
    fetchDetails();
  }, [props]);

  const checkFilterProduct = () => {
    if (props.filter.product_name === "") return true;
    let passFilter = false;
    details?.forEach((detail) => {
      if (detail.product.name == props.filter.product_name) {
        passFilter = true;
      }
    });
    return passFilter;
  };

   if (!shouldDisplay) {
     return null;
   }

   const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    checkFilterProduct() && (
      <Alert>
<div ref={printRef}>
{showMore && (
                <>
        <div className="print-header mb-3 text-center font-weight-bold">INTERNAL TRANSACTION</div>
      </> )}
        <div className="d-flex flex-row">
          <div>
            <Stack direction="horizontal" gap={2} className="mb-2 pe-5">
              <Badge bg="primary">{`Date: ${transactionInfo.date}`}</Badge>
              <Badge bg="success">{`Maker: ${transactionInfo.maker?.name}`}</Badge>
              <Badge bg="info" text="dark">
                {`Status: ${
                  transactionInfo.status === "pending"
                    ? "Pending"
                    : transactionInfo.status === "shipping"
                    ? "Shipping"
                    : transactionInfo.status === "completed"
                    ? "Completed"
                    : "Canceled"
                }`}
              </Badge>
            </Stack>
            <Stack direction="horizontal" gap={2} className="mb-2 pe-5">
              <Badge bg="warning" text="dark">
                {`Type: ${
                  transactionInfo.type === "inbound" ? "Inbound" : "Outbound"
                }`}
              </Badge>
              <Badge bg="secondary">{`Source: ${transactionInfo.sourceWarehouse?.name}`}</Badge>
              <Badge bg="dark">{`Destination: ${transactionInfo.destinationWarehouse?.name}`}</Badge>
            </Stack>
          </div>
          {transactionInfo.status !== "canceled" &&
            transactionInfo.status !== "completed" && (
              <div className="my-auto ms-auto me-3">
                <Button size="sm" onClick={() => setShowStatusModal(true)}>
                  Update Status
                </Button>
              </div>
            )}
            <Form.Check className="my-auto ms-auto me-3"
            type="switch"
            id="custom-switch"
            label="Show more"
            onClick={(e) => {
              setShowMore(e.target.checked);
            }}
          />
               <Button variant="outline-secondary" className="my-auto ms-3" onClick={handlePrint}> <i className="bi bi-printer"></i>
               </Button>
        </div>

        <Table size="sm" striped responsive>
          <thead>
            <tr>
            {showMore && (
                <>
     
              <th>#</th>
              <th>Product</th>
              <th>Image</th>
              <th>Expire Date</th>
              <th>Quantity</th>
              <th>Source Zone</th>
              <th>Destination Zone</th>
              </> )}
              {/* {transactionInfo.type === "inbound" && <th>Destination Zone</th>}
              {transactionInfo.type === "outbound" && <th>Source Zone</th>} */}
            </tr>
          </thead>
          <tbody>
            {details?.length > 0 &&
              details?.map((detail, index) => (
                <tr key={detail.id}>
                     {showMore && (
                <>
                  <td>{index + 1}</td>
                  <td>{detail.product?.name}</td>
                  <td>
                    <img
                      height={50}
                      width={50}
                      src={
                        detail.product?.image
                          ? `http://localhost:2000/imageproducts/${detail.product?.image}`
                          : defaultProductImage
                      }
                    ></img>
                  </td>
                  <td>{detail.item?.expire_date}</td>
                  <td>{detail.quantity}</td>
                  {/* {transactionInfo.type === "outbound" && (
                    <td>{detail.source?.name}</td>
                  )} */}
                  <td>{detail.source?.name}</td>
                  {/* {transactionInfo.type === "inbound" && (
                    <td>{detail.zone?.name}</td>
                  )} */}
                  <td>{detail.zone?.name}</td>
                  </> )}
                </tr>
              ))}
          </tbody>
        </Table>
        </div>
        <ChangeStatus
          show={showStatusModal}
          setShow={setShowStatusModal}
          transaction={transactionInfo}
          triggerRender={props.triggerRender}
          canOnlyCancel={canOnlyCancel}
        ></ChangeStatus>
      </Alert>
      
    )
  );
}