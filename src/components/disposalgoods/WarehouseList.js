// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import MyAxios from "../../util/MyAxios";
// // // // // // import ZoneList from "./ZoneList";

// // // // // // const WarehouseList = ({ warehouseSearchTerm, zoneSearchTerm, productSearchTerm, render }) => {
// // // // // //   const [warehouses, setWarehouses] = useState([]);
// // // // // //   const [loading, setLoading] = useState(false);

// // // // // //   // Function to fetch warehouses from the server
// // // // // //   const fetchWarehouses = async () => {
// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       const response = await MyAxios.get("warehouses");
// // // // // //       setWarehouses(response.data.data);
// // // // // //     } catch (error) {
// // // // // //       console.log("Error fetching warehouses:", error);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };


// // // // // //   const removeExpiredProducts = async (warehouse_id) => {
// // // // // //     try {
// // // // // //         setLoading(true);
// // // // // //         const response = await MyAxios.post(`/disposed_goods/remove_expire_product_by_warehouse/${warehouse_id}`);
// // // // // //         console.log(`Expired products removed for warehouse ID ${warehouse_id}`);
// // // // // //         // Optionally, you can update state or perform additional actions after deletion
// // // // // //     } catch (error) {
// // // // // //         console.error(`Error removing expired products for warehouse ID ${warehouse_id}:`, error);
// // // // // //       }}
// // // // // //         useEffect(() => {
// // // // // //           fetchWarehouses();
// // // // // //       }, [render]); 

// // // // // //   // Filter warehouses based on search terms
// // // // // //   const filteredWarehouses = warehouses.filter((warehouse) =>
// // // // // //     warehouse.name.toLowerCase().includes(warehouseSearchTerm.toLowerCase())
// // // // // //   );

// // // // // //   return (
// // // // // //     <div id="warehouseList">
// // // // // //       {loading && <p>Loading warehouses...</p>}
// // // // // //       {!loading && filteredWarehouses.length === 0 && <h3>No warehouses found</h3>}
// // // // // //       {filteredWarehouses.map((warehouse) => (
// // // // // //         <div className="card mb-3" key={warehouse.id}>
// // // // // //           <div className="card-header">
// // // // // //             <div className="d-flex mb-1">
// // // // // //               <div className="d-flex align-items-center me-4">
// // // // // //                 <i className="bi bi-buildings fs-3"></i>
// // // // // //               </div>
// // // // // //               <div>
// // // // // //                 <h5 className="card-title mb-0">{warehouse.name}</h5>
// // // // // //                 <small className="card-text">Address: {warehouse.address}</small>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //             <button
// // // // // //               className="btn btn-danger"
// // // // // //               onClick={() => removeExpiredProducts(warehouse.id)}
// // // // // //               disabled={loading} // Disable button while processing
// // // // // //             >
// // // // // //               {loading ? "Removing..." : "Remove Expired Products"}
// // // // // //             </button>
// // // // // //           </div>
// // // // // //           <div className="card-body">
// // // // // //             <ZoneList
// // // // // //               warehouse={warehouse}
// // // // // //               zoneSearchTerm={zoneSearchTerm}
// // // // // //               productSearchTerm={productSearchTerm}
// // // // // //             />
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       ))}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default WarehouseList;
// // // // // import React, { useState, useEffect } from "react";
// // // // // import MyAxios from "../../util/MyAxios";
// // // // // import ZoneList from "./ZoneList";

// // // // // const WarehouseList = ({
// // // // //   warehouseSearchTerm,
// // // // //   zoneSearchTerm,
// // // // //   productSearchTerm,
// // // // //   render,
// // // // // }) => {
// // // // //   const [warehouses, setWarehouses] = useState([]);
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   // Function to fetch warehouses from the server
// // // // //   const fetchWarehouses = async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const response = await MyAxios.get("warehouses");
// // // // //       setWarehouses(response.data.data);
// // // // //     } catch (error) {
// // // // //       console.log("Error fetching warehouses:", error);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const removeExpiredProducts = async (warehouse_id) => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       const response = await MyAxios.post(
// // // // //         `/disposed_goods/remove_expire_product_by_warehouse/${warehouse_id}`
// // // // //       );
// // // // //       console.log(`Expired products removed for warehouse ID ${warehouse_id}`);
// // // // //       // Optionally, you can update state or perform additional actions after deletion
// // // // //     } catch (error) {
// // // // //       console.error(
// // // // //         `Error removing expired products for warehouse ID ${warehouse_id}:`,
// // // // //         error
// // // // //       );
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchWarehouses();
// // // // //   }, [render]);

