
// import React, { useState, useEffect } from "react";
// import { Table, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import MyAxios from "../../util/MyAxios";
// import ConfirmModal from "../../components/share/ConfirmModal";
// import defaultProductImage from "./defaultProductImage.jpg";

// const WarehouseItemList = ({ warehouseId, zoneId, productSearchTerm }) => {
//   const [warehouseItems, setWarehouseItems] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [items, setItems] = useState([]);
//   const [productImages, setProductImages] = useState({});
//   const [expiredProducts, setExpiredProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchWarehouseItems() {
//       try {
//         const response = await MyAxios.get(`/warehouse_items`, {
//           params: {
//             warehouse_id: warehouseId,
//             zone_id: zoneId,
//           },
//         });
//         setWarehouseItems(response.data.data);
//       } catch (error) {
//         console.error("Error fetching warehouse items:", error);
//       }
//     }

//     async function fetchItems() {
//       try {
//         const response = await MyAxios.get("/items");
//         setItems(response.data.data);
//       } catch (error) {
//         console.error("Error fetching items:", error);
//       }
//     }

//     async function fetchProducts() {
//       try {
//         const response = await MyAxios.get("/products");
//         const products = response.data.data;
//         setProducts(products);

//         // Fetch images for each product
//         products.forEach(async (product) => {
//           try {
//             const imageResponse = await MyAxios.get(
//               `/products/${product.id}/image`,
//               {
//                 responseType: "arraybuffer",
//               }
//             );
//             const base64Image = btoa(
//               new Uint8Array(imageResponse.data).reduce(
//                 (data, byte) => data + String.fromCharCode(byte),
//                 ""
//               )
//             );
//             setProductImages((prevImages) => ({
//               ...prevImages,
//               [product.id]: `data:image/jpeg;base64,${base64Image}`,
//             }));
//           } catch (error) {
//             console.error(`Error fetching image for product ${product.id}:`, error);
//           }
//         });
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     }

//     async function fetchData() {
//       await fetchWarehouseItems();
//       await fetchItems();
//       await fetchProducts();
//     }

//     fetchData();
//   }, [warehouseId, zoneId]);

//   useEffect(() => {
//     const expired = warehouseItems.filter((warehouseItem) => {
//       const item = items.find((item) => item.id === warehouseItem.item_id);
//       if (item) {
//         const expireDate = new Date(item.expire_date);
//         return expireDate < new Date();
//       }
//       return false;
//     });
//     setExpiredProducts(expired);
//   }, [warehouseItems, items]);

