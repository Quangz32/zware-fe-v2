import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

import HomeAd from "./components/home/HomeAd";
import Home from "./components/home/Home";
import ProtectedRoute from './components/login/ProtectedRoute';

import Sidebar from "./components/sidebar/Sidebar";
import WarehouseManagement from "./components/warehouse/WarehouseManagement";
import Login from "./components/login/Login";

import TestComponent from "./components/test/TestComponent";
import TestComponent2 from "./components/test/TestComponent2";
import ProductList from "./components/product/ProductList";
import UserList from "./components/manager/UserList";

import Category from "./components/category/Category";
import Profile from "./components/profile/Profile";

import TransactionManagement from "./components/transaction/TransactionManagement";

import WarehouseItemManagement from "./components/warehouseitem/WarehouseItemManagement";
// import DisposalGoods from "./components/disposalgoods/DisposalGoodsPage";
// import DisposalGoodsPage from "./components/disposalgoods/DisposalGoodsPage";
import MaWarehouseItemManagement from "./components/warehouseitemmanager/MaWarehouseItemManagement";
import WarehouseHistory from "./components/history/WarehouseHistory";

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

            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/adhome" element={<HomeAd />} />
            </Route>

            <Route path="warehouses" element={<WarehouseManagement />} />

            <Route path="products" element={<ProductList />} />
            <Route path="managers" element={<UserList />} />
            {/* <Route path="inbound" element={<InboundTransactionManagement />} /> */}
            {/* <Route path="outbound" element={<OutboundTransactions />} /> */}
            <Route path="transactions" element={<TransactionManagement />} />
            <Route path="categories" element={<Category />} />

            <Route path="profile" element={<Profile />} />
            <Route path="warehouseitems" element={<WarehouseItemManagement />} />
            <Route path="managerwarehouseitems" element={<MaWarehouseItemManagement />} />

            <Route path="history" element={<WarehouseHistory />} />

            {/* <Route path="disposedgoods" element={<DisposalGoodsPage />} /> */}

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
