import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import Header from '../Home/Header/Header';

const BookShow = (props) => {
    const columns = ["A", "B", "C", "D", "E"];
    const rows = [1, 2, 3, 4, 5, 6, 7, 8];
    const [seats, setSeats] = useState();
    const { name, selectedDay, selectedTime, movieId, bookedBy } = props.location.
        state;
    const [bookings, setBookings] = useState();
    useEffect(() => {
        let day = new Date(selectedDay).toISOString().split("T")[0];
        console.log({ day });
        const url = `http://localhost:5000/getBooking?selectedDay=${day}&selectedTime=${selectedTime}&movieId=${movieId}`
        // const url = `http://localhost:5000/getBooking?selectedDay=${day}&selectedTime=${selectedTime}&movieId=${movieId}&bookedBy=${bookedBy}`
        // console.log(url);
        // console.log({ name, selectedDay, selectedTime, movieId, bookedBy });
        console.log({ url });
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // if (data.length === 0) {
                //     console.log("yes");
                // } else {
                //     console.log(data);

                // }
                console.log(data);

                let seatsData = {}
                for (const item of data) {
                    console.log(item);
                    seatsData[item.seat] = item.color;
                }
                // data.map(booking => ({
                //     seat: booking.seat,
                //     color: "red"

                // }));
                setSeats(seatsData);

                console.log(seatsData);
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
                            <Row key={col}>{
                                rows.map(row =>

                                    <Col key={col + row}>
                                        <Button
                                            style={{
                                                margin: "5px",
                                                backgroundColor: seats && seats[col + row] !== "" ? seats[col + row] : ""
                                            }}
                                        >
                                            <p>Seat: {col + row}</p>

                                            <Image src={require("../../images/ticket-alt-solid.png").default} fluid size="32" /></Button>
                                    </Col>
                                )
                            }</Row>
                        )
                    }
                </div>
            </Container>
        </div >
    );
};

export default BookShow;