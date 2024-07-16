// import React, { useEffect, useState } from "react";
// import { Card } from "react-bootstrap";
// import MyAxios from "../../util/MyAxios";
// import WarehouseItemList from "./WarehouseItemList";

// const ZoneList = ({ warehouse, zoneSearchTerm, productSearchTerm }) => {
//   const [zones, setZones] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await MyAxios.get(`/zones`, {
//           params: { warehouse_id: warehouse.id },
//         });
//         setZones(response.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     fetchData();
//   }, [warehouse.id]);

//   const filteredZones = zones.filter((zone) =>
//     zone.name.toLowerCase().includes(zoneSearchTerm.toLowerCase())
//   );

//   return (
//     <div className="container">
//       <div className="row row-cols-1 row-cols-md-12 g-4">
//         {filteredZones.map((zone) => (
//           <div key={zone.id} className="col">
//             <Card>
//               <Card.Body>
//                 <Card.Title>{zone.name}</Card.Title>
//                 <WarehouseItemList
//                   zoneId={zone.id}
//                   productSearchTerm={productSearchTerm}
//                 />
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ZoneList;
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import WarehouseItemList from "./WarehouseItemList";

const ZoneList = ({ warehouse, zoneSearchTerm, productSearchTerm }) => {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await MyAxios.get(`/zones`, {
          params: { warehouse_id: warehouse.id },
        });
        setZones(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [warehouse.id]);

  const filteredZones = zones.filter((zone) =>
    zone.name.toLowerCase().includes(zoneSearchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-12 g-4">
        {filteredZones.length === 0 ? (
          <p>Hôm nay không có hàng hết hạn</p>
        ) : (
          filteredZones.map((zone) => (
            <div key={zone.id} className="col">
              <Card>
                <Card.Body>
                  <Card.Title>{zone.name}</Card.Title>
                  <WarehouseItemList
                    zoneId={zone.id}
                    productSearchTerm={productSearchTerm}
                  />
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ZoneList;
