import React, { useState, useEffect, useRef } from "react";
import MyAxios from "../../util/MyAxios";
import { Table, Button } from "react-bootstrap";

export default function Statistics() {
  const [reportData, setReportData] = useState([]);
  const printRef = useRef();

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await MyAxios.get("http://localhost:2000/api/reports");
        if (response.status === 200) {
          setReportData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    fetchReportData();
  }, []);

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // To reload the page after printing to restore the original content
  };

  return (
    <div ref={printRef}>
      <h1>Report Page</h1>
      <Button onClick={handlePrint}>Print</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Supplier</th>
            <th>Measure Unit</th>
            <th>Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((item, index) => (
            <tr key={index}>
              <td>{item.productName}</td>
              <td>{item.supplier}</td>
              <td>{item.measureUnit}</td>
              <td>{item.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
