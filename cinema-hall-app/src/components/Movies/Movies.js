import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { UserContext } from '../../App';
import Movie from '../Movie/Movie';

const Movies = () => {
    const [movies, setEvents] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('https://cinema-hall-s.herokuapp.com/getAllMovies')
            .then(res => res.json())
            .then(data => setEvents(data));
    }, [])

    return (
        <Container>
            <h1 className="text-center">Now Showing</h1>
            {/* <Header /> */}
            <div className="row">
                {
                    movies.map(movie => <Movie key={movie._id} movie={movie} />)
                }
            </div>
        </Container>
    );
};

export default Movies;