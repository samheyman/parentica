import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import firebase from '@firebase/app';
import Container from '@material-ui/core/Container';

const Signup = ({ history }) => {
    const handleSignup = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
                history.push("providers");
        } catch (error) {
            console.log("Error signing up: " + error);
        }
    }, [history]);

    return(
        <Container className="main-content">
        <h1>Sign up</h1>
        <form onSubmit={handleSignup}>
            <label>
                Email
                <input name="email" type="email" placeholder="Email" />
            </label>
            <label>
                Password
                <input name="password" type="password" placeholder="Password" />
            </label>
            <button type="submit">Sign up</button>
        </form>
        </Container>
    );
};

export default withRouter(Signup);