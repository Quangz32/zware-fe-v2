import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";

export default function ProductForm(props) {
  const handleCloseModal = () => {
    props.setShow(false);
  };

  const emptyFormData = {
    name: "",
    category_id: 0,
    supplier: "",
    measure_unit: "",
  };
  const [formData, setFormData] = useState(emptyFormData);

  useEffect(() => {
    if (props.add === "edit") {
      setFormData(props.product);
    }
  }, [props]);

  console.log(formData);
  return (
    <>
      <Modal show={props.show} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>
            {props.mode === "edit" ? "Edit product" : "Add new product"}
          </Modal.Title>
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
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  ></FormControl>
                </FormGroup>
              </Col>
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
                        category_id: Number(e.target.value),
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
                    onChange={(e) =>
                      setFormData({ ...formData, supplier: e.target.value })
                    }
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
                <Form.Control type="file"></Form.Control>
              </FormGroup>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary">
            {props.mode === "edit" ? "Update Product" : "Save Product"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
