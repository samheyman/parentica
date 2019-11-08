import React, { useCallback, useContext, useState } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import firebase from '@firebase/app';
import Container from '@material-ui/core/Container';
// import { AuthContext } from '../../contexts/AuthContext';
import { useAuth } from '../../contexts/AuthContext';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { LocaleContext } from '../../contexts/LocaleContext';
import SmallLoader from '../../components/Widgets/SmallLoader';

// Mui imports
import Radio from '@material-ui/core/Radio';

// Text translation
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

const Signup = ({ history }) => {
    const classes = useStyles();
    const { locale } = useContext(LocaleContext);
    // const [ isLoading, setIsLoading ] = useState(false);
    const [ provider, setProvider] = useState('false');
    // const [ companyName, setCompanyName] = useState('');
    const auth = useAuth();

    const handleSignup = useCallback(async event => {
        event.preventDefault();
        // setState(state => ({ ...state, isLoading: true}));
        const {email, password, companyName, userType} = event.target.elements;
        const provider = (userType.value==='provider') ? true : false;
        // const collection = (isProvider) ? 'providers' : 'users';
        console.log("Signing up " + email.value + " as: " + userType.value );

        // get form values and show loading symbol

        // sign user up (firebase or other)

        // add to users database (firebase or other)

        // save to authcontext
        // await signUpUser();
        auth.signUp(email.value, password.value, provider, companyName);
        // redirect and stop loading symbol
        // console.log(state);

    }, [history]);

    return(
        <Container className="content">
            <div className="login-form">
                <h1><TranslatedText id="navbar.signup.link" defaultText="Sign up"/></h1>
                <form className={classes.container} onSubmit={handleSignup}>
                    <div className="provider-selector" style={{marginTop:'30px',textAlign:'left'}}>
                        <div style={{ paddingBottom:'10px'}}>
                            <label className="provider-label">
                                <TranslatedText id="signup.signUpAs"/>
                            </label>
                        </div>
                        <div style={{}}>
                            <Radio
                                checked={provider === 'false'}
                                onChange={(e) => setProvider('false')}
                                value='parent'
                                name="userType"
                                inputProps={{ 'aria-label': 'A' }}
                            />
                            <label htmlFor="parent" className="provider-label--option">
                                &nbsp;&nbsp;
                                <TranslatedText id="signup.asParent"/>
                            </label> 
                        </div>
                        <div style={{ marginTop:'10px'}}>
                            <Radio
                                checked={provider === 'true'}
                                onChange={(e) => setProvider('true')}
                                value='provider'
                                name="userType"
                                inputProps={{ 'aria-label': 'A' }}
                            />
                            <label htmlFor="provider" className="provider-label--option">
                                &nbsp;&nbsp;
                                <TranslatedText id="signup.asProvider"/>
                            </label>
                        </div>
                    </div>
                    {
                        (provider === 'true') ?
                            (
                                <React.Fragment>
                                    <div style={{marginTop:'20px',textAlign:'left'}}>
                                        <label className="required" >
                                            <TranslatedText id="signup.companyName" defaultText="Company Name"/>
                                        </label>
                                        <TextField
                                            required
                                            id="outlined-company-name-input"
                                            className={classes.textField}
                                            type="text"
                                            name="companyName"
                                            margin="normal"
                                            fullWidth
                                            variant="outlined"
                                            // onChange={(e) => setCompanyName(e.currentTarget.value)}
                                        />
                                    </div>
                                </React.Fragment>
                            )
                            :
                            (null)
                    }
                    <div style={{marginTop:'20px',textAlign:'left'}}>
                        <label className="required" >
                            <TranslatedText id="contact.email" defaultText="Email"/>
                        </label>
                        <TextField
                            required
                            id="outlined-email-input"
                            name="email"
                            className={classes.textField}
                            type="email"
                            autoComplete="email"
                            margin="normal"
                            placeholder="e.g. your@email.com"
                            fullWidth
                            variant="outlined"
                        />
                    </div>
                    <div style={{marginTop:'20px',textAlign:'left'}}>
                        <label className="required" >
                            <TranslatedText id="general.password" defaultText="Password"/>
                        </label>
                        <TextField
                            required
                            id="outlined-password-input"
                            name="password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            fullWidth
                            variant="outlined"
                        />
                    </div>
                    {(!auth.isLoading) ?
                        (<Button type="submit" variant="contained" className="signIn-signUp">
                            <TranslatedText id="navbar.signup.link" defaultText="Sign up"/>
                        </Button>)
                        :
                        (<Button type="submit" variant="contained" className="loading">
                            <SmallLoader style={{ height:'40px'}} />
                            {/* &nbsp;&nbsp;
                            <FormattedMessage id={`general.pleaseWait.${locale}`} />... */}
                        </Button>)            
                    }    
                    <div className="create-account-link">
                        <p style={{margin:'0'}}>
                            <TranslatedText id="navbar.alreadyAccount" defaultText="Already have an account?"/>
                            &nbsp;
                            <Link to="login" className="link--grey">
                                <TranslatedText id="navbar.login.link" defaultText="Log in"/>
                            </Link>
                        </p>
                </div>            
                </form>
            </div>
        </Container>
    );
};

export default withRouter(Signup);