import React, { useCallback, useContext } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import firebase from '@firebase/app';
import Container from '@material-ui/core/Container';
import { AuthContext } from '../../contexts/AuthContext';

const Login = ({ history }) => {
    const handleSignup = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            await firebase
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
                history.push("providers");
        } catch (error) {
            console.log("Error signing up: " + error);
        }
    }, [history]);

    const { currentUser } = useContext(AuthContext);

    if(currentUser) {
        console.log("User signed in: " + currentUser.email);
        return <Redirect to="providers" />;
    }

    return(
        <Container className="main-content">
        <h1>Log in</h1>
        <form onSubmit={handleSignup}>
            <label>
                Email
                <input name="email" type="email" placeholder="Email" />
            </label>
            <label>
                Password
                <input name="password" type="password" placeholder="Password" />
            </label>
            <button type="submit">Log in</button>
        </form>
        </Container>
    );
};

export default withRouter(Login);