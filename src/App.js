import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import User from "./components/user/User";
import Home from "./components/home/Home";
import Sidebar from "./components/sidebar/Sidebar";
import WarehouseManagement from "./components/warehouse/WarehouseManagement";
import Login from "./components/login/Login";
import ProductManagement from "./components/product/ProductManagement";
// import TestComponent2 from "./components/TestComponent2";
import InboundTransactions from "./components/inbound/InboundTransactions";
import Category from "./components/category/Category";
import Profile from "./components/profile/Profile";

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

      <div style={contentStyle} className="pt-5 bg-light">
        <Container>
          <Routes>
            <Route path="users" element={<User />} />
            <Route path="login" element={<Login />} />

            <Route path="home" element={<Home />} />
            <Route path="warehouses" element={<WarehouseManagement />} />
            <Route path="products" element={<ProductManagement />} />

            <Route path="inbound" element={<InboundTransactions />} />
            <Route path="category" element={<Category />} />
            <Route path="profile" element={<Profile />} />

            
            {/* <Route path="test2" element={<TestComponent2 />} /> */}
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
