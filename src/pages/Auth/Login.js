import React, { useCallback, useContext, useState } from 'react';
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
import SmallLoader from '../../components/Widgets/SmallLoader';

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
    const [ isLoading, setIsLoading ] = useState(false);

    const handleSignup = useCallback(async event => {
        event.preventDefault();
        setIsLoading(true);
        const {email, password} = event.target.elements;
        try {
            await firebase
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
                history.push("providers");
        } catch (error) {
            setIsLoading(false);
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
                <div className="create-account-link">
                    <span className="signUp-link">
                        <FormattedMessage id={`contact.noAccount.${locale}`}/>
                        {/* &nbsp;
                        <FormattedMessage id={`general.please.${locale}`}/> */}
                        &nbsp;
                        <Link to="signup"><FormattedMessage id={`navbar.signup.link.${locale}`}/></Link>
                    </span>
                </div>
                <form className={classes.container} onSubmit={handleSignup}>
                    <div style={{textAlign:'left'}}>
                        <label>
                            <FormattedMessage id={`contact.email.${locale}`} />
                        </label>
                        <TextField
                            id="outlined-email-input"
                            name="email"
                            // label={<FormattedMessage id={`contact.email.${locale}`} />}
                            className={classes.textField}
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            fullWidth
                            variant="outlined"
                        />
                    </div>
                    <div style={{marginTop:'30px',textAlign:'left'}}>
                    <label>
                        <FormattedMessage id={`general.password.${locale}`} />
                    </label>
                        <TextField
                            id="outlined-password-input"
                            name="password"
                            // label={<FormattedMessage id={`general.password.${locale}`} />}
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            fullWidth
                            variant="outlined"
                        />
                    </div>
                    {(!isLoading) ?
                        (<Button type="submit" variant="contained" className="signIn-signUp">
                            <FormattedMessage id={`navbar.login.link.${locale}`} />
                        </Button>)
                        :
                        (<Button type="submit" variant="contained" className="loading">
                            <SmallLoader style={{ height:'40px'}} />
                            &nbsp;&nbsp;
                            <FormattedMessage id={`general.pleaseWait.${locale}`} />...
                        </Button>)            
                    }
                </form>
                
            </div>
        </Container>
    );
};

export default withRouter(Login);