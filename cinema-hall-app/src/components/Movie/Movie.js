import React from 'react';
import { Image } from 'react-bootstrap';

const Movie = ({ movie }) => {
    return (
        <div className="col-md-6" id="event" id={movie._id}>
            <div className="row">
                <div className="col-md-4"> <Image src={require(`../../posters/${movie.pic}`).default} fluid /></div>
                <div className="col-md-4">
                    <h1>{movie.name}</h1>
                    <p>{movie.activityDate}</p>
                    {/* <button onClick={(e) => cancelEvent(e, movie._id)}>Cancel</button> */}

                </div>
            </div>
        </div >
    );
};

export default Movie;