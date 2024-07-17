import React, { useState, useEffect, useRef } from "react";
import MyAxios from "../../util/MyAxios";
import { Table, Stack, Badge, Button, Alert, Form } from "react-bootstrap";
import defaultProductImage from "./defaultProductImage.jpg";
import ChangeStatus from "./ChangeStatus";

export default function InternalTransactionDetail(props) {
  const [transactionInfo, setTransactionInfo] = useState({});
  const [details, setDetails] = useState([]);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [shouldDisplayOutbound, setShouldDisplayOutbound] = useState(false);
  const [canOnlyCancel, setCanOnlyCancel] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSourceWarehouse, setIsSourceWarehouse] = useState(false);
  const [isDestinationWarehouse, setIsDestinationWarehouse] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const printRef = useRef();

  useEffect(() => {
    const fetchTransactionInfo = async () => {
      const tempInfo = { ...props.transaction };
      tempInfo.maker = props?.userList.find(
        (user) => user.id == tempInfo.maker_id
      );
      tempInfo.sourceWarehouse = props.warehouseList.find(
        (warehouse) => warehouse.id == tempInfo.source_warehouse
      );
      tempInfo.destinationWarehouse = props.warehouseList.find(
        (warehouse) => warehouse.id == tempInfo.destination_warehouse
      );
      setTransactionInfo(tempInfo);
    };

    const fetchDetails = async () => {
      await MyAxios.get(
        `internal_transaction_details?transaction_id=${props.transaction.id}`
      )
        .then((res) => {
          if (res.status === 200) {
            const detailListResponse = res.data.data;
            const detailList = [];
            detailListResponse.forEach((detail) => {
              const itemInfo = props.itemList.find(
                (itemx) => itemx.id == detail.item_id
              );
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
            const isAdminUser = loggingUser.role === "admin";
            setIsAdmin(isAdminUser);
            const hasDestinationZone = detailList.some((detail) => detail.zone);
            const userIsSourceWarehouse =
              loggingUser.warehouse_id == props.transaction.source_warehouse;
            setIsSourceWarehouse(userIsSourceWarehouse);
            const userIsDestinationWarehouse =
              loggingUser.warehouse_id ==
              props.transaction.destination_warehouse;
            setIsDestinationWarehouse(userIsDestinationWarehouse);

            const isInbound = props.transaction.type === "inbound";
            const isPending = props.transaction.status === "pending";

            const shouldDisplayDetails =
              isAdminUser || !isInbound || !userIsSourceWarehouse || !isPending;

            const shouldDisplayDetailsOutbound =
              isAdminUser || hasDestinationZone || userIsSourceWarehouse;

            setShouldDisplay(shouldDisplayDetails);
            setShouldDisplayOutbound(shouldDisplayDetailsOutbound);
            setCanOnlyCancel(
              !hasDestinationZone && !isAdminUser && userIsSourceWarehouse
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

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  if (!shouldDisplay || !shouldDisplayOutbound || !checkFilterProduct()) {
    return null;
  }

  return (
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
                  <Button onClick={handlePrint}>  <i className="bi bi-printer"></i></Button>

        </div>
<div className="pt-3">
        <Table size="sm" striped responsive >
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
                </>
              )}
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
                      <td>{detail.source?.name}</td>
                      <td>{detail.zone?.name}</td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </Table>
        </div>
      </div>
     
      <ChangeStatus
        show={showStatusModal}
        setShow={setShowStatusModal}
        transaction={transactionInfo}
        triggerRender={props.triggerRender}
        canOnlyCancel={canOnlyCancel}
        isAdmin={isAdmin}
        isDestinationWarehouse={isDestinationWarehouse}
      ></ChangeStatus>
    </Alert>
  );
}
