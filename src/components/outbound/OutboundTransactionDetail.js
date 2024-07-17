import React, { useState, useEffect, useRef } from "react";
import MyAxios from "../../util/MyAxios";
import { Table, Stack, Badge, Button, Alert, Form } from "react-bootstrap";
// import { Printer } from "react-bootstrap-icons";
import defaultProductImage from "./defaultProductImage.jpg";
import ChangeStatus from "./ChangeStatus";

export default function OutboundTransactionDetail(props) {
  const [transactionInfo, setTransactionInfo] = useState({});
  const [details, setDetails] = useState([]);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const printRef = useRef();

  useEffect(() => {
    const fetchTransactionInfo = async () => {
      const tempInfo = { ...props.transaction };
      tempInfo.maker = props?.userList.find((user) => user.id == tempInfo.maker_id);
      tempInfo.warehouse = props.warehouseList.find(
        (warehouse) => warehouse.id == tempInfo.warehouse_id
      );
      setTransactionInfo(tempInfo);
    };

    const fetchDetails = async () => {
      await MyAxios.get(`outbound_transaction_details?transaction_id=${props.transaction.id}`)
        .then((res) => {
          if (res.status === 200) {
            const detailListResponse = res.data.data;
            const detailList = [];
            detailListResponse.forEach((detail) => {
              const itemInfo = props.itemList.find((itemx) => itemx.id == detail.item_id);
              detailList.push({
                ...detail,
                item: itemInfo,
                product: props.productList.find((prd) => prd.id == itemInfo?.product_id),
                zone: props.zoneList.find((zonex) => zonex.id == detail.zone_id),
              });
            });

            setDetails(detailList);
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

  return (
    checkFilterProduct() && (
      <Alert>
        <div ref={printRef}>
          {showMore && (
            <>
              <div className="print-header mb-3 text-center font-weight-bold">OUTBOUND TRANSACTION</div>
            </>)}
          <div className="d-flex flex-row">

            <div>
              <Stack direction="horizontal" gap={2} className="mb-2 pe-5">
                <Badge bg="primary">{`Date: ${transactionInfo.date}`}</Badge>
                <Badge bg="success">{`Maker: ${transactionInfo.maker?.name}`}</Badge>
                <Badge bg="info" text="dark">{`Status: ${transactionInfo.status}`}</Badge>
              </Stack>
              <Stack direction="horizontal" gap={2} className="mb-2 pe-5">
                <Badge bg="warning" text="dark">
                  {`Destination: ${transactionInfo.destination}`}
                </Badge>
                <Badge bg="success">{`Warehouse: ${transactionInfo.warehouse?.name}`}</Badge>
              </Stack>
            </div>
            {transactionInfo.status !== "canceled" && transactionInfo.status !== "completed" && (
              <div className="my-auto ms-auto me-3">
                <Button size="sm" onClick={() => setShowStatusModal(true)}>
                  Update Status
                </Button>
              </div>
            )}
            <Form.Check className="my-auto ms-auto me-3" // prettier-ignore
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
                    <th>Expire date</th>
                    <th>Quantity</th>
                    <th>Zone</th>
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
                        <td>{detail.zone?.name}</td>
                      </>
                    )}
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
        ></ChangeStatus>
      </Alert>
    )
  );
}
