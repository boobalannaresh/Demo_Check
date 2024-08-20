import React,{useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import "./allDsrDayKeyRoute.css";
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

export default function AllDsrDayKeyRoute() {
  const [dsrOptions, setDsrOptions] = useState([]);
  const [selectedDsr, setSelectedDsr] = useState(null);
  const [daysOptions, setDaysOptions] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch mechanics from the users table
    const fetchDsr = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('userid, shopname, name, role')
        .eq('role', 'representative');

      if (error) console.error('Error fetching Retailers:', error);
      else setDsrOptions(data.map(retailer => ({ value: retailer.userid, label: retailer.shopname, name: retailer.name })));
    };

    // Fetch mechanics from the users table
    const fetchDays = async () => {
      const { data, error } = await supabase
        .from('visiting_days')
        .select('visitingdayid, visitingday');

      if (error) console.error('Error fetching Visiting Days:', error);
      else setDaysOptions(data.map(retailer => ({ value: retailer.visitingdayid, label: retailer.visitingday})));
    };

    fetchDsr();
    fetchDays();
  }, []);

  const handleFilter = () => {
    let filtered = [];
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setSelectedDsr(null);
    setSelectedDay(null);
    setFilteredData([]);
    // setFilterApplied(false);
  };

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: !selectedDsr ? 'red' : provided.borderColor,
      '&:hover': {
        borderColor: !selectedDsr ? 'red' : provided.borderColor,
      },
    }),
  };


  return (
    <main id='main' className='main'>
 <Container className="mt-4">
 <Row className="mb-4">
          <Col>
            <h4 className="text-center">All DSR Day Key Route </h4>
          </Col>
        </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formRepresentative">
            <Form.Label>Select Representative</Form.Label>
            <Select
                value={selectedDsr}
                onChange={setSelectedDsr}
                options={dsrOptions}
                placeholder="Select Representative"
                styles={customSelectStyles}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formDay">
            <Form.Label>Select Visiting Day</Form.Label>
            <Select
              value={selectedDay}
              onChange={setSelectedDay}
              options={daysOptions}
              placeholder="Select Visiting Day"
              styles={customSelectStyles}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <Button variant="primary" onClick={handleFilter} block>Filter</Button>
        </Col>
        <br/>
        <Col md={6}>
          <Button variant="secondary" onClick={handleReset} block>Reset</Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>SL</th>
                <th>Account</th>
                <th>Visiting Day</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.account}</td>
                  <td>{data.visitingDay}</td>
                  <td>
                    <Button variant="warning" size="sm" onClick={()=> navigate("/portal/retailer-summary")}>Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
    </main>
  )
}
