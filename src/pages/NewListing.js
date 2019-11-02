import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { LocaleContext } from '../contexts/LocaleContext';
import { ListingsContext } from '../contexts/ListingsContext';
import Loader from '../components/Widgets/Loader';
import MenuItem from '@material-ui/core/MenuItem';
import { FormattedMessage } from 'react-intl';
import { file } from '@babel/types';
import SmallLoader from '../components/Widgets/SmallLoader';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import RadioButton from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { AuthContext } from '../contexts/AuthContext';

// Mui imports
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

// Firebase imports
import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';
import { async } from '@firebase/util';

// const admin = require('firebase-admin');

const NewListing = () => {

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

        Date.prototype.stdTimezoneOffset = function () {
            var jan = new Date(this.getFullYear(), 0, 1);
            var jul = new Date(this.getFullYear(), 6, 1);
            return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
        }
        
        Date.prototype.isDstObserved = function () {
            return this.getTimezoneOffset() < this.stdTimezoneOffset();
        }

        // var today = new Date();
        // if (today.isDstObserved()) { 
        //     alert ("Daylight saving time!");
        // }

        const cleanString = (string) => {
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

        const { currentUser } = useContext(AuthContext);
        const { locale } = useContext(LocaleContext);
        const handleSubmit = (e) => {
            e.preventDefault();
            setLoading(true);
            const tagList = tags.split(",").map(item => item.trim());
            const descriptionParagraphs = description.split('\n').map(paragraph => paragraph.trim());
            const descriptionCleaned = descriptionParagraphs.filter(paragraph => paragraph!=="");
            const tempImageUrl = cleanString(listingTitle + " " + companyName);
            const tempLogoUrl = cleanString(companyName);
            // const dateTime = ((new Date(date)).isDstObserved()) ? 
            //     date + "T" + time + "+02:00" 
            //     : 
            //     date + "T" + time + "+01:00" ;
            firebase.firestore().collection('listings').add({
                online: (online==="true") ? true : false,
                format,
                listingTitle,
                nameId: tempImageUrl + "-" + (date.length > 0 ? date.substring(0,10) : Math.floor(Math.random() * (1000 + 1))),
                date: (date && date !== null && date !== "") ? new Date(date + "T" + time + "+01:00") : null,
                duration: parseInt(duration),
                language,
                price: parseFloat(price),
                website,
                tags: tagList,
                description: descriptionCleaned,
                city,
                district,
                address,
                companyName,
                listingImage: imageLink.split(' ')[0],
                companyLogo: tempLogoUrl,
                active: false,
                addedBy: currentUser.email,
                dateAdded: new Date
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
                setListingTitle('');
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
                setImageLink('');
            })
            .catch((e) => {
                console.log("Error posting the form: " + e);
            });
        }

        const [ loading, setLoading ] = useState(false);
        const [ success, setSuccess ] = useState(false);
        const [ specificDate, setSpecificDate ] = useState('false');
        const [ online, setOnline ] = useState('true');
        const [ format, setFormat ] = useState('');
        const [ listingTitle, setListingTitle ] = useState('');
        const [ duration, setDuration ] = useState('');
        const [ price, setPrice ] = useState('');
        const [ date, setDate ] = useState('');
        const [ time, setTime ] = useState('');
        const [ language, setLanguage ] = useState('');

        const [ tags, setTags ]                     = useState('');
        const [ website, setWebsite ]               = useState('');
        const [ selectedFile, setSelectedFile ]     = useState(''); 
        const [ selectedLogo, setSelectedLogo ]     = useState('');
        const [ imageLink, setImageLink]            = useState('');
        const [ imageUploading, setImageUploading ] = useState(false);
        const [ logoInput, setLogoInput ]           = useState(null);
        const [ fileInput, setFileInput ]           = useState(null);
        const [ imageUploaded, setImageUploaded ]   = useState(false);
        const [ logoUploaded, setLogoUploaded ]     = useState(false);
        const [ description, setDescription ]       = useState('');
        const [ city, setCity ]                     = useState('');
        const [ district, setDistrict ]             = useState('');
        const [ address, setAddress ]               = useState('');
        const [ companyName, setCompanyName ]       = useState('');
        const [ companyLogo, setCompanyLogo ]       = useState('');
        const [ listingImage, setListingImage ]     = useState('');

        const storage = firebase.storage();

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
            formData.append('image', selectedLogo, logoName + ".jpg" );
        
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

        function getImage(imageName) { 
            storage
            .refFromURL(`gs://app23980.appspot.com/listings/${imageName}.jpg` )
            .getDownloadURL()
            .then( url => {
                setImageLink(url);
                setImageUploading(false);
                } )
            .catch( (err) => {
                setImageUploading(false);
                console.log("Error getting image url: " + err);
            });
        }

        const handleImageChange = async (image) => {
            const formData = new FormData();
            formData.append('image', image, image.name);
            setImageUploading(true);
            let response = await fetch('https://europe-west1-app23980.cloudfunctions.net/uploadImage', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData
            })
            .then(() => {
                setImageLink(getImage(image.name.split('.')[0]));
            })
            .catch(() => {
                console.log("Error uploading the image");
                setImageUploading(false);
            })
        }

        function handleListingImage() {
            const fileInput = document.getElementById('imageInput');
            fileInput.click();
        }

        return(
            <Container className="content">

                <main>
                <h2>
                    <FormattedMessage id={`navbar.newListing.link.${locale}`} />
                </h2>  

                <form className={"new-class-form noValidate " + (success ? "hide" : "show")} autoComplete="off" onSubmit={handleSubmit}>
                    <div className="provider-form-item">
                        <label className="required" title="listingTitle">Title</label>
                        <TextField
                            required
                            id="listingTitle"
                            value={listingTitle}
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => setListingTitle(e.currentTarget.value)}
                        />
                    </div>
                    <div className="provider-form-item">
                        <label className="required" title="format">Format</label>
                        <select required onChange={e => setFormat(e.currentTarget.value)}>
                            <option value=""></option>
                            <option value="class">Class</option>
                            <option value="workshop">Workshop</option>
                            <option value="meetup">Meetup</option>
                            <option value="seminar">Seminar</option>
                            <option value="webinar">Webinar</option>
                        </select>
                    </div>
                    
                    <h3>Specific date?</h3>
                    <div className="specific-date">
                        <label className="specific-date-label">No</label>
                        <Radio
                            checked={specificDate === 'false'}
                            onChange={(e) => setSpecificDate(e.currentTarget.value)}
                            value='false'
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'A' }}
                        />
                        <label className="specific-date-label">Yes</label>
                        <Radio
                            checked={specificDate === 'true'}
                            onChange={(e) => setSpecificDate(e.target.value)}
                            value='true'
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'A' }}
                        />
                    </div>
                    { (specificDate === 'true') ? (
                        <React.Fragment>
                        <div className="provider-form-item">
                            <label className="required" title="date">Date</label>
                            <input 
                                className="date-selector" 
                                type="date" 
                                name="date"
                                value={date}
                                margin="normal"
                                placeholder="e.g. 2019-12-01"
                                onChange={(e) => setDate(e.currentTarget.value)}
                            />
                        </div>
                        <div className="provider-form-item">
                            <label className="required" title="time">Time</label>
                            <input
                                className="date-selector" 
                                type="time" 
                                name="time"
                                value={time}
                                margin="normal"
                                placeholder="e.g. 17:30"
                                onChange={(e) => setTime(e.currentTarget.value)}
                            />
                        </div>
                        </React.Fragment>)
                        :
                        null
                    }
                    <h3>Format?</h3>
                    <div className="specific-date">
                        
                        <label className="specific-date-label">Online</label>
                        <Radio
                            checked={online === 'true'}
                            onChange={(e) => setOnline(e.target.value)}
                            value='true'
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'A' }}
                        />
                        <label className="specific-date-label">In person</label>
                        <Radio
                            checked={online === 'false'}
                            onChange={(e) => setOnline(e.currentTarget.value)}
                            value='false'
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'A' }}
                        />
                    </div>
                    { (online==="false") ? (
                        <React.Fragment>
                        <h3>Location</h3>
                        <div className="provider-form-item">
                            <label className="required" title="city">City: </label>
                            <TextField
                                id="city"
                                value={city}
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => setCity(e.currentTarget.value)}
                            />
                        </div>
                        <div className="provider-form-item">
                            <label className="required" title="district">District: </label>
                            <TextField
                                id="district"
                                value={district}
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => setDistrict(e.currentTarget.value)}
                            />
                        </div>
                        <div className="provider-form-item">
                            <label className="required" title="address">Address: </label>
                            <TextField
                                id="address"
                                value={address}
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => setAddress(e.currentTarget.value)}
                            />
                        </div>
                    </React.Fragment>)
                    :
                    (null)
                    }
                    

                    <h3>Booking information</h3>
                    <div className="provider-form-item">
                        <label className="required" title="price">Price</label>
                        <TextField
                            required
                            id="price"
                            value={price}
                            margin="normal"
                            variant="outlined"
                            placeholder="e.g. 25"
                            onChange={(e) => setPrice(e.currentTarget.value)}
                        />
                    </div>
                    <div className="provider-form-item">
                        <label className="required" title="website">Website: </label>
                        <TextField
                            required
                            id="website"
                            margin="normal"
                            variant="outlined"
                            value={website}
                            placeholder="e.g. https://example.com/class"
                            onChange={(e) => setWebsite(e.currentTarget.value)}
                        />
                    </div>

                    <h3>Additional information</h3>
                    <div className="provider-form-item">
                        <label className="required" title="image">Image</label>
                        <Tooltip title="Edit listing image" placement="top">
                            <div style={{ width: '750px', height: '300px', border: '1px solid #eaeaea' }}>
                                { 
                                    (imageUploading) ?
                                        (   
                                            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                                <SmallLoader style/>
                                            </div>
                                        )
                                        :
                                        (imageLink!=="") ? 
                                            (
                                                <div className="image-container">
                                                    <img 
                                                        style={{ position:'absolute', width: '750px', height: '300px' }} 
                                                        src={imageLink} 
                                                        alt="Add a compeling image to bring your listing to life."
                                                    />
                                                    <EditIcon 
                                                        className="edit-icon"
                                                        onClick={ handleListingImage }
                                                    />
                                                </div>
                                            )
                                            :
                                            (
                                                <div 
                                                    style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems:'center', color: '#999999'}}
                                                    onClick={ handleListingImage }
                                                >
                                                    <EditIcon style={{ marginBottom: '20px'}} />
                                                    <strong>ADD IMAGE</strong>
                                                    <p>Add a compeling image to bring your listing to life.</p>
                                                </div>
                                            )
                                }
                            </div>
                        </Tooltip>
                        <input
                            type="file"
                            id="imageInput"
                            hidden="hidden"
                            onChange={ e => {
                                let image = e.currentTarget.files[0];
                                if(image!==null && typeof image !== 'undefined') handleImageChange(image)}}
                        />
                        
                        {/* <div className="file-upload-container"> */}
                        {/* <div className="image-uploader-box" onClick={() => fileInput.click()}> */}
                        {/* { imageUploaded ? (
                            <Icon className="success-icon">
                                done
                            </Icon> */}
                        {/* ) : (selectedFile === "") ? (
                            <React.Fragment> */}
                                {/* <div><Icon>add_a_photo</Icon></div>
                                <img src="" alt=""/> */}
                                {/* <div>
                                    <strong>ADD IMAGE</strong>
                                    <br/>
                                    <span>Add a compeling image to bring your listing to life.</span>
                                    {(fileInput===null) ? 
                                        "fileInput"
                                        :
                                        null
                                    }
                                    <input
                                        type="file"
                                        hidden="hidden"
                                        // style={{ display: "none" }}
                                        onChange={(e) => setSelectedFile(e.currentTarget.files[0])}
                                        onChange={handleImageChange}
                                        ref={ref => setFileInput(ref)}
                                    />
                                </div> */}
                            {/* </React.Fragment>
                            ) : (
                                <span>{selectedFile.name}</span>
                            )
                        }
                        </div> */}
                    </div>
                    
                    <div className="provider-form-item">
                        <label className="required" title="tags">Tags: </label>
                        <TextField
                            required
                            id="tags"
                            margin="normal"
                            variant="outlined"
                            value={tags}
                            placeholder="e.g. parenting, fitness"
                            onChange={(e) => setTags(e.currentTarget.value)}
                        />
                    </div>
                    <div className="provider-form-item">
                        <label className="required" title="duration">Duration (mins)</label>
                        <TextField
                            required
                            id="duration"
                            value={duration}
                            margin="normal"
                            variant="outlined"
                            placeholder="e.g. 60"
                            onChange={(e) => setDuration(e.currentTarget.value)}
                        />
                    </div>
                    <div className="provider-form-item">
                        <label className="required" title="Customer">Language</label>
                        <select required onChange={e => setLanguage(e.currentTarget.value)}>
                            <option value=""></option>
                            <option value="english">English</option>
                            <option value="french">French</option>
                            <option value="spanish">Spanish</option>
                        </select>
                    </div>
                    <div className="provider-form-item">
                        <label className="required" title="description">Description: </label>
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
                    {   (currentUser.email.indexOf('parentica') !== -1) ?
                        (<React.Fragment>
                            <div className="admin-section">
                                <em>Admin only</em>
                            </div>
                            <div className="provider-form-item">
                                <label className="required" title="companyName">Company name: </label>
                                <TextField
                                    id="companyName"
                                    value={companyName}
                                    margin="normal"
                                    variant="outlined"
                                    onChange={(e) => setCompanyName(e.currentTarget.value)}
                                />
                            </div>
                            <div className="provider-form-item">
                                <label className="required" title="image">Logo: </label>
                                <div className="logo-uploader-box" onClick={() => logoInput.click()}>
                                {/* { logoUploaded ? (
                                    <Icon className="success-icon">
                                        done
                                    </Icon>
                                ) : */}
                                {(selectedLogo === "") ? (
                                    <React.Fragment>
                                        <div><Icon>add_a_photo</Icon></div>
                                        <div>
                                            <strong>ADD LOGO</strong>
                                            <br/>
                                            <span>Add a logo for your profile.</span>
                                            {(logoInput===null) ? 
                                                "logoInput"
                                                :
                                                null
                                            }
                                            <input
                                                type="file"
                                                style={{ display: "none" }}
                                                onChange={(e) => setSelectedLogo(e.currentTarget.files[0])}
                                                ref={ref => setLogoInput(ref)}
                                            />
                                        </div>
                                    </React.Fragment>
                                    ) : (
                                        <span>{selectedLogo.name}</span>
                                    )
                                }
                                </div>

                            </div>
                        </React.Fragment>)
                            :
                            null
                    }
                    
                    <div className="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                    
                        <div className="form-buttons">
                            <Link to={{pathname:`/${locale.split('-')[0]}/providers`}}>
                                <Button variant="outlined" className="cancel-form-data secondary">            
                                    Cancel
                                </Button>
                            </Link>
                            { !loading ? (
                            <Button variant="contained" className="send-form-data primary" type="submit" >  
                                &nbsp;Save
                            </Button>
                            ) : (
                            <Button variant="contained" className="send-form-data primary" type="submit" >  
                                <SmallLoader/>
                            </Button>
                            )}
                        </div>
                    </div>
                    
                </form>
                <div className={"success-message " + (success ? "show" : "hide")} >
                    <Icon className="success-icon">
                        done
                    </Icon>
                    <p>
                    <FormattedMessage 
                        id={`providers.confirmListingCreated.${locale}`}
                        defaultMessage="Listing successfully saved. You can now acitvate it when you are ready."
                    />
                    </p>
                    
                    <p>
                        <Link to={{pathname:`/${locale.split('-')[0]}/providers`}}>
                            <FormattedMessage 
                                id={`providers.backHomeLink.${locale}`}
                                defaultMessage="back to list"
                            />
                        </Link>
                    </p>
                </div>
            </main>
            </Container>
        );
}

export default NewListing; 
