import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";

import MyAxios from "../../util/MyAxios";
import axios from "axios"; //for image upload
import MyAlert from "../share/MyAlert";

//Props contains: show, setShow, mode, categories, product(for edit)
export default function ProductForm(props) {
  // MyAlert
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async () => {
    let newProduct = {};

    const handlePost = async () => {
      //CALL POST
      await MyAxios.post("products", formData)
        .then((res) => {
          newProduct = res.data.data;
          //display message
          setAlertMessage(res.data.message);
          setAlertVariant("success");
          setShowAlert(true); //show Alert
        })
        .catch((e) => {
          console.log(e);

          //display message
          setAlertMessage(e.response.data.message);
          setAlertVariant("warning");
          setShowAlert(true); //show Alert
        });
    };

    const handlePut = async () => {
      //CALL POST
      await MyAxios.put(`products/${formData.id}`, formData)
        .then((res) => {
          newProduct = res.data.data;
          //display message
          setAlertMessage(res.data.message);
          setAlertVariant("success");
          setShowAlert(true); //show Alert
        })
        .catch((e) => {
          console.log(e);

          //display message
          setAlertMessage(e.response.data.message);
          setAlertVariant("warning");
          setShowAlert(true); //show Alert
        });
    };

    const handleUploadImage = async () => {
      const imageFile = document.getElementById("uploaded-image-prd481").files[0];
      if (!imageFile) return;

      const formData = new FormData();
      formData.append("image", imageFile);

      await axios.post(`http://localhost:2000/api/products/${newProduct.id}/image`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
    };

    if (props.mode === "edit") {
      await handlePut();
    } else {
      await handlePost();
    }

    //if Object is not empty
    if (Object.keys(newProduct).length > 0) {
      console.log(newProduct);
      await handleUploadImage();
    }

    props.setShow(false); //Close Modal
  };

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (props.mode === "edit") {
      setFormData(props.product);
    } else {
      setFormData({
        name: "",
        category_id: props.categories[0] ? props.categories[0].id : 0,
        supplier: "",
        measure_unit: "",
      });
    }
  }, [props]);

  return (
    <>
      <Modal
        show={props.show}
        onHide={() => {
          props.setShow(false); //Close Modal
        }}
      >
        <Modal.Header>
          <Modal.Title>{props.mode === "edit" ? "Edit product" : "Add new product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <FormGroup>
                  <FormLabel>
                    <strong>Name</strong>
                  </FormLabel>
                  <FormControl
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  ></FormControl>
                </FormGroup>
              </Col>
              {props.categories.length > 0 && (
                <Col>
                  <FormGroup>
                    <FormLabel>
                      <strong>Category</strong>
                    </FormLabel>
                    <Form.Select
                      value={formData.category_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category_id: e.target.value,
                        })
                      }
                    >
                      {props.categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FormGroup>
                </Col>
              )}
            </Row>
            <Row className="mb-3">
              <Col>
                <FormGroup>
                  <FormLabel>
                    <strong>Supplier</strong>
                  </FormLabel>
                  <FormControl
                    type="text"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  ></FormControl>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>
                    <strong>Measure Unit</strong>
                  </FormLabel>
                  <FormControl
                    type="text"
                    value={formData.measure_unit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        measure_unit: e.target.value,
                      })
                    }
                  ></FormControl>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <FormGroup>
                <Form.Label>
                  <strong>Image</strong>
                </Form.Label>
                <Form.Control type="file" id="uploaded-image-prd481"></Form.Control>
              </FormGroup>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              props.setShow(false); //Close Modal
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {props.mode === "edit" ? "Update Product" : "Save Product"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ALERT */}
      <MyAlert
        message={alertMessage}
        variant={alertVariant}
        show={showAlert}
        setShow={setShowAlert}
      />
    </>
  );
}
