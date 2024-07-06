import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DisposalGoodsList from "./DisposalGoodsList";
import CreateDisposalForm from "./DisposalGoodsForm";
// import ExpiredProducts from "./ExpiredProducts";
 function DisposalGoods() {
  return (
    <Router>
      <Routes>
        <Route path="disposedgoods" element={<DisposalGoodsList />} />
        <Route path="/create-disposal" element={<CreateDisposalForm />} />
        {/* <Route path="/expired-products" element={<ExpiredProducts />} /> */}
      </Routes>
    </Router>
  );
}

export default DisposalGoods;
