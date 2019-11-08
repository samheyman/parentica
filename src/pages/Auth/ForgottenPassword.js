import React, { useCallback, useContext, useState } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { LocaleContext } from '../../contexts/LocaleContext';
import SmallLoader from '../../components/Widgets/SmallLoader';
import DoneIcon from '@material-ui/icons/Done';

// Auth
import { useAuth } from '../../contexts/AuthContext';

// Translated text
import TranslatedText from '../../components/TranslatedText';

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

const ForgottenPassword = ({ history }) => {
    const classes = useStyles();
    const { sendPasswordResetEmail, isLoading} = useAuth();
    const [ state, setState ] = useState({ success: false, error: false });

    const resetPassword = useCallback(async event => {
        setState({ success: false, error: false });
        event.preventDefault();
        const {email} = event.target.elements;
        sendPasswordResetEmail(email.value)
        .then((response) => {
            response ? 
                setState({ success: true }) 
                : 
                setState({ error: true });
        })
        .catch ((error) => {
            console.log("Error resetting password: " + error);
            setState({ error: true });
        })
    }, [history]);

    return(
        <Container className="main-content">
            <div className="login-form">
                <h1><TranslatedText id={`signin.forgottenPassword`}/></h1>
                
                <form className={classes.container} onSubmit={resetPassword}>
                    <div style={{textAlign:'left'}}>
                        <label>
                            <TranslatedText id={`contact.email`} />
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
                    <div className={"error-message " + (state.error ? "show" : "hide")} >
                        <span><TranslatedText id="signup.passwordReset.sorryError" /></span>
                    </div>
                    <div className={"success-message " + (state.success ? "show" : "hide")} 
                        style={{margin:'0px'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <DoneIcon className="success-icon"/>
                            <TranslatedText id="signup.passwordReset.success" />
                            <br/><br />
                            <Link to="login">
                                <TranslatedText id="signup.backToLogin" />
                            </Link>
                        </div>
                    </div>
                    <div className={(state.success ? "hide" : "show")} >
                        {(!isLoading) ?
                            (<Button type="submit" variant="contained" className="signIn-signUp">
                                <TranslatedText id={`signin.resetPassword`} />
                            </Button>)
                            :
                            (<Button type="submit" variant="contained" className="loading">
                                <SmallLoader style={{ height:'40px'}} />
                            </Button>)            
                        }
                        <div>
                            <Link to="login">
                                <TranslatedText id={`general.cancel`}/>
                            </Link>
                        </div>
                    </div>
                </form>
                
            </div>
            
        </Container>
    );
};

export default withRouter(ForgottenPassword);