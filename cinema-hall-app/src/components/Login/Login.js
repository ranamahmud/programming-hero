import React, { useContext } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import './Login.css'
import firebase from 'firebase/app'
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';
import { UserContext } from '../../App';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';

export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

const Login = () => {
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } }
    const { productKey } = useParams();

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const googleSignIn = (e) => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, photoURL, email, uid } = res.user;
                console.log({ res })
                const signedInUser = {
                    isSignedIn: true,
                    userName: displayName,
                    email: email,
                    photo: photoURL,
                    success: true,
                    registrationDate: new Date(),
                    bookedBy: uid
                };

                setLoggedInUser(signedInUser);
                history.replace(from);
                // history.push(path, [state])



            })
            .catch(err => {
                console.log(err.message);
            })

        e.preventDefault();
    }


    return (

        <Container>
            <Row id="login-logo">
                <Col className="text-center">
                    <Link to="/">
                        <Image src={require("../../logos/film-solid.png").default} />
                    </Link>
                </Col>
            </Row>
            <Row id="login-form">
                <Form >

                    <div id="login-form-item">
                        <p>
                            Login with or Sign Up With Google
    </p>
                        <button variant="light" type="button" onClick={googleSignIn}>
                            <img src={require("../../logos/google.png").default} alt="" />
                            Login/Sign Up with Google
  </button>

                    </div>
                </Form>
            </Row>
        </Container>
    );
};

export default Login;