//   const getProductById = (productId) => {
//     return products.find((product) => product.id === productId) || {};
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleCreateDisposal = () => {
//     navigate("/create-disposal");
//   };

//   const handleViewExpired = () => {
//     setShowModal(true);
//   };

//   const handleConfirmDisposal = () => {
//     setShowModal(false); // Close the confirmation modal
//     navigate("/create-disposal", {
//       state: {
//         product_name: selectedProduct?.product_name || '',
//         expire_date: selectedProduct?.expire_date || '',
//         quantity: selectedProduct?.quantity || '',
//       },
//     });
//   };

//   const handleDisposeButtonClick = (product) => {
//     setSelectedProduct(product);
//     setShowModal(true); // Show confirmation modal
//   };

//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center mb-3">
      
//         <div>
//           {/* <Button variant="primary" onClick={handleCreateDisposal}>
//             Create Disposal
//           </Button> */}
//         </div>
//       </div>
//       <ConfirmModal
//         show={showModal}
//         handleClose={handleCloseModal}
//         handleConfirm={handleConfirmDisposal}
//         title="Confirm Disposal"
//         body={`Are you sure you want to dispose ${selectedProduct?.product_name || ''}?`}
//       />
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th style={{ textAlign: "center" }}>Image</th>
//             <th style={{ textAlign: "center" }}>Quantity</th>
//             <th>Expire Date</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {expiredProducts.map((warehouseItem) => {
//             const item = items.find((item) => item.id === warehouseItem.item_id);
//             const product = getProductById(item.product_id);
//             const productImageUrl =
//               productImages[product.id] || defaultProductImage;
//             return (
//               <tr key={warehouseItem.id}>
//                 <td>{product.name}</td>
//                 <td style={{ textAlign: "center" }}>
//                   <img
//                     src={productImageUrl}
//                     alt="Product"
//                     style={{ width: "50px", height: "50px" }}
//                   />
//                 </td>
//                 <td style={{ textAlign: "center" }}>
//                   {warehouseItem.quantity}
//                 </td>
//                 <td>{item ? item.expire_date : "N/A"}</td>
//                 <td>
//                   <Button
//                     variant="danger"
//                     onClick={() => handleDisposeButtonClick({
//                       product_name: product.name,
//                       expire_date: item ? item.expire_date : '',
//                       quantity: warehouseItem.quantity,
//                     })}
//                   >
//                     Disposal
//                   </Button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default WarehouseItemList;
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MyAxios from "../../util/MyAxios";
import ConfirmModal from "../../components/share/ConfirmModal";
import defaultProductImage from "./defaultProductImage.jpg";

const WarehouseItemList = ({ warehouseId, zoneId, productSearchTerm }) => {
  const [warehouseItems, setWarehouseItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWarehouseItems() {
      try {
        const response = await MyAxios.get(`/warehouse_items`, {
          params: {
            warehouse_id: warehouseId,
            zone_id: zoneId,
          },
        });
        setWarehouseItems(response.data.data);
      } catch (error) {
        console.error("Error fetching warehouse items:", error);
      }
    }

    async function fetchItems() {
      try {
        const response = await MyAxios.get("/items");
        setItems(response.data.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }

    async function fetchProducts() {
      try {
        const response = await MyAxios.get("/products");
        const products = response.data.data;
        setProducts(products);

        // Fetch images for each product
        products.forEach(async (product) => {
          try {
            const imageResponse = await MyAxios.get(
              `/products/${product.id}/image`,
              {
                responseType: "arraybuffer",
              }
            );
            const base64Image = btoa(
              new Uint8Array(imageResponse.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            setProductImages((prevImages) => ({
              ...prevImages,
              [product.id]: `data:image/jpeg;base64,${base64Image}`,
            }));
          } catch (error) {
            console.error(`Error fetching image for product ${product.id}:`, error);
          }
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    async function fetchData() {
      await fetchWarehouseItems();
      await fetchItems();
      await fetchProducts();
    }

    fetchData();
  }, [warehouseId, zoneId]);

  useEffect(() => {
    const expired = warehouseItems.filter((warehouseItem) => {
      const item = items.find((item) => item.id === warehouseItem.item_id);
      if (item) {
        const expireDate = new Date(item.expire_date);
        return expireDate < new Date();
      }
      return false;
    });
    setExpiredProducts(expired);
  }, [warehouseItems, items]);

  const getProductById = (productId) => {
    return products.find((product) => product.id === productId) || {};
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreateDisposal = () => {
    navigate("/create-disposal");
  };

  const handleViewExpired = () => {
    setShowModal(true);
  };

  const handleConfirmDisposal = () => {
    setShowModal(false); // Close the confirmation modal
    navigate("/create-disposal", {
      state: {
        product_name: selectedProduct?.product_name || '',
        expire_date: selectedProduct?.expire_date || '',
        quantity: selectedProduct?.quantity || '',
      },
    });
  };

  const handleDisposeButtonClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true); // Show confirmation modal
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div></div>
      </div>
      <ConfirmModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmDisposal}
        title="Confirm Disposal"
        body={`Are you sure you want to dispose ${selectedProduct?.product_name || ''}?`}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th style={{ textAlign: "center" }}>Image</th>
            <th style={{ textAlign: "center" }}>Quantity</th>
            <th>Expire Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expiredProducts.map((warehouseItem) => {
            const item = items.find((item) => item.id === warehouseItem.item_id);
            const product = getProductById(item.product_id);
            const productImageUrl =
              productImages[product.id] || defaultProductImage;
            return (
              <tr key={warehouseItem.id}>
                <td>{product.name}</td>
                <td style={{ textAlign: "center" }}>
                  <img
                    src={productImageUrl}
                    alt="Product"
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td style={{ textAlign: "center" }}>
                  {warehouseItem.quantity}
                </td>
                <td>{item ? item.expire_date : "N/A"}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDisposeButtonClick({
                      product_name: product.name,
                      expire_date: item ? item.expire_date : '',
                      quantity: warehouseItem.quantity,
                    })}
                  >
                    Disposal
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default WarehouseItemList;
