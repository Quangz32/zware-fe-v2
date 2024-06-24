import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import MyAxios from "../../util/MyAxios";
import { Alert, Form, Row, InputGroup, Button } from "react-bootstrap";
import ProductForm from "./ProductForm";
import DeleteProduct from "./ProductDelete";

export default function ProductList() {
  const [productList, setProductList] = useState([]);
  const [filter, setFilter] = useState({ name: "", category: "all" });
  const [filtedProductList, setFiltedProductList] = useState([]);

  const handleFilter = useCallback(() => {
    const tempFiltedProducts = productList.filter((p) => {
      return (
        p.name.toLowerCase().includes(filter.name.toLowerCase()) &&
        (filter.category === "all" || p.category_name === filter.category)
      );
    });
    setFiltedProductList(tempFiltedProducts);
  }, [filter, productList]);

  const [categories, setCategories] = useState([]);

  //FORM
  const [showProductForm, setShowProductForm] = useState(false);
  const [productFormMode, setProductFormMode] = useState("add");
  const [productFormData, setProductFormData] = useState({});

  //DELETE
  const [showDeleteProduct, setShowDeleteProduct] = useState(false);
  const [productToDelete, setProductToDelete] = useState({});

  //fetch Categories Data
  useEffect(() => {
    const fetchCategories = async () => {
      await MyAxios.get("categories")
        .then((res) => {
          setCategories(res.data.data);
          // console.log(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchCategories();
  }, []);

  //fetch Products data
  useEffect(() => {
    const fetchData = async () => {
      // console.log("RUN fetch data");
      try {
        const response = await MyAxios.get("products");
        const productsFromApi = response.data.data;

        const fetchCategoryPromises = productsFromApi.map((p) =>
          MyAxios.get(`categories/${p.category_id}`)
        );

        const categoryResponses = await Promise.all(fetchCategoryPromises);

        const updatedProducts = productsFromApi.map((product, index) => ({
          ...product,
          category_name: categoryResponses[index].data.data.name,
        }));

        setProductList(updatedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [showProductForm, showDeleteProduct]);

  // //Filt product befor render
  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  return (
    <>
      {/* Product Filter */}

      <Form
        className=" d-flex  align-items-center p-2 mb-3 rounded-2"
        style={{ backgroundColor: "#ddd" }}
      >
        <i className="bi bi-funnel fs-4 mx-3"></i>
        <div className="row">
          <InputGroup className="col">
            <InputGroup.Text>{" Name "}</InputGroup.Text>
            <Form.Control
              value={filter.name}
              onChange={(e) => {
                setFilter((filter) => ({
                  ...filter,
                  name: e.target.value,
                }));
              }}
            />
          </InputGroup>
          <InputGroup className="col">
            <InputGroup.Text>{"Category"}</InputGroup.Text>
            <Form.Select
              value={filter.category}
              onChange={(e) => {
                setFilter((filter) => ({
                  ...filter,
                  category: e.target.value,
                }));
              }}
            >
              <option value="all">All</option>
              {categories &&
                categories.map((category) => (
                  <option value={category.name} key={category.id}>
                    {category.name}
                  </option>
                ))}
            </Form.Select>
          </InputGroup>
        </div>
        <div className="d-flex align-items-center">
          <Button
            variant="danger"
            className="py-0 ms-3"
            onClick={() => {
              setFilter({ name: "", category: "all" });
            }}
          >
            <i className="bi bi-trash fs-5"></i>
          </Button>
          <div className="vr ms-2 me-2"></div>
        </div>
      </Form>

      {filtedProductList.length === 0 && (
        <Alert style={{ maxWidth: "500px" }}>There are no product here</Alert>
      )}

      <Button
        variant="success"
        className="d-flex align-items-center mb-3"
        onClick={() => {
          setProductFormMode("add");
          setShowProductForm(true);
        }}
      >
        <i className="bi bi-plus-square fs-6 me-3"></i>
        Add product
      </Button>

      <Row>
        {filtedProductList.length > 0 &&
          filtedProductList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              //props for FORM
              setShowForm={setShowProductForm}
              setFormMode={setProductFormMode}
              setFormData={setProductFormData}
              // props for DELETE
              setShowDeleteProduct={setShowDeleteProduct}
              setProductToDelete={setProductToDelete}
            ></ProductCard>
          ))}
      </Row>

      <ProductForm
        show={showProductForm}
        setShow={setShowProductForm}
        mode={productFormMode}
        categories={categories}
        product={productFormData}
      ></ProductForm>

      <DeleteProduct
        show={showDeleteProduct}
        setShow={setShowDeleteProduct}
        product={productToDelete}
      ></DeleteProduct>
    </>
  );
}
