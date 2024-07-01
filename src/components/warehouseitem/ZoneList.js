import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import WarehouseItemList from "./WarehouseItemList";

const ZoneList = ({ warehouse }) => {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    // Fetch zones from DB
    async function fetchData() {
      try {
        const response = await MyAxios.get(`/warehouses/${warehouse.id}/zones`);
        setZones(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [warehouse.id]);

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {zones.map((zone) => (
          <div key={zone.id} className="col">
            <Card>
              <Card.Body>
                <Card.Title>{zone.name}</Card.Title>
                <WarehouseItemList zoneId={zone.id} />
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZoneList;
