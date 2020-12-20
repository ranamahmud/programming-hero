import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Link } from 'react-router-dom';
const Movie = ({ movie }) => {
    const [selectedDay, setselectedDay] = useState();

    const handleDayClick = function (day) {
        setselectedDay(day);
        console.log(selectedDay)
    }

    return (
        <div className="col-md-6" id="event" id={movie._id}>
            <div className="row">
                <div className="col-md-4"> <Image src={require(`../../posters/${movie.pic}`).default} fluid />
                    <p style={{
                        fontSize: "25px"
                    }}>{movie.name}</p>
                </div>
                <div className="col-md-4">

                    <p>{movie.activityDate}</p>
                    {/* <button onClick={(e) => cancelEvent(e, movie._id)}>Cancel</button> */}
                    <h5 className="text-center">Select Show Date</h5>
                    <DayPicker
                        canChangeMonth={false}
                        initialMonth={new Date(movie.startDate)}
                        disabledDays={[

                            {
                                after: new Date(movie.endDate),
                                before: new Date(movie.startDate),
                            },
                        ]}
                        onDayClick={handleDayClick}
                        selectedDays={selectedDay}
                    />
                    <p>Show Time:</p>
                    <select className="custom-select" id="inputGroupSelect01"
                    // defaultValue={service.status}
                    // style={{
                    //     color: colors[service.status]
                    // }}
                    // onChange={handleChange}
                    // id={service._id}
                    // key={service._id}
                    >
                        <option value="9am"
                        // style={{ color: colors['Done'] }}
                        >09:00AM</option>
                        <option value="12pm"
                        // style={{ color: colors['On Going'] }}
                        >12:00PM</option>
                        <option value="3pm"
                        // style={{ color: colors['Pending'] }}
                        >03:00PM</option>
                        <option value="6pm">
                            06:00PM
                        </option>
                    </select>
                    <Link to={"/book-show/" + movie._id}>
                        <Button
                            style={{
                                marginTop: "10px",
                                marginLeft: "10px"
                            }}
                        >Select Seat</Button>
                    </Link>
                </div>
            </div>
        </div >
    );
};

export default Movie;