// // // // //   // Filter warehouses based on search terms
// // // // //   const filteredWarehouses = warehouses.filter((warehouse) =>
// // // // //     warehouse.name.toLowerCase().includes(warehouseSearchTerm.toLowerCase())
// // // // //   );

// // // // //   return (
// // // // //     <div id="warehouseList">
// // // // //       {loading && <p>Loading warehouses...</p>}
// // // // //       {!loading && filteredWarehouses.length === 0 && (
// // // // //         <h3>No warehouses found</h3>
// // // // //       )}
// // // // //       {filteredWarehouses.map((warehouse) => (
// // // // //         <div className="card mb-3" key={warehouse.id}>
// // // // //           <div className="card-header">
// // // // //             <div className="d-flex mb-1">
// // // // //               <div className="d-flex align-items-center me-4">
// // // // //                 <i className="bi bi-buildings fs-3"></i>
// // // // //               </div>
// // // // //               <div>
// // // // //                 <h5 className="card-title mb-0">{warehouse.name}</h5>
// // // // //                 <small className="card-text">Address: {warehouse.address}</small>
// // // // //               </div>
// // // // //             </div>
// // // // //             <button
// // // // //               className="btn btn-danger"
// // // // //               onClick={() => removeExpiredProducts(warehouse.id)}
// // // // //               disabled={loading} // Disable button while processing
// // // // //             >
// // // // //               {loading ? "Removing..." : "Remove Expired Products"}
// // // // //             </button>
// // // // //           </div>
// // // // //           <div className="card-body">
// // // // //             <ZoneList
// // // // //               warehouse={warehouse}
// // // // //               zoneSearchTerm={zoneSearchTerm}
// // // // //               productSearchTerm={productSearchTerm}
// // // // //             />
// // // // //           </div>
// // // // //         </div>
// // // // //       ))}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default WarehouseList;
// // // // import React, { useState, useEffect } from "react";
// // // // import MyAxios from "../../util/MyAxios";
// // // // import ZoneList from "./ZoneList";

// // // // const WarehouseList = ({
// // // //   warehouseSearchTerm,
// // // //   zoneSearchTerm,
// // // //   productSearchTerm,
// // // //   render,
// // // // }) => {
// // // //   const [warehouses, setWarehouses] = useState([]);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [updating, setUpdating] = useState(false); // State để cập nhật trang sau khi xóa sản phẩm hết hạn

// // // //   // Function to fetch warehouses from the server
// // // //   const fetchWarehouses = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const response = await MyAxios.get("warehouses");
// // // //       setWarehouses(response.data.data);
// // // //     } catch (error) {
// // // //       console.log("Error fetching warehouses:", error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const removeExpiredProducts = async (warehouse_id) => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const response = await MyAxios.post(
// // // //         `/disposed_goods/remove_expire_product_by_warehouse/${warehouse_id}`
// // // //       );
// // // //       console.log(`Expired products removed for warehouse ID ${warehouse_id}`);
// // // //       // Update state to trigger re-render after deletion
// // // //       setUpdating(true);
// // // //     } catch (error) {
// // // //       console.error(
// // // //         `Error removing expired products for warehouse ID ${warehouse_id}:`,
// // // //         error
// // // //       );
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchWarehouses();
// // // //   }, [render, updating]); // Thêm `updating` vào dependency để cập nhật khi có thay đổi

// // // //   // Filter warehouses based on search terms
// // // //   const filteredWarehouses = warehouses.filter((warehouse) =>
// // // //     warehouse.name.toLowerCase().includes(warehouseSearchTerm.toLowerCase())
// // // //   );

