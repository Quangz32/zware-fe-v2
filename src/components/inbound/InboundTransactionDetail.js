import React, { useState, useEffect } from "react";
import MyAxios from "../../util/MyAxios";
import { Table, Stack, Badge, Button } from "react-bootstrap";
import defaultProductImage from "./defaultProductImage.jpg";
import ChangeStatus from "./ChangeStatus";

//props: itemList, productList, userList, zoneList, transaction
export default function InboundTransactionDetail(props) {
  const [transactionInfo, setTransactionInfo] = useState({});
  const [showStatusModal, setShowStatusModal] = useState(false);

  useEffect(() => {
    const fetchTransactionInfo = () => {
      const tempInfo = { ...props.transaction };
      tempInfo.maker = props?.userList.find((user) => user.id == tempInfo.maker_id);
      tempInfo.warehouse = props.warehouseList.find(
        (warehouse) => warehouse.id == tempInfo.warehouse_id
      );
      tempInfo.details = [];
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
            setTransactionInfo({ ...transactionInfo, details: detailList });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchTransactionInfo();
    fetchDetails();
  }, [props]);

  return (
    <div className="">
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
        <div className="my-auto ms-auto me-3">
          <Button size="sm" onClick={() => setShowStatusModal(true)}>
            Update Status
          </Button>
        </div>
      </div>

      <Table size="sm" striped responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Image</th>
            <th>Expire date</th>
            <th>Quantity</th>
            <th>Zone</th>
          </tr>
        </thead>
        <tbody>
          {transactionInfo.details?.length > 0 &&
            transactionInfo.details.map((detail, index) => (
              <tr key={detail.id}>
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
              </tr>
            ))}
        </tbody>
      </Table>
      <ChangeStatus
        show={showStatusModal}
        setShow={setShowStatusModal}
        transaction={transactionInfo}
      ></ChangeStatus>
      {/* {JSON.stringify(details)} */}
    </div>
  );
}
