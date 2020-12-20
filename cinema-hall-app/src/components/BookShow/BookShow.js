import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import Header from '../Home/Header/Header';

const BookShow = (props) => {
    const columns = ["A", "B", "C", "D", "E"];
    const rows = [1, 2, 3, 4, 5, 6, 7, 8];
    console.log(props.location.state);
    return (
        <div>
            <Header />
            <Container>
                <h1>BookShow</h1>
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
                                            <Image src={require("../../images/ticket-alt-solid.png").default} fluid /></Button>
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