import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
const Movie = ({ movie }) => {
    const [selectedDay, setselectedDay] = useState();

    const handleDayClick = function (day) {
        setselectedDay(day);
        console.log(selectedDay)
    }

    return (
        <div className="col-md-6" id="event" id={movie._id}>
            <div className="row">
                <div className="col-md-4"> <Image src={require(`../../posters/${movie.pic}`).default} fluid /></div>
                <div className="col-md-4">
                    <h1>{movie.name}</h1>
                    <p>{movie.activityDate}</p>
                    {/* <button onClick={(e) => cancelEvent(e, movie._id)}>Cancel</button> */}
                    <div>
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
                    </div>

                </div>
            </div>
        </div >
    );
};

export default Movie;