// // // //   return (
// // // //     <div id="warehouseList">
// // // //       {loading && <p>Loading warehouses...</p>}
// // // //       {!loading && filteredWarehouses.length === 0 && (
// // // //         <h3>No warehouses found</h3>
// // // //       )}
// // // //       {filteredWarehouses.map((warehouse) => (
// // // //         <div className="card mb-3" key={warehouse.id}>
// // // //           <div className="card-header">
// // // //             <div className="d-flex mb-1">
// // // //               <div className="d-flex align-items-center me-4">
// // // //                 <i className="bi bi-buildings fs-3"></i>
// // // //               </div>
// // // //               <div>
// // // //                 <h5 className="card-title mb-0">{warehouse.name}</h5>
// // // //                 <small className="card-text">Address: {warehouse.address}</small>
// // // //               </div>
// // // //             </div>
// // // //             <button
// // // //               className="btn btn-danger"
// // // //               onClick={() => removeExpiredProducts(warehouse.id)}
// // // //               disabled={loading} // Disable button while processing
// // // //             >
// // // //               {loading ? "Removing..." : "Remove Expired Products"}
// // // //             </button>
// // // //           </div>
// // // //           <div className="card-body">
// // // //             <ZoneList
// // // //               warehouse={warehouse}
// // // //               zoneSearchTerm={zoneSearchTerm}
// // // //               productSearchTerm={productSearchTerm}
// // // //             />
// // // //           </div>
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default WarehouseList;
// // // import React, { useState, useEffect } from "react";
// // // import MyAxios from "../../util/MyAxios";
// // // import ZoneList from "./ZoneList";
// // // import ConfirmModal from "../../components/share/ConfirmModal";
// // // import MyAlert from "../../components/share/MyAlert"; // Import MyAlert component

// // // const WarehouseList = ({
// // //   warehouseSearchTerm,
// // //   zoneSearchTerm,
// // //   productSearchTerm,
// // //   render,
// // // }) => {
// // //   const [warehouses, setWarehouses] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [updating, setUpdating] = useState(false);
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
// // //   const [alert, setAlert] = useState(null);

// // //   const fetchWarehouses = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await MyAxios.get("warehouses");
// // //       setWarehouses(response.data.data);
// // //     } catch (error) {
// // //       console.log("Error fetching warehouses:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const removeExpiredProducts = async (warehouse_id) => {
// // //     try {
// // //       setLoading(true);
// // //       const response = await MyAxios.post(
// // //         `/disposed_goods/remove_expire_product_by_warehouse/${warehouse_id}`
// // //       );
// // //       console.log(`Expired products removed for warehouse ID ${warehouse_id}`);
// // //       setAlert({ type: 'success', message: 'Expired products removed successfully!' });
// // //       setUpdating(true);
// // //     } catch (error) {
// // //       console.error(
// // //         `Error removing expired products for warehouse ID ${warehouse_id}:`,
// // //         error
// // //       );
// // //       setAlert({ type: 'danger', message: 'Failed to remove expired products. Please try again.' });
// // //     } finally {
// // //       setLoading(false);
// // //       setShowModal(false); // Close the confirmation modal
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchWarehouses();
// // //   }, [render, updating]);

// // //   const filteredWarehouses = warehouses.filter((warehouse) =>
// // //     warehouse.name.toLowerCase().includes(warehouseSearchTerm.toLowerCase())
// // //   );

// // //   const handleConfirmRemove = (warehouseId) => {
// // //     setSelectedWarehouseId(warehouseId);
// // //     setShowModal(true);
// // //   };

// // //   const handleCloseModal = () => {
// // //     setShowModal(false);
// // //   };

// // //   const handleConfirm = () => {
// // //     if (selectedWarehouseId) {
// // //       removeExpiredProducts(selectedWarehouseId);
// // //     }
// // //   };

