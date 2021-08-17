import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import { getCurrentBookings } from "../../redux/actions/booking";
import Moment from "react-moment";
import moment from "moment";
import { Typeahead } from "react-bootstrap-typeahead";
import { getServiceProviders } from "../../redux/actions/serviceProvider";

const CurrentBooking = () => {
  const { currentBookings } = useSelector((store) => store.bookingRoot);
  const { serviceProviders } = useSelector(
    (store) => store.serviceProviderRoot
  );
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState("");
  const [serviceProvider, setServiceProvider] = useState([]);

  useEffect(() => {
    dispatch(getCurrentBookings());
    if (serviceProviders.length === 0) {
      dispatch(getServiceProviders());
    }
  }, []);

  useEffect(() => {
    setBookings(currentBookings);
  }, [currentBookings]);

  //Filter as per service date
  useEffect(() => {
    if (date) {
      let tempData = currentBookings.filter((o) => o.serviceDate == date);
      setBookings(tempData);
    }
  }, [date]);

  //Filter as per service provider
  useEffect(() => {
    if (serviceProvider.length > 0) {
      let tempData = currentBookings.filter(
        (o) => o.serviceProviderId == serviceProvider[0]._id
      );
      setBookings(tempData);
    }
  }, [serviceProvider]);

  const refreshHandler = () => {
    setBookings(currentBookings);
  };

  return (
    <>
      <Container>
        <Row className="mt-3">
          <Col md={10}></Col>
          <Col md={2}>
            <Button onClick={refreshHandler}>Refresh</Button>
          </Col>
        </Row>
        {console.log("ServiceProvider", serviceProvider)}
        <Row className="mt-2">
          <Col md={2}>
            <Form className="d-flex">
              <Form.Group>
                <Form.Label> Service Date</Form.Label>
                <Form.Control
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={3}>
            <Form className="d-flex">
              <Form.Group>
                <Form.Label> Service Date</Form.Label>
                <Typeahead
                  id="basic-typeahead-single"
                  labelKey="name"
                  onChange={setServiceProvider}
                  options={serviceProviders}
                  placeholder="Choose ServiceProvider ..."
                  selected={serviceProvider}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center">S.No ({bookings.length})</th>
                  <th className="text-center">Booking Id</th>
                  <th className="text-center">Services</th>
                  <th className="text-center">Booking time</th>
                  <th className="text-center">Service Date (yyyy/mm/dd)</th>
                  <th className="text-center">Time Slot</th>
                  <th className="text-center">Mode Of Payment</th>
                  <th className="text-center">Pay</th>
                  <th className="text-center">Customer Name</th>
                  <th className="text-center">SericeProvider Assigned</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length !== 0 ? (
                  bookings.map((b, index) => (
                    <tr>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{b.bookingId}</td>
                      <td>
                        <tr>
                          <td>Service</td>
                          <td>Actual Price</td>
                          <td>Discounted Price</td>
                        </tr>
                        {b.services.map((d) => (
                          <tr>
                            <td>{d.serviceName}</td>
                            <td>{d.actualPrice}</td>
                            <td>{d.discountedPrice}</td>
                          </tr>
                        ))}
                      </td>

                      <td className="text-center">{b.price}</td>
                      <td className="text-center">
                        <Moment>{b.timeOfBooking}</Moment>
                      </td>
                      <td className="text-center">{b.serviceDate}</td>
                      <td className="text-center">{b.timeSlot}</td>
                      <td className="text-center">{b.modeOfPayment}</td>
                      <td className="text-center">
                        {b.isPaid ? (
                          <strong>Paid</strong>
                        ) : (
                          <string>Pending</string>
                        )}
                      </td>
                      <td className="text-center">{b.customerName}</td>
                      <td>{b.serviceProviderName}</td>
                    </tr>
                  ))
                ) : (
                  <h5 className="text-center">Oops No new bookings found</h5>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CurrentBooking;
