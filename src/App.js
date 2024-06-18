import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import User from "./components/user/User";
import Home from "./components/home/Home";
import Sidebar from "./components/sidebar/Sidebar";
import WarehouseManagement from "./components/warehouse/WarehouseManagement";
import TestComponent from "./components/TestComponent";
import Login from "./components/login/Login";

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  //main content style
  const contentStyle = !isLoginPage
    ? {
        marginLeft: "260px",
      }
    : {};

  return (
    <>
      <div>{!isLoginPage && <Sidebar />}</div>

      <div style={contentStyle} className="pt-5">
        <Container>
          <Routes>
            <Route path="users" element={<User />} />
            <Route path="login" element={<Login />} />

            <Route path="home" element={<Home />} />
            <Route path="warehouses" element={<WarehouseManagement />} />
            <Route path="test" element={<TestComponent />} />
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
