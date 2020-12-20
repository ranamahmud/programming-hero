import React, { useContext } from 'react';
import { Button, Container, Image, Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import './Header.css';
import "firebase/auth";
import firebase from 'firebase/app'
import firebaseConfig from '../../../firebaseConfig';
const Header = () => {
    const history = useHistory();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const logout = () => {

        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            sessionStorage.setItem('token', null);
            setLoggedInUser(null)
            history.replace('/');
        }).catch(function (error) {
            // An error happened.
        });
    }

    return (
        <Container id="header">
            <Navbar bg="light" variant="light">
                <Link className="navbar-brand" to="/">
                    <Image id="logo" src={require("../../../logos/film-solid.png").default} height="64" />
                </Link>
                <Nav className="ml-auto">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <Link className="navbar-brand" to="#features">Destination</Link>
                    <Link className="navbar-brand" to="/event-tasks">Events</Link>
                    <Link className="navbar-brand" to="#pricing">Blog</Link>


                    {

                        (loggedInUser && loggedInUser.email) ?
                            <>
                                <Button variant="dark" id="login-btn" onClick={logout}>Logout</Button>
                                <p>{loggedInUser.userName}</p>
                            </>
                            :
                            <Link className="nav-link text-white" to="/login">
                                <Button variant="dark" id="login-btn">Login</Button>
                            </Link>

                    }
                </Nav>

            </Navbar>
        </Container>
    );
};

export default Header;