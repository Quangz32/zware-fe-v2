import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const FilterForm = ({ applyFilters, resetFilters }) => {
  return (
    <Form className="filter-form">
      <Row>
        <Col md={3}>
          <Form.Group controlId="startDate">
            <Form.Label><strong>Start</strong></Form.Label>
            <Form.Control type="date" placeholder="Start Date" />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="endDate">
            <Form.Label><strong>End</strong></Form.Label>
            <Form.Control type="date" placeholder="End Date" />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="productNameFilter">
            <Form.Label><strong>Product Name</strong></Form.Label>
            <Form.Control type="text" placeholder="Product Name" />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="statusFilter">
            <Form.Label><strong>Status</strong></Form.Label>
            <Form.Control as="select">
              <option value="">Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="sourceFilter">
            <Form.Label><strong>Source</strong></Form.Label>
            <Form.Control type="text" placeholder="Source" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          <Button className='mt-3  ' variant="primary" block onClick={applyFilters}>Apply Filters</Button>
        </Col>
        <Col md={2}>
          <Button className='mt-3 mb-3 ' variant="secondary" block onClick={resetFilters}>Clear Filters</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterForm;
