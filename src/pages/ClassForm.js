import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { FormattedMessage } from 'react-intl';
import { LocaleContext } from '../contexts/LocaleContext';
import Spinner from 'react-spinner-material';
import MenuItem from '@material-ui/core/MenuItem';


class ClassForm extends Component {
    static contextType = LocaleContext;

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            company: '',
            message: '',
            touched: {
                firstname: false,
                lastname: false,
                email: false,
                message: false
            },
            success: false,
            showError: false,
            loading: false
        };
        this.toggleSuccess = this.toggleSuccess.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.validate = this.validate.bind(this);
    }

    toggleSuccess() {
        this.setState({
            success: !this.state.success,
            loading: false
        });
    }

    toggleShowError() {
        this.setState({
            showError: !this.state.showError
        });
    }

    validate(firstname, lastname, email, message, locale) {

        const errors = {
            firstname: '',
            lastname: '',
            email: '',
            message: ''
        };

        if (this.state.touched.firstname && firstname.length < 3)
            errors.firstname = <FormattedMessage id={`contact.error.firstName.tooShort.${locale}`}>
                                {(txt) => txt}
                              </FormattedMessage>;
        else if (this.state.touched.firstname && firstname.length > 20)
            errors.firstname = <FormattedMessage id={`contact.error.firstName.tooLong.${locale}`}>
                                    {(txt) => txt}
                                </FormattedMessage>;

        if (this.state.touched.lastname && lastname.length < 3)
            errors.lastname = <FormattedMessage id={`contact.error.lastName.tooShort.${locale}`}>
                                        {(txt) => txt}
                                </FormattedMessage>;
        else if (this.state.touched.lastname && lastname.length > 20)
            errors.lastname = <FormattedMessage id={`contact.error.lastName.tooLong.${locale}`}>
                                    {(txt) => txt}
                                </FormattedMessage>;
            
        if (this.state.touched.message && message.length < 1)
            errors.message = <FormattedMessage id={`contact.error.message.empty.${locale}`}>
                                    {(txt) => txt}
                                </FormattedMessage>;

        // const re = /^\d+$/;
        const re = /\S+@\S+\.\S+/;        ;
        // const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        // const re = /^(([^<>()[].,;:\s@"]+([^<>()[].,;:\s@"]+)*)|(".+"))@(([^<>()[].,;:\s@"]+.)+[^<>()[].,;:\s@"]{2,})$/i;
        if (this.state.touched.email && !re.test(email)) 
            errors.email = <FormattedMessage id={`contact.error.email.invalid.${locale}`}>
                                    {(txt) => txt}
                                </FormattedMessage>;
        
        return errors; 
    }

    handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({loading:true});
        this.sendContactUsData(this.state);
    }

    sendContactUsData(data) {
        // delete data.touched;
        console.log(data);
        return fetch('https://us-central1-app23980.cloudfunctions.net/sendContactUsEmail', {
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Credentials': 'true',
                // 'Access-Control-Allow-Origin': '*'
            }
        }).then(response => {
            if (response.status===0 || (response.status >= 200 && response.status < 300)) {
                console.log("Messsage successfully sent: status " + response.status);
                this.toggleSuccess();
                // window.location.reload();
                return response;
            } else {
                this.setState({loading:false});
                console.log('Somthing went wrong: ' + response.status + ' error.');
                this.toggleShowError();
            }
        }).catch(err => {
            this.setState({loading:false});
            console.log("Error sending the contact form data.");
            this.toggleShowError();
        });
    }

    render() {
        const locale = this.context.locale;
        const Loader = () => {
            return(
                <div className="loading-spinner">
                    <Spinner size={80} spinnerColor={"#333"} spinnerWidth={4} visible={true} />
                </div>
            );
        }
        let isValid=false;
        const errors = this.validate(
            this.state.firstName, 
            this.state.lastName, 
            this.state.email, 
            this.state.message,
            locale );
        if (this.state.touched.firstname && errors.firstname==="" && errors.lastname==="" && errors.email==="" && errors.message==="") { 
            isValid = true
        }
        return(
                <Container className="main-content">
                    <Grid container className="contact-form">
                        <Grid item xs={12} sm={12} >
                            <h2>
                                New Class
                            </h2>           
                    
                            <form className={"contact-form " + (this.state.success ? "hide" : "show")} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                                <div className="provider-form-item">
                                    <label className="ant-form-item-required" title="Customer">Class name: </label>
                                    <TextField
                                        id="class-name"
                                        label=""
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </div>
                                <div className="provider-form-item">
                                    <label className="ant-form-item-required" title="Customer">Format: </label>
                                    <TextField
                                        id="type"
                                        select
                                        value="Group class"
                                        helperText=""
                                        margin="normal"
                                        variant="outlined"
                                    >
                                        <MenuItem key='' value='Group class'>
                                            Group class
                                        </MenuItem>
                                        <MenuItem key='' value='Meetup'>
                                            Meetup
                                        </MenuItem>
                                    </TextField>
                                </div>
                                <div className="provider-form-item">
                                    <label className="ant-form-item-required" title="Customer">Tags: </label>
                                    <TextField
                                        id="class-name"
                                        label=""
                                        margin="dense"
                                        variant="outlined"
                                        placeholder="e.g. 'parenting', 'yoga"
                                    />
                                </div>
                                <div className="provider-form-item">
                                    <label className="ant-form-item-required" title="Customer">City: </label>
                                    <TextField
                                        id="class-name"
                                        label=""
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </div>
                                <div className="provider-form-item">
                                    <label className="ant-form-item-required" title="Customer">District: </label>
                                    <TextField
                                        id="class-name"
                                        label=""
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </div>
                                <div className="provider-form-item">
                                    <label className="ant-form-item-required" title="Customer">Address of venue: </label>
                                    <TextField
                                        id="class-name"
                                        label=""
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </div>
                                <div className="provider-form-item">
                                    <label className="ant-form-item-required" title="Customer">Date: </label>
                                    <TextField
                                        id="class-name"
                                        label=""
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </div>
                                <div className="provider-form-item">
                                    <label className="ant-form-item-required" title="Customer">Time: </label>
                                    <TextField
                                        id="class-name"
                                        label=""
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </div>
                                <div className="provider-form-item">
                                    <label className="ant-form-item-required" title="Customer">Duration: </label>
                                    <TextField
                                        id="class-name"
                                        label=""
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </div>
                                <div className="provider-form-item">
                                    <label className="ant-form-item-required" title="Customer">Sessions: </label>
                                    <TextField
                                        id="class-name"
                                        label=""
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </div>
                                <div className="provider-form-item">
                                    <label className="ant-form-item-required" title="Customer">Url: </label>
                                    <TextField
                                        id="class-name"
                                        label=""
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </div>
                                <div className="provider-form-item">
                                    <label className="ant-form-item-required" title="Customer">Image: </label>
                                    <TextField
                                        id="class-name"
                                        label=""
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </div>
                                <div className="provider-form-item">
                                    <label className="ant-form-item-required" title="Customer">Company name: </label>
                                    <TextField
                                        id="class-name"
                                        label=""
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </div>
                                <div className="provider-form-item">
                                    <label className="ant-form-item-required" title="Customer">Company logo: </label>
                                    <TextField
                                        id="class-name"
                                        label=""
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </div>
                                <div className="provider-form-item">
                                    <label className="ant-form-item-required" title="Customer">Price: </label>
                                    <TextField
                                        id="class-name"
                                        label=""
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </div>
                                <div className="provider-form-item">
                                    <label className="ant-form-item-required" title="Customer">Price (couples): </label>
                                    <TextField
                                        id="class-name"
                                        label=""
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </div>
                                <div className="provider-form-item">
                                    <label className="ant-form-item-required" title="Customer">Language: </label>
                                    <TextField
                                        id="language"
                                        select
                                        label=""
                                        value='Español'
                                        helperText=""
                                        margin="normal"
                                        variant="outlined"
                                    >
                                        <MenuItem key='' value='Español'>
                                            Español
                                        </MenuItem>
                                        <MenuItem key='' value='English'>
                                            English
                                        </MenuItem>
                                    </TextField>
                                </div>
                                <div className="provider-form-item">
                                    <label className="ant-form-item-required" title="Customer">Description: </label>
                                    <TextField
                                        id="description"
                                        label=""
                                        multiline
                                        rowsMax="70"
                                        value=''
                                        margin="normal"
                                        helperText=""
                                        variant="outlined"
                                    />
                                </div>
                                
                                
                                <div className="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                                    { !this.state.loading ?
                                    <div className="form-buttons">
                                        <Button disabled={!isValid} variant="contained" className="send-form-data primary" type="submit" >
                                            <Icon>
                                                &nbsp;send
                                            </Icon>
                                            &nbsp;Send
                                        </Button>
                                        <Link to={{pathname:`/${locale.split('-')[0]}/providers`}}>
                                        <Button variant="outlined" className="cancel-form-data secondary">
                                            <Icon>
                                                &nbsp;close
                                            </Icon>
                                            Cancel
                                        </Button>
                                        </Link>
                                    </div>
                                    :
                                    <Loader/>}
                                </div>
                            </form>
                            
                        </Grid>
                    </Grid>
                    <br/>
                </Container>
        );
    }
}

export default ClassForm; 