// // //   return (
// // //     <div id="warehouseList">
// // //       {loading && <p>Loading warehouses...</p>}
// // //       {alert && <MyAlert variant={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
// // //       {!loading && filteredWarehouses.length === 0 && (
// // //         <h3>No warehouses found</h3>
// // //       )}
// // //       {filteredWarehouses.map((warehouse) => (
// // //         <div className="card mb-3" key={warehouse.id}>
// // //           <div className="card-header">
// // //             <div className="d-flex mb-1">
// // //               <div className="d-flex align-items-center me-4">
// // //                 <i className="bi bi-buildings fs-3"></i>
// // //               </div>
// // //               <div>
// // //                 <h5 className="card-title mb-0">{warehouse.name}</h5>
// // //                 <small className="card-text">Address: {warehouse.address}</small>
// // //               </div>
// // //             </div>
// // //             <button
// // //               className="btn btn-danger"
// // //               onClick={() => handleConfirmRemove(warehouse.id)}
// // //               disabled={loading}
// // //             >
// // //               {loading ? "Removing..." : "Remove Expired Products"}
// // //             </button>
// // //           </div>
// // //           <div className="card-body">
// // //             <ZoneList
// // //               warehouse={warehouse}
// // //               zoneSearchTerm={zoneSearchTerm}
// // //               productSearchTerm={productSearchTerm}
// // //             />
// // //           </div>
// // //         </div>
// // //       ))}
// // //       <ConfirmModal
// // //         show={showModal}
// // //         handleClose={handleCloseModal}
// // //         handleConfirm={handleConfirm}
// // //         title="Confirm Removal"
// // //         body="Are you sure you want to remove expired products from this warehouse?"
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default WarehouseList;
// // import React, { useState, useEffect } from "react";
// // import MyAxios from "../../util/MyAxios";
// // import ZoneList from "./ZoneList";
// // import ConfirmModal from "../../components/share/ConfirmModal";
// // import MyAlert from "../../components/share/MyAlert";

// // const WarehouseList = ({
// //   warehouseSearchTerm,
// //   zoneSearchTerm,
// //   productSearchTerm,
// //   render,
// // }) => {
// //   const [warehouses, setWarehouses] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [updating, setUpdating] = useState(false);
// //   const [showModal, setShowModal] = useState(false);
// //   const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
// //   const [alert, setAlert] = useState(null);

// //   const fetchWarehouses = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await MyAxios.get("warehouses");
// //       setWarehouses(response.data.data);
// //     } catch (error) {
// //       console.log("Error fetching warehouses:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const removeExpiredProducts = async (warehouse_id) => {
// //     try {
// //       setLoading(true);
// //       const response = await MyAxios.post(
// //         `/disposed_goods/remove_expire_product_by_warehouse/${warehouse_id}`
// //       );
// //       console.log(`Expired products removed for warehouse ID ${warehouse_id}`);
// //       setAlert({ type: 'success', message: 'Expired products removed successfully!' });
// //       setUpdating(true); // Trigger re-render
// //     } catch (error) {
// //       console.error(
// //         `Error removing expired products for warehouse ID ${warehouse_id}:`,
// //         error
// //       );
// //       setAlert({ type: 'danger', message: 'Failed to remove expired products. Please try again.' });
// //     } finally {
// //       setLoading(false);
// //       setShowModal(false); // Close the confirmation modal
// //     }
// //   };

// //   useEffect(() => {
// //     fetchWarehouses();
// //   }, [render, updating]);

// //   const filteredWarehouses = warehouses.filter((warehouse) =>
// //     warehouse.name.toLowerCase().includes(warehouseSearchTerm.toLowerCase())
// //   );

// //   const handleConfirmRemove = (warehouseId) => {
// //     setSelectedWarehouseId(warehouseId);
// //     setShowModal(true);
// //   };

// //   const handleCloseModal = () => {
// //     setShowModal(false);
// //   };

// //   const handleConfirm = () => {
// //     if (selectedWarehouseId) {
// //       removeExpiredProducts(selectedWarehouseId);
// //     }
// //   };

