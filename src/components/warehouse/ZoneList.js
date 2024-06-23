import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import ZoneForm from "./ZoneForm";
import DeleteZone from "./DeleteZone";

export default function ZoneList({ warehouse }) {
  const [zones, setZones] = useState([]);

  const initZone = { id: 0, name: "", warehouse_id: warehouse.id };
  const [zoneModalZone, SetZoneModalZone] = useState(initZone);

  const [showZoneModal, setShowZoneModal] = useState(false);
  const [zoneModalMode, setZoneModalMode] = useState("");

  const handleAddZoneClick = () => {
    setZoneModalMode("add");
    SetZoneModalZone(initZone);
    setShowZoneModal(true);
  };

  const handleEditZoneClick = (zone) => {
    setZoneModalMode("edit");
    SetZoneModalZone(zone);
    setShowZoneModal(true);
  };

  //DELETE Warehouse (Confirm)
  const [showDeleteZone, setShowDeleteZone] = useState(false);
  const [zoneToDelete, setZoneToDelete] = useState(null);

  const handleDeleteZoneClick = (zone) => {
    setZoneToDelete(zone);
    setShowDeleteZone(true);
  };

  useEffect(() => {
    // Fetch zones from DB
    async function fetchData() {
      try {
        const response = await MyAxios.get(`warehouses/${warehouse.id}/zones`);
        setZones(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [warehouse, showZoneModal, showDeleteZone]);

  return (
    <>
      <h5 className="card-subtitle mb-2 ">
        Zones:{" "}
        <Button
          variant="primary"
          size="sm"
          className="me-2"
          onClick={handleAddZoneClick}
        >
          Add Zone
        </Button>
      </h5>
      <table className="table">
        <tbody>
          {zones &&
            zones.map((zone) => (
              <tr key={zone.id} className="row">
                <td className="col">{zone.name}</td>
                <td className="col">
                  <Button
                    variant="outline-primary"
                    className="me-2"
                    size="sm"
                    onClick={() => {
                      handleEditZoneClick(zone);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteZoneClick(zone)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ZoneForm
        mode={zoneModalMode}
        zone={zoneModalZone}
        show={showZoneModal}
        setShow={setShowZoneModal}
      />

      {zoneToDelete && (
        <DeleteZone
          zone={zoneToDelete}
          show={showDeleteZone}
          setShow={setShowDeleteZone}
        />
      )}
    </>
  );
}
