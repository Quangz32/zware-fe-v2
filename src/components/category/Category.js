import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Table,
  Modal,
  Form,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import MyAlert from "../share/MyAlert";
// import "./Category.css";

const Category = () => {
  /* STYLE */
  const actionColumnStyle = { width: "230px", textAlign: "center" };
  const sizeh1Style = { fontSize: "2.25rem" };
  const longfixStyle = { marginTop: "-12px", textAlign: "center" };

  /* STYLE END */

  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);

  const triggerAlert = () => {
    setShowAlert(true);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
    } else {
      setName("");
    }
  }, [editingCategory]);

  useEffect(() => {
    filterCategories();
  }, [categories, searchTerm]);

  const fetchCategories = () => {
    MyAxios.get("/categories")
      .then((response) => {
        setCategories(response.data.data);
        if (!initialLoad) {
          setAlertMessage(response.data.message);
          setAlertVariant("success");
          triggerAlert();
        }
        setInitialLoad(false); // Set initial load to false after first fetch
      })
      .catch((error) => {
        setAlertMessage(
          error.response?.data?.message || "There was an error fetching the categories!"
        );
        setAlertVariant("danger");
        triggerAlert();
        console.error("There was an error fetching the categories!", error);
      });
  };

  const filterCategories = () => {
    if (!searchTerm) {
      setFilteredCategories(categories);
    } else {
      setFilteredCategories(
        categories.filter((category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  const addOrUpdateCategory = (category) => {
    if (category.id) {
      // Update category
      MyAxios.put(`/categories/${category.id}`, { name: category.name })
        .then((r) => {
          setCategories(categories.map((c) => (c.id === category.id ? category : c)));
          setAlertMessage(r.data.message);
          setAlertVariant("success");
          triggerAlert();
          setName(""); // Reset name field
        })
        .catch((error) => {
          setAlertMessage(
            error.response?.data?.message || "There was an error updating the category!"
          );
          setAlertVariant("danger");
          triggerAlert();
          console.error("There was an error updating the category!", error);
        });
    } else {
      // Add new category
      MyAxios.post("/categories", { name: category.name })
        .then((response) => {
          setCategories([...categories, response.data.data]);
          setAlertMessage(response.data.message);
          setAlertVariant("success");
          triggerAlert();
          setName(""); // Reset name field
        })
        .catch((error) => {
          setAlertMessage(
            error.response?.data?.message || "There was an error adding the category!"
          );
          setAlertVariant("danger");
          triggerAlert();
          console.error("There was an error adding the category!", error);
        });
    }
  };

  const deleteCategory = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
      MyAxios.delete(`/categories/${id}`)
        .then((d) => {
          setCategories(categories.filter((c) => c.id !== id));
          setAlertMessage(d.data.message);
          setAlertVariant("success");
          triggerAlert();
        })
        .catch((error) => {
          setAlertMessage(
            error.response?.data?.message || "There was an error deleting the category!"
          );
          setAlertVariant("danger");
          triggerAlert();
          console.error("There was an error deleting the category!", error);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const category = { id: editingCategory ? editingCategory.id : null, name };
    addOrUpdateCategory(category);
    setModalShow(false);
    setEditingCategory(null);
  };

  return (
    <Container>
      <Alert style={longfixStyle}>
        <h1 style={sizeh1Style}>Category</h1>
      </Alert>
      <MyAlert
        message={alertMessage}
        variant={alertVariant}
        show={showAlert}
        setShow={setShowAlert}
      />
      <div className="d-flex mb-3">
        <Button
          onClick={() => {
            setEditingCategory(null);
            setModalShow(true);
            setName("");
          }}
        >
          Add Category
        </Button>
        <InputGroup className="w-25 ms-4">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-search"></i>
          </InputGroup.Text>
          <FormControl
            placeholder="Search category"
            aria-label="Search"
            aria-describedby="basic-addon1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th style={actionColumnStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td style={actionColumnStyle}>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    setEditingCategory(category);
                    setModalShow(true);
                  }}
                >
                  Edit
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => deleteCategory(category.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingCategory ? "Edit Category" : "Add Category"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="mt-3" type="submit" variant="primary">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Category;