// //   return (
// //     <div id="warehouseList">
// //       {loading && <p>Loading warehouses...</p>}
// //       {alert && <MyAlert variant={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
// //       {!loading && filteredWarehouses.length === 0 && (
// //         <h3>No warehouses found</h3>
// //       )}
// //       {filteredWarehouses.map((warehouse) => (
// //         <div className="card mb-3" key={warehouse.id}>
// //           <div className="card-header">
// //             <div className="d-flex mb-1">
// //               <div className="d-flex align-items-center me-4">
// //                 <i className="bi bi-buildings fs-3"></i>
// //               </div>
// //               <div>
// //                 <h5 className="card-title mb-0">{warehouse.name}</h5>
// //                 <small className="card-text">Address: {warehouse.address}</small>
// //               </div>
// //             </div>
// //             <button
// //               className="btn btn-danger"
// //               onClick={() => handleConfirmRemove(warehouse.id)}
// //               disabled={loading}
// //             >
// //               {loading ? "Removing..." : "Remove Expired Products"}
// //             </button>
// //           </div>
// //           <div className="card-body">
// //             <ZoneList
// //               warehouse={warehouse}
// //               zoneSearchTerm={zoneSearchTerm}
// //               productSearchTerm={productSearchTerm}
// //             />
// //           </div>
// //         </div>
// //       ))}
// //       <ConfirmModal
// //         show={showModal}
// //         handleClose={handleCloseModal}
// //         handleConfirm={handleConfirm}
// //         title="Confirm Removal"
// //         body="Are you sure you want to remove expired products from this warehouse?"
// //       />
// //     </div>
// //   );
// // };

// // export default WarehouseList;
// import React, { useState, useEffect } from "react";
// import MyAxios from "../../util/MyAxios";
// import ZoneList from "./ZoneList";
// import ConfirmModal from "../../components/share/ConfirmModal";
// import MyAlert from "../../components/share/MyAlert";

// const WarehouseList = ({
//   warehouseSearchTerm,
//   zoneSearchTerm,
//   productSearchTerm,
//   render,
// }) => {
//   const [warehouses, setWarehouses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [updating, setUpdating] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
//   const [alert, setAlert] = useState(null);

//   const fetchWarehouses = async () => {
//     setLoading(true);
//     try {
//       const response = await MyAxios.get("warehouses");
//       setWarehouses(response.data.data);
//     } catch (error) {
//       console.log("Error fetching warehouses:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const removeExpiredProducts = async (warehouse_id) => {
//     try {
//       setLoading(true);
//       const response = await MyAxios.post(
//         `/disposed_goods/remove_expire_product_by_warehouse/${warehouse_id}`
//       );
//       console.log(`Expired products removed for warehouse ID ${warehouse_id}`);
//       setAlert({ type: 'success', message: 'Expired products removed successfully!' });
//       setUpdating(true); // Trigger re-render
//     } catch (error) {
//       console.error(
//         `Error removing expired products for warehouse ID ${warehouse_id}:`,
//         error
//       );
//       setAlert({ type: 'danger', message: 'Failed to remove expired products. Please try again.' });
//     } finally {
//       setLoading(false);
//       setShowModal(false); // Close the confirmation modal
//     }
//   };

//   useEffect(() => {
//     fetchWarehouses();
//   }, [render, updating]);

//   const filteredWarehouses = warehouses.filter((warehouse) =>
//     warehouse.name.toLowerCase().includes(warehouseSearchTerm.toLowerCase())
//   );

//   const handleConfirmRemove = (warehouseId) => {
//     setSelectedWarehouseId(warehouseId);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleConfirm = () => {
//     if (selectedWarehouseId) {
//       removeExpiredProducts(selectedWarehouseId);
//     }
//   };

//   const handleAlertClose = () => {
//     setAlert(null);
//   };

