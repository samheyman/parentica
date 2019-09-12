import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class Contact extends Component {
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
            showError: false
        };
        this.toggleSuccess = this.toggleSuccess.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.validate = this.validate.bind(this);
    }

    toggleSuccess() {
        this.setState({
            success: !this.state.success
        });
    }

    toggleShowError() {
        this.setState({
            showError: !this.state.showError
        });
    }

    validate(firstname, lastname, email, message) {

        const errors = {
            firstname: '',
            lastname: '',
            email: '',
            message: ''
        };

        if (this.state.touched.firstname && firstname.length < 3)
            errors.firstname = 'First name should be more 3 characters';
        else if (this.state.touched.firstname && firstname.length > 20)
            errors.firstname = 'First name should be less than 20 characters';

        if (this.state.touched.lastname && lastname.length < 3)
            errors.lastname = 'Last name should be more than 3 characters';
        else if (this.state.touched.lastname && lastname.length > 20)
            errors.lastname = 'Last name should be less than 20 characters';
            
        if (this.state.touched.message && message.length < 1)
            errors.message = 'Please add your message';

        // const re = /^\d+$/;
        const re = /\S+@\S+\.\S+/;        ;
        // const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        // const re = /^(([^<>()[].,;:\s@"]+([^<>()[].,;:\s@"]+)*)|(".+"))@(([^<>()[].,;:\s@"]+.)+[^<>()[].,;:\s@"]{2,})$/i;
        if (this.state.touched.email && !re.test(email)) 
            errors.email = 'Please enter a valid email address';
        
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
                console.log('Somthing went wrong: ' + response.status + ' error.');
                this.toggleShowError();
            }
        }).catch(err => {
            console.log("Error sending the contact form data.");
            this.toggleShowError();
        });
    }

    render() {
        let isValid=false;
        const errors = this.validate(this.state.firstName, this.state.lastName, this.state.email, this.state.message, );
        if (this.state.touched.firstname && errors.firstname==="" && errors.lastname==="" && errors.email==="" && errors.message==="") { 
            isValid = true
        }

        return(
                <Container className="main-content">
                    <Grid container className="contact-form">
                        <Grid item xs={12} sm={12} md={6}>
                            <h2>Contact</h2>
                            <p>Please feel free to get in touch with us for more information or to find 
                                out about listing your classes.</p>
                            <p>We look forward to hearing from you!</p>
                            <form className={"contact-form " + (this.state.success ? "hide" : "show")} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                                <TextField
                                    required
                                    fullWidth
                                    id="firstName"
                                    name="firstName"
                                    placeholder="First name"
                                    label="First Name"
                                    className="contact-form"
                                    value={this.state.firstName}
                                    onChange={this.handleInputChange}
                                    error={errors.firstname!==""}
                                    helperText={errors.firstname === "" ? '' : errors.firstname}
                                    onBlur={this.handleBlur('firstname')}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Last name"
                                    label="Last Name"
                                    error={errors.lastname!==""}
                                    helperText={errors.lastname === "" ? '' : errors.lastname}
                                    value={this.state.lastName}
                                    onBlur={this.handleBlur('lastname')}
                                    onChange={this.handleInputChange}
                                    className="contact-form"
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    label="Email"
                                    className="contact-form"
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                    error={errors.email!==""}
                                    helperText={errors.email === "" ? '' : errors.email}
                                    onBlur={this.handleBlur('email')}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    id="company"
                                    label="Company"
                                    name="company"
                                    placeholder="Company"
                                    className="contact-form"
                                    margin="normal"
                                    value={this.state.company}
                                    variant="outlined"
                                    onChange={this.handleInputChange}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    id="message"
                                    label="Message"
                                    name="message"
                                    error={errors.message!==""}
                                    helperText={errors.message === "" ? "" : errors.message}
                                    placeholder="Your message"
                                    multiline
                                    rows="4"
                                    value={this.state.message}
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleBlur('message')}
                                    className="contact-form"
                                    margin="normal"
                                    variant="outlined"
                                />
                                <div className="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                                    <Button disabled={!isValid} variant="contained" className="contact-form" type="submit" >
                                        Send
                                    </Button>
                                </div>
                            </form>
                            <div className={"error-message " + (this.state.showError ? "show" : "hide")} >
                                Sorry, there was an error sending the form. Please try again.
                            </div>
                            <div className={"success-message " + (this.state.success ? "show" : "hide")} >
                                <Icon className="success-icon">
                                    done
                                </Icon>
                                <p>Your message was successfully sent. We will get back to you as soon as we can.</p>
                                <p><Link to="/home">back to home</Link></p>
                            </div>
                        </Grid>
                    </Grid>
                    <br/>
                </Container>
        );
    }
}

export default Contact; 