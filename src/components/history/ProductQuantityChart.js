import React, { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import MyAxios from "../../util/MyAxios";

//props: filter
export default function TestComponent2(props) {
  const [series, setSeries] = useState([
    // {
    //   name: "Quantity",
    //   data: [],
    //   // data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 100],
    // },
  ]);

  const [options, setOptions] = useState({
    // chart: {
    //   // height: 350,
    //   type: "line",
    //   zoom: {
    //     enabled: true,
    //   },
    // },
    // dataLabels: {
    //   enabled: true,
    // },
    // stroke: {
    //   curve: "straight",
    // },
    // title: {
    //   text: "Product Quantity Change",
    //   align: "left",
    // },
    // grid: {
    //   row: {
    //     colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
    //     opacity: 0.5,
    //   },
    // },
    // xaxis: {
    //   categories: [],
    //   // categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    // },
  });

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

      // console.log(quantities);
      // console.log(dates);
      setChartData(quantities, dates);
    };

    const setChartData = (quantities, dates) => {
      setSeries([{ name: "Quantity", data: quantities }]);
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
          categories: dates,
          // categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
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
