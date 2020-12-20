import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import Header from '../Home/Header/Header';

const BookShow = (props) => {
    const columns = ["A", "B", "C", "D", "E"];
    const rows = [1, 2, 3, 4, 5, 6, 7, 8];
    const [seats, setSeats] = useState();
    const [userSeats, setUserSeats] = useState({});
    const [count, setCount] = useState(0)
    const { name, selectedDay, selectedTime, movieId, bookedBy } = props.location.
        state;
    const [bookings, setBookings] = useState();
    let day = new Date(selectedDay).toISOString().split("T")[0];
    useEffect(() => {
        const url = `http://localhost:5000/getUserBooking?selectedDay=${day}&selectedTime=${selectedTime}&movieId=${movieId}&bookedBy=${bookedBy}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCount(data.length);
            })
    }, [])

    useEffect(() => {
        const url = `http://localhost:5000/getBooking?selectedDay=${day}&selectedTime=${selectedTime}&movieId=${movieId}`
        fetch(url)
            .then(res => res.json())
            .then(data => {


                let seatsData = {}
                for (const item of data) {
                    seatsData[item.seat] = item.color;
                }
                setSeats(seatsData);
                setBookings(data)
            })
    }, [name, selectedDay, selectedTime, movieId, bookedBy])

    const handleClick = function (seat) {
        console.log(count)
        setCount(count + 1)
        var color;
        if (count < 10) {

            const seatSelected = {}
            seatSelected[seat] = seatSelected[seat] === "red" ? "" : "red";
            color = seatSelected[seat];
            setSeats({
                ...seats,
                ...seatSelected

            })

            setUserSeats({
                ...userSeats,
                ...seatSelected
            })

            const postUrl = `http://localhost:5000/addBooking?selectedDay=${day}&selectedTime=${selectedTime}&movieId=${movieId}&bookedBy=${bookedBy}&seat=${seat}&color=${color} `
            fetch(postUrl, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },

            })
        } else {
            alert("you can't book more than 10 seats")
        }

    }
    return (
        <div>
            <Header />
            <Container>
                <Row>
                    <Col className="text-center">
                        <h1>BookShow</h1>
                        <h2>Movie: {name}</h2>
                        <h3>Date: {day}</h3>
                        <h3>Time: {selectedTime}</h3>
                    </Col>
                    <h1>{bookings && bookings.length == 40 &&

                        <p p > House is full</p>
                    }</h1>
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
                                            disabled={seats && seats[col + row]}
                                            onClick={() => handleClick(col + row)}
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