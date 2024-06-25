import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./components/home/Home";
import Sidebar from "./components/sidebar/Sidebar";
import WarehouseManagement from "./components/warehouse/WarehouseManagement";
import Login from "./components/login/Login";
import TestComponent from "./components/test/TestComponent";
import TestComponent2 from "./components/test/TestComponent2";
import Category from "./components/category/Category";
import ManagerList from "./components/manager/ManagerList";
import ProductList from "./components/product/ProductList";

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  //main content style
  const contentStyle = !isLoginPage
    ? {
        marginLeft: "256px",
      }
    : {};

  return (
    <>
      <div>{!isLoginPage && <Sidebar />}</div>

      <div style={contentStyle} className="pt-5">
        <Container>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="warehouses" element={<WarehouseManagement />} />
            <Route path="products" element={<ProductList />} />
            <Route path="categories" element={<Category />} />
            <Route path="managers" element={<ManagerList />} />

            <Route path="test" element={<TestComponent />} />
            <Route path="test2" element={<TestComponent2 />} />
          </Routes>
        </Container>
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </>
  );
}

export default App;
