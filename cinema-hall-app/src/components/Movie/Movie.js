import React, { useContext, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
const Movie = ({ movie }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [selectedDay, setSelectedDay] = useState();
    const [selectedTime, setSelectedTime] = useState("09:00AM");
    const handleDayClick = function (day) {
        setSelectedDay(day);
    }
    const handleChange = (e) => {
        const time = e.target.value;
        setSelectedTime(time)
    };
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
                        defaultValue="09:00AM"
                        onChange={handleChange}

                    >
                        <option value="09:00AM"
                        >09:00AM</option>
                        <option value="12:00PM"
                        >12:00PM</option>
                        <option value="03:00PM"
                        >03:00PM</option>
                        <option value="06:00PM">
                            06:00PM
                        </option>
                    </select>
                    <Link

                        to={{
                            pathname: "/book-show/" + movie._id,
                            state: {
                                selectedDay: selectedDay,
                                selectedTime: selectedTime,
                                name: movie.name,
                                movieId: movie._id,

                                bookedBy: loggedInUser !== null ? loggedInUser.bookedBy : ""
                            }
                        }}
                    >
                        <Button
                            style={{
                                marginTop: "10px",
                                marginLeft: "10px"
                            }}

                            disabled={!(selectedDay && selectedTime)}
                        >Select Seat</Button>
                    </Link>
                </div>
            </div>
        </div >
    );
};

export default Movie;