import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { LocaleContext } from '../contexts/LocaleContext';
import { ListingsContext } from '../contexts/ListingsContext';
import Loader from '../components/Loader';
import MenuItem from '@material-ui/core/MenuItem';
import firebase from '../config/firebase';
import { FormattedMessage } from 'react-intl';


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

        const cleanString = (string) => {
            console.log(string);
            let output = string.toLowerCase();
            output = output.replace(/[|&$%@"<>()_+*'`!?\-:;,~]/g, "");
            output = output.replace(/[áàâäãåā]/g, "a");
            output = output.replace(/[èéêëėēę]/g, "e");
            output = output.replace(/[îïíīįì]/g, "i");
            output = output.replace(/[ñń]/g, "n");
            output = output.replace(/[ôöòóœøōõ]/g, "o");
            output = output.replace(/[ûüùúū]/g, "u");
            output = output.replace(/[^a-z0-9 ]/gi,'');
            output = output.split(' ').join('-');
            return output.replace(/--/g, "-");
        }   

        const { locale } = useContext(LocaleContext);
        const handleSubmit = (e) => {
            e.preventDefault();
            setLoading(true);
            const tagList = tags.split(",").map(item => item.trim());
            const descriptionParagraphs = description.split('\n').map(paragraph => paragraph.trim());
            const descriptionCleaned = descriptionParagraphs.filter(paragraph => paragraph!=="");
            const tempImageUrl = cleanString(listingName + " " + companyName);
            const tempLogoUrl = cleanString(companyName);
            const listingDate = date ? 
                date.substring(0,10) + "T" + time + "+02:00" 
                : 
                Math.floor(Math.random() * (100+ 1));
            firebase.firestore().collection('listings').add({
                online,
                format,
                listingName,
                nameId: tempImageUrl + "-" + listingDate.substring(0,10),
                date: listingDate ,
                duration:parseInt(duration),
                language,
                price,
                website,
                tags: tagList,
                description: descriptionCleaned,
                city,
                district,
                address,
                companyName,
                listingImage: tempImageUrl,
                companyLogo: tempLogoUrl,
                active: false,
                dateAdded: new Date

            })
            .then(() => {
                postImage(tempImageUrl);
            })
            .then(() => {
                postLogo(tempLogoUrl);
            })
            .then(() => {
                setLoading(false);
                setCompanyLogo(tempLogoUrl);
                setListingImage(tempImageUrl);
                setSuccess(true);
                setOnline('');
                setFormat('');
                setListingName('');
                setDuration('');
                setPrice('');
                setLanguage('');
                setWebsite('');
                setTags('');
                setDescription('');
                setCity('');
                setDistrict('');
                setAddress('');
                setCompanyName('');
            })
            .catch((e) => {
                console.log("Error posting the form: " + e);
            });
        }

        const [ loading, setLoading ] = useState(false);
        const [ success, setSuccess ] = useState(false);

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
        const [ selectedFile, setSelectedFile ] = useState('');
        const [ imageUploaded, setImageUploaded ] = useState(false);
        const [ logoUploaded, setLogoUploaded ] = useState(false);
        const [ description, setDescription ] = useState('');
        const [ city, setCity ] = useState('');
        const [ district, setDistrict ] = useState('');
        const [ address, setAddress ] = useState('');
        const [ companyName, setCompanyName ] = useState('');
        const [ companyLogo, setCompanyLogo ] = useState('');
        const [ listingImage, setListingImage ] = useState('');
        const [ selectedLogo, setSelectedLogo ] = useState('');

        const postImage = async (imageName) => {
            var formData = new FormData();
            formData.append('image', selectedFile, imageName + ".jpg" );
        
            let response = await fetch('https://europe-west1-app23980.cloudfunctions.net/uploadImage', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData
            })
            .then(() => {
                setImageUploaded(true);
            })
            .catch(() => {
                console.log("Error uploading the image");
            })
        }

        const postLogo = async (logoName) => {
            var formData = new FormData();
            formData.append('image', selectedFile, logoName + ".jpg" );
        
            let response = await fetch('https://europe-west1-app23980.cloudfunctions.net/uploadLogo', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData
            })
            .then(() => {
                setLogoUploaded(true);
            })
            .catch(() => {
                console.log("Error uploading the logo");
            })
        }

        return(
            <Container className="main-content">
                <Grid container className="contact-form">
                    <Grid item xs={12} sm={12} >
                        <h2>
                            New Class
                        </h2>           
                        <form className={"new-class-form noValidate " + (success ? "hide" : "show")} autoComplete="off" onSubmit={handleSubmit}>
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
                                <span className="time-notice">in minutes    </span>
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
                                <div className="file-upload-container">
                                    <input
                                        // required
                                        // value={selectedFile.name}
                                        type="file"
                                        // style={{ display: "none" }}
                                        onChange={(e) => setSelectedFile(e.currentTarget.files[0])}
                                    />
                                    {/* <label className="custom-file-upload">
                                        <input type="file"/>
                                        Select file
                                    </label> */}
                                    { imageUploaded ? (
                                            <Icon className="success-icon">
                                                done
                                            </Icon>
                                        ) : 
                                        // selectedFile ? (
                                        //     <span className="upload-image"
                                        //         onClick={postImage}
                                        //     >
                                        //     Upload
                                        //     </span>
                                        // ) : 
                                        (
                                            <span></span>
                                        )
                                    }
                                    {/* <span>{imagePath}</span> */}
                                </div>
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
                                    required
                                    id="tags"
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
                                    required
                                    id="description"
                                    value={description}
                                    multiline
                                    rows="12"
                                    placeholder="Please describe your class"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={(e) => setDescription(e.currentTarget.value)}
                                />
                            </div>
                            <div className="provider-form-item">
                                <label className="ant-form-item-required" title="city">City: </label>
                                <TextField
                                    id="city"
                                    value={city}
                                    margin="dense"
                                    variant="outlined"
                                    onChange={(e) => setCity(e.currentTarget.value)}
                                />
                            </div>
                            <div className="provider-form-item">
                                <label className="ant-form-item-required" title="district">District: </label>
                                <TextField
                                    id="district"
                                    value={district}
                                    margin="dense"
                                    variant="outlined"
                                    onChange={(e) => setDistrict(e.currentTarget.value)}
                                />
                            </div>
                            <div className="provider-form-item">
                                <label className="ant-form-item-required" title="address">Address of venue: </label>
                                <TextField
                                    id="address"
                                    value={address}
                                    margin="dense"
                                    variant="outlined"
                                    onChange={(e) => setAddress(e.currentTarget.value)}
                                />
                            </div>
                            <div className="provider-form-item">
                                <label className="ant-form-item-required" title="companyName">Company name: </label>
                                <TextField
                                    id="companyName"
                                    value={companyName}
                                    margin="dense"
                                    variant="outlined"
                                    onChange={(e) => setCompanyName(e.currentTarget.value)}
                                />
                            </div>
                            <div className="provider-form-item">
                                <label className="ant-form-item-required" title="image">Logo: </label>
                                <div className="file-upload-container">
                                    <input
                                        // required
                                        // value={selectedFile.name}
                                        type="file"
                                        // style={{ display: "none" }}
                                        onChange={(e) => setSelectedLogo(e.currentTarget.files[0])}
                                    />
                                    {/* <label className="custom-file-upload">
                                        <input type="file"/>
                                        Select file
                                    </label> */}
                                    { logoUploaded ? (
                                            <Icon className="success-icon-logo">
                                                done
                                            </Icon>
                                        ) : 
                                        // selectedFile ? (
                                        //     <span className="upload-image"
                                        //         onClick={postImage}
                                        //     >
                                        //     Upload
                                        //     </span>
                                        // ) : 
                                        (
                                            <span></span>
                                        )
                                    }
                                    {/* <span>{imagePath}</span> */}
                                </div>
                            </div>
                            
                            {/* <div className="provider-form-item">
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
                            </div> */}
                            <div className="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                            { !loading ?
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
                                :
                                <Loader/>}
                                
                            </div>
                            
                        </form>
                        <div className={"success-message " + (success ? "show" : "hide")} >
                                <Icon className="success-icon">
                                    done
                                </Icon>
                                <p>
                                <FormattedMessage 
                                    id={`providers.confirmClassAdded.${locale}`}
                                    defaultMessage="Class added"
                                />
                                </p>
                                
                                <p><Link to={{pathname:`/${locale.split('-')[0]}/providers`}}>
                                <FormattedMessage 
                                    id={`providers.backHomeLink.${locale}`}
                                    defaultMessage="back to list"
                                />
                                </Link></p>
                            </div>
                    </Grid>
                </Grid>
                <br/>
            </Container>
        );
}

export default ClassForm; 