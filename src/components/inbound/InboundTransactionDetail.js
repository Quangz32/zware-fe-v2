import React, { useState, useEffect } from "react";
import MyAxios from "../../util/MyAxios";
import { Table, Stack, Badge, Button, Alert, Form } from "react-bootstrap";
import defaultProductImage from "./defaultProductImage.jpg";
import ChangeStatus from "./ChangeStatus";
import TransactionPDF from "./TransactionPDF";
import { PDFDownloadLink } from '@react-pdf/renderer';

//props: itemList, productList, userList, zoneList, transaction, filter, triggerRender
export default function InboundTransactionDetail(props) {
  const [transactionInfo, setTransactionInfo] = useState({});
  const [details, setDetails] = useState([]);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isSourceWarehouse, setIsSourceWarehouse] = useState(false);
  const [isDestinationWarehouse, setIsDestinationWarehouse] = useState(false);
  const [showMore, setShowMore] = useState(false);
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
      await MyAxios.get(`inbound_transaction_details?transaction_id=${props.transaction.id}`)
        .then((res) => {
          if (res.status === 200) {
            const detailListResponse = res.data.data;
            const detailList = []; //save full data
            detailListResponse.forEach((detail) => {
              // console.log(detail);
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

  return (
    checkFilterProduct() && (
      <Alert>
        <div className="d-flex flex-row">
          <div>
            {" "}
            <Stack direction="horizontal" gap={2} className="mb-2 pe-5">
              <Badge bg="primary">{`Date: ${transactionInfo.date}`}</Badge>
              <Badge bg="success">{`Maker: ${transactionInfo.maker?.name}`}</Badge>
              <Badge bg="info" text="dark">{`Status: ${transactionInfo.status}`}</Badge>
            </Stack>
            <Stack direction="horizontal" gap={2} className="mb-2 pe-5">
              <Badge bg="warning" text="dark">
                {`Source: ${transactionInfo.source}`}
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
             <PDFDownloadLink className="my-auto ms-3" 
            document={
              <TransactionPDF transaction={transactionInfo} details={details} />
            }
            fileName={`transaction_${transactionInfo.id}.pdf`}
          >
            <Button variant="outline-secondary" className="my-auto ms-3" >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "PDF"
            } <i className="bi bi-printer"></i>
            </Button>
          </PDFDownloadLink>
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
              </>)}
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
                  </>)}
                </tr>
              ))}
          </tbody>
        </Table>
        <ChangeStatus
          show={showStatusModal}
          setShow={setShowStatusModal}
          transaction={transactionInfo}
          triggerRender={props.triggerRender}
        ></ChangeStatus>
        {/* {JSON.stringify(details)} */}
      </Alert>
    )
  );
}
