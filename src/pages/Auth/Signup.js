import React, { useCallback, useContext } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import firebase from '@firebase/app';
import Container from '@material-ui/core/Container';
import { AuthContext } from '../../contexts/AuthContext';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    // container: {
    //   display: 'flex',
    //   flexWrap: 'wrap',
    // },
    // textField: {
    //   marginLeft: theme.spacing(1),
    //   marginRight: theme.spacing(1),
    // },
    // dense: {
    //   marginTop: theme.spacing(2),
    // },
    // menu: {
    //   width: 200,
    // },
  }));

const Signup = ({ history }) => {
    const classes = useStyles();

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
            <div className="login-form">
                <h1>Sign up</h1>
                <form className={classes.container} onSubmit={handleSignup}>
                    <div>
                        <TextField
                            id="outlined-email-input"
                            name="email"
                            label="Email"
                            className={classes.textField}
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            fullWidth
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-password-input"
                            name="password"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            fullWidth
                            variant="outlined"
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Create account
                    </Button>
                
                </form>
                <div className="create-account-link">
                    <p><Link to="login">Log in</Link></p>
                </div>
            </div>
        </Container>
    );
};

export default withRouter(Signup);