import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import Header from '../Home/Header/Header';

const BookShow = (props) => {
    const columns = ["A", "B", "C", "D", "E"];
    const rows = [1, 2, 3, 4, 5, 6, 7, 8];

    const { name, selectedDay, selectedTime, movieId, bookedBy } = props.location.
        state;
    const [bookings, setBookings] = useState();
    useEffect(() => {
        let day = new Date(selectedDay).toISOString().split("T")[0];
        console.log({ day });
        const url = `http://localhost:5000/getBooking?selectedDay=${day}&selectedTime=${selectedTime}&movieId=${movieId}&bookedBy=${bookedBy}`
        // console.log(url);
        // console.log({ name, selectedDay, selectedTime, movieId, bookedBy });
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // if (data.length === 0) {
                //     console.log("yes");
                // } else {
                //     console.log(data);

                // }
                setBookings(data)
            })
    }, [name, selectedDay, selectedTime, movieId, bookedBy])
    return (
        <div>
            <Header />
            <Container>
                <Row>
                    <Col className="text-center">
                        <h1>BookShow</h1>
                        <h2>Movie: {name}</h2>
                        <h3>Date: {new Date(selectedDay).toLocaleString().split(',')[0]}</h3>
                        <h3>Time: {selectedTime}</h3>
                    </Col>
                </Row>
                <div>
                    {
                        columns.map(col =>
                            <Row>{
                                rows.map(row =>

                                    <Col>
                                        <Button
                                            style={{
                                                margin: "5px"
                                            }}
                                        >
                                            <p>Seat: {col}{row}</p>
                                            <Image src={require("../../images/ticket-alt-solid.png").default} fluid size="32" /></Button>
                                    </Col>
                                )
                            }</Row>
                        )
                    }
                </div>
            </Container>
        </div>
    );
};

export default BookShow;