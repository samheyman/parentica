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
import { FormattedMessage } from 'react-intl';
import { LocaleContext } from '../../contexts/LocaleContext';

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

const Login = ({ history }) => {
    const classes = useStyles();
    const { locale } = useContext(LocaleContext);

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
            <div className="login-form">
                <h1><FormattedMessage id={`navbar.login.link.${locale}`} /></h1>
                <form className={classes.container} onSubmit={handleSignup}>
                    <div>
                        <TextField
                            id="outlined-email-input"
                            name="email"
                            label={<FormattedMessage id={`contact.email.${locale}`} />}
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
                            label={<FormattedMessage id={`general.password.${locale}`} />}
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            fullWidth
                            variant="outlined"
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        <FormattedMessage id={`navbar.login.link.${locale}`} />
                    </Button>
                </form>
                <div className="create-account-link">
                    <p><FormattedMessage id={`contact.noAccount.${locale}`}/>&nbsp;
                    <Link to="contact"><FormattedMessage id={`contact.contactUs.${locale}`}/></Link></p>
                </div>
            </div>
        </Container>
    );
};

export default withRouter(Login);