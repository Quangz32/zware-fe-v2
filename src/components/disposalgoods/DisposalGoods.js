import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WarehouseItemManagement from "./WarehouseItemManagement";
import CreateDisposalForm from "./CreateDisposal";
// import DisposalGoodsList from "./components/disposal/DisposalGoodsList"; // Assuming you have this component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/disposedgoods" element={<DisposalGoodsList />} /> */}
        <Route path="/create-disposal" element={<CreateDisposalForm />} />
        <Route path="/warehouse-items" element={<WarehouseItemManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
