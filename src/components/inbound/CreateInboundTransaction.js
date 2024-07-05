import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from "react-bootstrap";

//props: show, setShow, warehouseList
export default function CreateInboundTransaction(props) {
  const handleSubmit = async () => {
    console.log(formData);
  };

  const [formData, setFormData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
    if (loggingUser.role === "admin") setIsAdmin(true);

    setFormData({
      warehouse_id:
        loggingUser?.role === "admin" ? props.warehouseList[0]?.id : loggingUser.warehouse_id,
      source: "",
      detail: [],
    });
  }, [props]);

  console.log(formData);
  return (
    <div>
      <Modal
        // size="lg"
        show={props.show}
        onHide={() => {
          props.setShow(false);
        }}
      >
        <Modal.Header>
          <Modal.Title>Create Inbound Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <FormGroup>
                  <FormLabel>
                    <strong>Warehouse</strong>
                  </FormLabel>
                  <Form.Select
                    value={formData?.warehouse_id}
                    disabled={!isAdmin}
                    onChange={(e) => setFormData({ ...formData, warehouse_id: e.target.value })}
                  >
                    {props.warehouseList?.length > 0 &&
                      props.warehouseList.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>
                          {warehouse.name}
                        </option>
                      ))}
                  </Form.Select>
                  {/* <FormControl.Feedback type="invalid">{formErrors.name}</FormControl.Feedback> */}
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>
                    <strong>Source</strong>
                  </FormLabel>
                  <FormControl
                    type="text"
                    value={formData.source}
                    // isInvalid={!!formErrors.name}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  />
                  {/* <FormControl.Feedback type="invalid">{formErrors.name}</FormControl.Feedback> */}
                </FormGroup>
              </Col>

              {/* <Col>
                <FormGroup>
                  <FormLabel>
                    <strong>Source</strong>
                  </FormLabel>
                  <Form.Select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  >
                    {props.categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </FormGroup>
              </Col> */}
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              props.setShow(false);
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
