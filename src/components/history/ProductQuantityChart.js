import React, { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import MyAxios from "../../util/MyAxios";

//props: filter, startQuantity, endQuantity
export default function TestComponent2(props) {
  const [series, setSeries] = useState([]);

  const [options, setOptions] = useState({});

  useEffect(() => {
    const fetchDataToChart = async () => {
      if (Object.keys(props.filter).length === 0) return;

      let responseData = await MyAxios.get(
        `history?` +
          `warehouse_id=${props.filter.warehouse_id}&` +
          `product_id=${props.filter.product_id}&` +
          `start_date=${props.filter.start_date}&` +
          `end_date=${props.filter.end_date}`
      );

      responseData = responseData.data.data;
      // console.log(responseData);

      const quantities = [];
      const dates = [];

      for (let i = 0; i < responseData.length; i++) {
        const item = responseData[i];
        quantities.push(item.quantity);
        dates.push(item.date);
      }

      setChartData(quantities, dates);
    };

    const setChartData = (quantities, dates) => {
      setSeries([{ name: "Quantity", data: [props.startQuantity, ...quantities] }]);
      setOptions({
        chart: {
          // height: 350,
          type: "line",
          zoom: {
            enabled: true,
          },
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Product Quantity Change",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: ["Before", ...dates],
        },
      });
    };

    fetchDataToChart();
  }, [props]);

  return (
    <div>
      {Object.keys(props.filter).length > 0 && (
        <ApexChart series={series} options={options} height={400} type="line"></ApexChart>
      )}
    </div>
  );
}
