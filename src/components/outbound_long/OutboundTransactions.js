import React, { useState } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import FilterForm from "./FilterForm";
import TransactionTabs from "./TransactionTabs";
import AddTransactionModal from "./AddTransactionModal";

const OutboundTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSave = (transaction) => {
    const newTransaction = { ...transaction, id: transactions.length + 1 };
    setTransactions([...transactions, newTransaction]);
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleStatusChange = (transactionId, newStatus) => {
    const updatedTransactions = transactions.map(transaction =>
      transaction.id === transactionId ? { ...transaction, status: newStatus } : transaction
    );
    setTransactions(updatedTransactions);
  };

  return (
    <Container>
      <h1>Outbound Transactions</h1>
      <Button className='mb-3' variant="primary" onClick={handleShow}>
      <i className="bi bi-plus-circle me-1"></i>
      Add New Outbound Transaction</Button>
      <Alert variant="info" >
      <FilterForm applyFilters={() => {}} resetFilters={() => {}} />
      </Alert>
      <TransactionTabs transactions={transactions} handleStatusChange={handleStatusChange} />
      <AddTransactionModal show={showModal} handleClose={handleClose} handleSave={handleSave} />
    </Container>
  );
};

export default OutboundTransactions;
