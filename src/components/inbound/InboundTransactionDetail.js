import React, { useState, useEffect } from "react";
import MyAxios from "../../util/MyAxios";
import { Table, Stack, Badge, Button } from "react-bootstrap";

//props: itemList, productList, userList, zoneList, transaction
export default function InboundTransactionDetail(props) {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      await MyAxios.get(`inbound_transaction_details?transaction_id=${props.transaction.id}`)
        .then((res) => {
          if (res.status === 200) {
            setDetails(res.data.data);
          } else {
            console.log("Fail");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchDetails();
  }, []);

  function findById(array, id) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        return array[i];
      }
    }
    return null; // Trả về null nếu không tìm thấy mục với id tương ứng
  }

  return (
    <div className="">
      <Stack direction="horizontal" gap={2} className="mb-2 pe-5">
        <Badge bg="primary">{`Date: ${props?.transaction?.date}`}</Badge>
        <Badge bg="success">{`Maker: ${
          findById(props?.userList, props?.transaction?.maker_id)?.name
        }`}</Badge>
        <Badge bg="info" text="dark">{`Status: ${props?.transaction?.status}`}</Badge>

        <Badge bg="warning" text="dark">
          {`Source: ${props.transaction.source}`}
        </Badge>
        <Button size="sm" className="ms-auto">
          Update Status
        </Button>
      </Stack>
      <Table size="sm" striped responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Expire date</th>
            <th>Quantity</th>
            <th>Zone</th>
          </tr>
        </thead>
        <tbody>
          {details?.length > 0 &&
            details.map((detail, index) => (
              <tr key={detail.id}>
                <td>{index + 1}</td>
                <td>
                  {
                    findById(props.productList, findById(props.itemList, detail.item_id).product_id)
                      .name
                  }
                </td>
                <td>{findById(props.itemList, detail.item_id).expire_date}</td>
                <td>{detail.quantity}</td>
                <td>{findById(props.zoneList, detail.zone_id).name}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      {/* {JSON.stringify(details)} */}
    </div>
  );
}