//   return (
//     <div id="warehouseList">
//       {loading && <p>Loading warehouses...</p>}
//       {alert && <MyAlert variant={alert.type} message={alert.message} onClose={handleAlertClose} />}
//       {!loading && filteredWarehouses.length === 0 && (
//         <h3>No warehouses found</h3>
//       )}
//       {filteredWarehouses.map((warehouse) => (
//         <div className="card mb-3" key={warehouse.id}>
//           <div className="card-header">
//             <div className="d-flex mb-1">
//               <div className="d-flex align-items-center me-4">
//                 <i className="bi bi-buildings fs-3"></i>
//               </div>
//               <div>
//                 <h5 className="card-title mb-0">{warehouse.name}</h5>
//                 <small className="card-text">Address: {warehouse.address}</small>
//               </div>
//             </div>
//             <button
//               className="btn btn-danger"
//               onClick={() => handleConfirmRemove(warehouse.id)}
//               disabled={loading}
//             >
//               {loading ? "Removing..." : "Remove Expired Products"}
//             </button>
//           </div>
//           <div className="card-body">
//             <ZoneList
//               warehouse={warehouse}
//               zoneSearchTerm={zoneSearchTerm}
//               productSearchTerm={productSearchTerm}
//             />
//           </div>
//         </div>
//       ))}
//       <ConfirmModal
//         show={showModal}
//         handleClose={handleCloseModal}
//         handleConfirm={handleConfirm}
//         title="Confirm Removal"
//         body="Are you sure you want to remove expired products from this warehouse?"
//       />
//     </div>
//   );
// };

// export default WarehouseList;
import React, { useState, useEffect } from "react";
import MyAxios from "../../util/MyAxios";
import ZoneList from "./ZoneList";
import ConfirmModal from "../../components/share/ConfirmModal";
import MyAlert from "../../components/share/MyAlert";

const WarehouseList = ({
  warehouseSearchTerm,
  zoneSearchTerm,
  productSearchTerm,
  render,
}) => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
  const [alert, setAlert] = useState(null);

  const fetchWarehouses = async () => {
    setLoading(true);
    try {
      const response = await MyAxios.get("warehouses");
      setWarehouses(response.data.data);
    } catch (error) {
      console.log("Error fetching warehouses:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeExpiredProducts = async (warehouse_id) => {
    try {
      setLoading(true);
      const response = await MyAxios.post(
        `/disposed_goods/remove_expire_product_by_warehouse/${warehouse_id}`
      );
      console.log(`Expired products removed for warehouse ID ${warehouse_id}`);
      setAlert({ type: 'success', message: 'Expired products removed successfully!' });
      setUpdating(true); // Trigger re-render
    } catch (error) {
      console.error(
        `Error removing expired products for warehouse ID ${warehouse_id}:`,
        error
      );
      setAlert({ type: 'danger', message: 'Failed to remove expired products. Please try again.' });
    } finally {
      setLoading(false);
      setShowModal(false); // Close the confirmation modal
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, [render, updating]);

  const filteredWarehouses = warehouses.filter((warehouse) =>
    warehouse.name.toLowerCase().includes(warehouseSearchTerm.toLowerCase())
  );

  const handleConfirmRemove = (warehouseId) => {
    setSelectedWarehouseId(warehouseId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = async () => {
    if (selectedWarehouseId) {
      await removeExpiredProducts(selectedWarehouseId);
      // Reload the page after successful removal
      window.location.reload();
    }
  };

  const handleAlertClose = () => {
    setAlert(null);
  };

  return (
    <div id="warehouseList">
      {loading && <p>Loading warehouses...</p>}
      {alert && <MyAlert variant={alert.type} message={alert.message} onClose={handleAlertClose} />}
      {!loading && filteredWarehouses.length === 0 && (
        <h3>No warehouses found</h3>
      )}
      {filteredWarehouses.map((warehouse) => (
        <div className="card mb-3" key={warehouse.id}>
          <div className="card-header">
            <div className="d-flex mb-1">
              <div className="d-flex align-items-center me-4">
                <i className="bi bi-buildings fs-3"></i>
              </div>
              <div>
                <h5 className="card-title mb-0">{warehouse.name}</h5>
                <small className="card-text">Address: {warehouse.address}</small>
              </div>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => handleConfirmRemove(warehouse.id)}
              disabled={loading}
            >
              {loading ? "Removing..." : "Remove Expired Products"}
            </button>
          </div>
          <div className="card-body">
            <ZoneList
              warehouse={warehouse}
              zoneSearchTerm={zoneSearchTerm}
              productSearchTerm={productSearchTerm}
            />
          </div>
        </div>
      ))}
      <ConfirmModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirm}
        title="Confirm Removal"
        body="Are you sure you want to remove expired products from this warehouse?"
      />
    </div>
  );
};

export default WarehouseList;
