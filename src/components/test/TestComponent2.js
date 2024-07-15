import React from "react";
import ProductQuantityChart from "../history/ProductQuantityChart";
export default function TestComponent2() {
  function combineDetails(data) {
    var combinedDetails = {};

    data.details.forEach(function (detail) {
      var key = detail.product_id + "-" + detail.expire_date + "-" + detail.zone_id;

      if (combinedDetails.hasOwnProperty(key)) {
        combinedDetails[key].quantity += parseInt(detail.quantity);
      } else {
        combinedDetails[key] = Object.assign({}, detail);
      }
    });

    data.details = Object.values(combinedDetails);

    return data;
  }

  // Example usage
  var data = {
    warehouse_id: 1,
    source: "",
    details: [
      {
        product_id: "1",
        expire_date: "2024-07-31",
        quantity: "100",
        zone_id: "1",
      },
      {
        product_id: "3",
        expire_date: "2024-07-15",
        quantity: "012",
        zone_id: "2",
      },
      {
        product_id: "1",
        expire_date: "2024-07-31",
        quantity: "12",
        zone_id: "1",
      },
    ],
  };

  var combinedData = combineDetails(data);
  console.log(combinedData);
  return <div>{/* <ProductQuantityChart></ProductQuantityChart> */}</div>;
}
