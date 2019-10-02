import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { LocaleContext } from '../contexts/LocaleContext';
import { ListingsContext } from '../contexts/ListingsContext';

import MenuItem from '@material-ui/core/MenuItem';
import firebase from '../config/firebase';


const ClassForm = () => {

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         firstName: '',
    //         lastName: '',
    //         email: '',
    //         company: '',
    //         message: '',
    //         touched: {
    //             firstname: false,
    //             lastname: false,
    //             email: false,
    //             message: false
    //         },
    //         success: false,
    //         showError: false,
    //         loading: false
    //     };
    //     this.toggleSuccess = this.toggleSuccess.bind(this);
    //     this.handleInputChange = this.handleInputChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    //     this.handleBlur = this.handleBlur.bind(this);
    //     this.validate = this.validate.bind(this);
    // }

    // toggleSuccess() {
    //     this.setState({
    //         success: !this.state.success,
    //         loading: false
    //     });
    // }

    // toggleShowError() {
    //     this.setState({
    //         showError: !this.state.showError
    //     });
    // }

    // validate(firstname, lastname, email, message, locale) {

    //     const errors = {
    //         firstname: '',
    //         lastname: '',
    //         email: '',
    //         message: ''
    //     };

    //     if (this.state.touched.firstname && firstname.length < 3)
    //         errors.firstname = <FormattedMessage id={`contact.error.firstName.tooShort.${locale}`}>
    //                             {(txt) => txt}
    //                           </FormattedMessage>;
    //     else if (this.state.touched.firstname && firstname.length > 20)
    //         errors.firstname = <FormattedMessage id={`contact.error.firstName.tooLong.${locale}`}>
    //                                 {(txt) => txt}
    //                             </FormattedMessage>;

    //     if (this.state.touched.lastname && lastname.length < 3)
    //         errors.lastname = <FormattedMessage id={`contact.error.lastName.tooShort.${locale}`}>
    //                                     {(txt) => txt}
    //                             </FormattedMessage>;
    //     else if (this.state.touched.lastname && lastname.length > 20)
    //         errors.lastname = <FormattedMessage id={`contact.error.lastName.tooLong.${locale}`}>
    //                                 {(txt) => txt}
    //                             </FormattedMessage>;
            
    //     if (this.state.touched.message && message.length < 1)
    //         errors.message = <FormattedMessage id={`contact.error.message.empty.${locale}`}>
    //                                 {(txt) => txt}
    //                             </FormattedMessage>;

    //     // const re = /^\d+$/;
    //     const re = /\S+@\S+\.\S+/;        ;
    //     // const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //     // const re = /^(([^<>()[].,;:\s@"]+([^<>()[].,;:\s@"]+)*)|(".+"))@(([^<>()[].,;:\s@"]+.)+[^<>()[].,;:\s@"]{2,})$/i;
    //     if (this.state.touched.email && !re.test(email)) 
    //         errors.email = <FormattedMessage id={`contact.error.email.invalid.${locale}`}>
    //                                 {(txt) => txt}
    //                             </FormattedMessage>;
        
    //     return errors; 
    // }

    // handleBlur = (field) => (evt) => {
    //     this.setState({
    //       touched: { ...this.state.touched, [field]: true },
    //     });
    // }

    // handleInputChange(event) {
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;
    //     this.setState({
    //         [name]: value
    //     });
    // }

    // handleSubmit(event) {
    //     event.preventDefault();
    //     this.setState({loading:true});
    //     this.sendContactUsData(this.state);
        
    // }

    // sendContactUsData(data) {
    //     // delete data.touched;
    //     console.log(data);
    //     return fetch('https://us-central1-app23980.cloudfunctions.net/sendContactUsEmail', {
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //         mode: 'no-cors',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             // 'Access-Control-Allow-Credentials': 'true',
    //             // 'Access-Control-Allow-Origin': '*'
    //         }
    //     }).then(response => {
    //         if (response.status===0 || (response.status >= 200 && response.status < 300)) {
    //             console.log("Messsage successfully sent: status " + response.status);
    //             this.toggleSuccess();
    //             // window.location.reload();
    //             return response;
    //         } else {
    //             this.setState({loading:false});
    //             console.log('Somthing went wrong: ' + response.status + ' error.');
    //             this.toggleShowError();
    //         }
    //     }).catch(err => {
    //         this.setState({loading:false});
    //         console.log("Error sending the contact form data.");
    //         this.toggleShowError();
    //     });
    // }

        const { locale } = useContext(LocaleContext);
        const handleSubmit = (e) => {
            e.preventDefault();
            const tagList=tags.split(",").map(item => item.trim());
            firebase.firestore().collection('listings').add({
                online,
                format,
                listingName,
                date: date + "T" + time + "+02:00",
                duration:parseInt(duration),
                language,
                price,
                website,
                tags: tagList,
                companyName,
                image,

            }).then(() => {
                setOnline('');
                setFormat('');
                setListingName('');
                setDuration('');
                setPrice('');
                setLanguage('');
                setWebsite('');
                setTags('');
                setImage('');
                setCompanyName('');
            })
        }
        const [ online, setOnline ] = useState('');
        const [ format, setFormat ] = useState('');
        const [ listingName, setListingName ] = useState('');
        const [ duration, setDuration ] = useState('');
        const [ price, setPrice ] = useState('');
        const [ date, setDate ] = useState('');
        const [ time, setTime ] = useState('');
        const [ language, setLanguage ] = useState('');

        const [ tags, setTags ] = useState('');
        const [ website, setWebsite ] = useState('');
        const [ image, setImage ] = useState('');
        const [ description, setDescription ] = useState('');
        const [ companyLogo, setCompanyLogo ] = useState('');
        const [ listingImage, setListingImage ] = useState('');
        const [ companyName, setCompanyName ] = useState('');

        return(
            <Container className="main-content">
                <Grid container className="contact-form">
                    <Grid item xs={12} sm={12} >
                        <h2>
                            New Class
                        </h2>           
                
                        <form className="new-class-form noValidate" autoComplete="off" onSubmit={handleSubmit}>
                            {/* <h3>Format</h3> */}
                            <div className="provider-form-item">
                                <label className="ant-form-item-required" title="online">Type: </label>
                                <select required onChange={e => setOnline(e.currentTarget.value)}>
                                    <option value=""></option>
                                    <option value="online">Online</option>
                                    <option value="person">In person</option>
                                </select>
                            </div>
                            <div className="provider-form-item">
                                <label className="ant-form-item-required" title="format">Format: </label>
                                <select required onChange={e => setFormat(e.currentTarget.value)}>
                                    <option value=""></option>
                                    <option value="class">Class</option>
                                    <option value="workshop">Workshop</option>
                                    <option value="meetup">Meetup</option>
                                    <option value="seminar">Seminar</option>
                                    <option value="webinar">Webinar</option>
                                </select>
                            </div>
                            <div className="provider-form-item">
                                <label className="ant-form-item-required" title="listingName">Name: </label>
                                <TextField
                                    required
                                    id="listingName"
                                    value={listingName}
                                    margin="dense"
                                    variant="outlined"
                                    onChange={(e) => setListingName(e.currentTarget.value)}
                                />
                            </div>
                            <div className="provider-form-item">
                                <label className="ant-form-item-required" title="date">Date: </label>
                                <input 
                                    required
                                    className="date-selector" 
                                    type="date" 
                                    name="date"
                                    value={date}
                                    onChange={(e) => setDate(e.currentTarget.value)}
                                />
                            </div>
                            <div className="provider-form-item">
                                <label className="ant-form-item-required" title="time">Time: </label>
                                <input
                                    required
                                    className="date-selector" 
                                    type="time" 
                                    name="time"
                                    value={time}
                                    onChange={(e) => setTime(e.currentTarget.value)}
                                />
                                <span className="time-notice">add 1h for classes after October 27</span>
                            </div>
                            <div className="provider-form-item">
                                <label className="ant-form-item-required" title="duration">Duration: </label>
                                <TextField
                                    required
                                    id="duration"
                                    value={duration}
                                    margin="dense"
                                    variant="outlined"
                                    onChange={(e) => setDuration(e.currentTarget.value)}
                                />
                            </div>
                            <div className="provider-form-item">
                                <label className="ant-form-item-required" title="price">Price: </label>
                                <TextField
                                    required
                                    id="price"
                                    value={price}
                                    margin="dense"
                                    variant="outlined"
                                    onChange={(e) => setPrice(e.currentTarget.value)}
                                />
                            </div>
                            <div className="provider-form-item">
                                <label className="ant-form-item-required" title="Customer">Language: </label>
                                <select required onChange={e => setLanguage(e.currentTarget.value)}>
                                    <option value=""></option>
                                    <option value="spanish">Spanish</option>
                                    <option value="english">English</option>
                                </select>
                            </div>
                            
                            <div className="provider-form-item">
                            <label className="ant-form-item-required" title="image">Image: </label>
                            <Button
                                variant="contained"
                                component="label"
                                >
                                Upload File
                                <input
                                    required
                                    value={image}
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={(e) => setImage(e.currentTarget.value)}
                                />
                                <span>{image}</span>
                                </Button>
                            </div>
                            <div className="provider-form-item">
                                <label className="ant-form-item-required" title="website">Website: </label>
                                <TextField
                                    required
                                    id="website"
                                    margin="dense"
                                    variant="outlined"
                                    value={website}
                                    placeholder="e.g. https://example.com/class"
                                    onChange={(e) => setWebsite(e.currentTarget.value)}
                                />
                            </div>
                            <div className="provider-form-item">
                                <label className="ant-form-item-required" title="tags">Tags: </label>
                                <TextField
                                    id="class-name"
                                    margin="dense"
                                    variant="outlined"
                                    value={tags}
                                    placeholder="e.g. 'parenting', 'yoga"
                                    onChange={(e) => setTags(e.currentTarget.value)}
                                />
                            </div>
                            <div className="provider-form-item">
                                <label className="ant-form-item-required" title="description">Description: </label>
                                <TextField
                                    id="description"
                                    label=""
                                    multiline
                                    rows="12"
                                    rowsMax="100"
                                    defaultValue="Please describe your class"
                                    margin="normal"
                                    helperText=""
                                    variant="outlined"
                                />
                            </div>
                            <div className="provider-form-item">
                                <label className="ant-form-item-required" title="city">City: </label>
                                <TextField
                                    id="class-name"
                                    label=""
                                    margin="dense"
                                    variant="outlined"
                                />
                            </div>
                            <div className="provider-form-item">
                                <label className="ant-form-item-required" title="district">District: </label>
                                <TextField
                                    id="class-name"
                                    label=""
                                    margin="dense"
                                    variant="outlined"
                                />
                            </div>
                            <div className="provider-form-item">
                                <label className="ant-form-item-required" title="address">Address of venue: </label>
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
                                    value={companyName}
                                    label=""
                                    margin="dense"
                                    variant="outlined"
                                    onChange={(e) => setCompanyName(e.currentTarget.value)}
                                />
                            </div>
                            <div className="provider-form-item">
                            <label className="ant-form-item-required" title="logo">Company logo: </label>
                            <Button
                                variant="contained"
                                component="label"
                                >
                                Upload File
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                />
                                </Button>
                            </div>
                            <div className="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                                
                                <div className="form-buttons">
                                    <Button variant="contained" className="send-form-data primary" type="submit" >
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
                                
                            </div>
                        </form>
                        
                    </Grid>
                </Grid>
                <br/>
            </Container>
        );
}

export default ClassForm; 