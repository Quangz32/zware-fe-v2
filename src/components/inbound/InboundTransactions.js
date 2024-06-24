import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import FilterForm from "./FilterForm";
import TransactionTabs from "./TransactionTabs";
import AddTransactionModal from "./AddTransactionModal";

const InboundTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSave = (transaction) => {
    // Generate a unique id for the new transaction
    const newTransaction = { ...transaction, id: transactions.length + 1 };
    // Update transactions state with the new transaction
    setTransactions([...transactions, newTransaction]);
  };
  
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <Container>
      <h1>Inbound Transactions</h1>
      <Button variant="primary" onClick={handleShow}>Add New Inbound Transaction</Button>
      <FilterForm applyFilters={() => {}} resetFilters={() => {}} />
      <TransactionTabs transactions={transactions} />
      <AddTransactionModal show={showModal} handleClose={handleClose} handleSave={handleSave} />
    </Container>
  );
};

export default InboundTransactions;
