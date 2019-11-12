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
import {TOPICS} from '../shared/topicsJSON';
import {useAuth} from '../contexts/AuthContext';

// Mui imports
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import RadioButton from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// Firebase imports
import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';
import { async } from '@firebase/util';
import TranslatedText from '../components/TranslatedText';

const NewListing = () => {
    const auth = useAuth();

    Date.prototype.stdTimezoneOffset = function () {
        var jan = new Date(this.getFullYear(), 0, 1);
        var jul = new Date(this.getFullYear(), 6, 1);
        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    }
    
    Date.prototype.isDstObserved = function () {
        return this.getTimezoneOffset() < this.stdTimezoneOffset();
    }

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

    const { locale } = useContext(LocaleContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const descriptionParagraphs = description.split('\n').map(paragraph => paragraph.trim());
        const descriptionCleaned = descriptionParagraphs.filter(paragraph => paragraph!=="");
        // const dateTime = ((new Date(date)).isDstObserved()) ? 
        //     date + "T" + time + "+02:00" 
        //     : 
        //     date + "T" + time + "+01:00" ;
        firebase.firestore().collection('listings').add({
            online: (online==="true") ? true : false,
            format: listingFormat,
            listingTitle,
            nameId: cleanString(listingTitle + " " + companyName) + "-" + (date.length > 0 ? date.substring(0,10) : Math.floor(Math.random() * (1000 + 1))),
            date: (date && date !== null && date !== "") ? new Date(date + "T" + time + "+01:00") : null,
            duration: parseInt(duration),
            language,
            price: parseFloat(price),
            website,
            tags: listingTopics,
            description: descriptionCleaned,
            city,
            district,
            address,
            companyName,
            listingImage: imageName,
            companyLogo: logoName,
            active: false,
            addedBy: auth.user.email,
            dateAdded: new Date
        })
        .then(() => {
            setLoading(false);
            setSuccess(true);
            setOnline('');
            setListingFormat('');
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
    const [ listingFormat, setListingFormat ] = useState('');
    const [ listingTitle, setListingTitle ] = useState('');
    const [ duration, setDuration ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ date, setDate ] = useState(null);
    const [ time, setTime ] = useState(null);
    const [ language, setLanguage ] = useState('');

    const [ tags, setTags ]                     = useState('');
    const [ listingTopics, setListingTopics ]   = useState([]);
    const [ website, setWebsite ]               = useState('');
    const [ imageLink, setImageLink]            = useState('');
    const [ imageUploading, setImageUploading ] = useState(false);
    const [ imageName, setImageName ]           = useState('');
    const [ logoUploading, setLogoUploading ]   = useState(false);
    const [ logoLink, setLogoLink]              = useState('');
    const [ logoName, setLogoName]              = useState(null);
    const [ description, setDescription ]       = useState('');
    const [ city, setCity ]                     = useState('');
    const [ district, setDistrict ]             = useState('');
    const [ address, setAddress ]               = useState('');
    const [ companyName, setCompanyName ]       = useState('');

    const storage = firebase.storage();

    // const postImage = async (imageName) => {
    //     var formData = new FormData();
    //     formData.append('image', selectedFile, imageName + ".jpg" );
    
    //     let response = await fetch('https://europe-west1-app23980.cloudfunctions.net/uploadImage', {
    //         method: 'post',
    //         mode: 'no-cors',
    //         headers: {
    //             'Accept': 'application/json',
    //         },
    //         body: formData
    //     })
    //     .then(() => {
    //         setImageUploaded(true);
    //     })
    //     .catch(() => {
    //         console.log("Error uploading the image");
    //     })
    // }

    // const postLogo = async (logoName) => {
    //     var formData = new FormData();
    //     formData.append('image', selectedLogo, logoName + ".jpg" );
    
    //     let response = await fetch('https://europe-west1-app23980.cloudfunctions.net/uploadLogo', {
    //         method: 'post',
    //         mode: 'no-cors',
    //         headers: {
    //             'Accept': 'application/json',
    //         },
    //         body: formData
    //     })
    //     .then(() => {
    //         setLogoUploaded(true);
    //     })
    //     .catch(() => {
    //         console.log("Error uploading the logo");
    //     })
    // }

    function getImage(imageName) { 
        storage
        .refFromURL(`gs://app23980.appspot.com/listings/${imageName}` )
        .getDownloadURL()
        .then( url => {
            setImageLink(url);
            setImageUploading(false);
        })
        .catch( (err) => {
            setImageUploading(false);
            console.error("Error getting image url");
            console.error(err);
        });
    }

    function getLogo(imageName) { 
        storage
        .refFromURL(`gs://app23980-providers-data/logos/${imageName}` )
        .getDownloadURL()
        .then( url => {
            setLogoLink(url);
            setLogoUploading(false);
        })
        .catch( (err) => {
            setLogoUploading(false);
            console.error("Error getting " + imageName + " logo url: ");
            console.error(err);
        });
    }

    const handleImageChange = async (image) => {
        const formData = new FormData();
        const blocks = image.name.split('.');
        const imageType = blocks[blocks.length-1];
        const newImageName = (Math.floor(Math.random() * (100000000 + 1)) + "." + imageType);
        formData.append('image', image, newImageName);
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
            setImageLink(getImage(newImageName));
            setImageName(newImageName);
            console.log("image uploaded: " + imageName + " " + imageLink);
        })
        .catch(() => {
            console.log("Error uploading the image");
            setImageUploading(false);
        })
    }

    const handleLogoChange = async (image) => {
        const formData = new FormData();
        const blocks = image.name.split('.');
        const imageType = blocks[blocks.length-1];
        const newLogoName=(Math.floor(Math.random() * (100000000 + 1)) + "." + imageType);
        formData.append('image', image, newLogoName);
        setLogoUploading(true);
        let response = await fetch('https://europe-west1-app23980.cloudfunctions.net/uploadLogo', {
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
            },
            body: formData
        })
        .then(() => {
            setLogoLink(getLogo(newLogoName));
            setLogoName(newLogoName);
        })
        .catch(() => {
            console.log("Error uploading the image");
            setLogoUploading(false);
        })
    }

    function handleListingImage() {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    function handleListingLogo() {
        const fileInput = document.getElementById('logoInput');
        fileInput.click();
    }

    function addRemoveTopics(topic) {
        console.log("Adding " + topic);
        setListingTopics(() => {
            if (listingTopics.includes(topic)) {
                console.log(topic + " already in list, removing it");
                const newList = listingTopics.filter(item => item!==topic);
                document.getElementsByClassName('topics-selection__input--' + topic)[0].classList.remove("topics-selection--selected");
                return newList;
            } else if (listingTopics.length < 3) {
                document.getElementsByClassName('topics-selection__input--' + topic)[0].classList.add("topics-selection--selected");
                return [...listingTopics, topic];
            } else {
                return listingTopics;
            }
        });
    }

    return(
        <Container className="container">
            <main>
            <h2>
                <TranslatedText id="navbar.newListing.link" />
            </h2>  

            <form className={"new-class-form noValidate " + (success ? "hide" : "show")} autoComplete="off" onSubmit={handleSubmit}>
                <div className="provider-form-item">
                    <label className="required" title="listingTitle">
                        <TranslatedText id="newListing.title" />
                    </label>
                    <TextField
                        required
                        id="listingTitle"
                        value={listingTitle}
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setListingTitle(e.currentTarget.value)}
                    />
                </div>
                
                <h3>                            
                    <TranslatedText id="newListing.specificDate" />
                </h3>
                <div className="specific-date">
                    <label className="specific-date-label">
                    <TranslatedText id="general.no" />
                    </label>
                    <Radio
                        checked={specificDate === 'false'}
                        onChange={(e) => setSpecificDate(e.currentTarget.value)}
                        value='false'
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                    <label className="specific-date-label">
                    <TranslatedText id="general.yes" />
                    </label>
                    <Radio
                        checked={specificDate === 'true'}
                        onChange={(e) => setSpecificDate(e.currentTarget.value)}
                        value='true'
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                </div>
                { (specificDate === 'true') ? (
                    <React.Fragment>
                    <div className="provider-form-item">
                        <label className="required" title="date">
                            <TranslatedText id="newListing.date" />
                        </label>
                        <input 
                            required
                            className="date-selector" 
                            type="date" 
                            name="date"
                            value={date}
                            margin="normal"
                            placeholder="2019-12-01"
                            onChange={(e) => setDate(e.currentTarget.value)}
                        />
                    </div>
                    <div className="provider-form-item">
                        <label className="required" title="time">
                            <TranslatedText id="newListing.time" />
                        </label>
                        <input
                            required
                            className="date-selector" 
                            type="time" 
                            name="time"
                            value={time}
                            margin="normal"
                            placeholder="17:30"
                            onChange={(e) => setTime(e.currentTarget.value)}
                        />
                    </div>
                    </React.Fragment>)
                    :
                    null
                }
                <h3><TranslatedText id="newListing.format" /></h3>
                <div className="specific-date">
                    <label className="specific-date-label">
                        <TranslatedText id="general.online" />
                    </label>
                    <Radio
                        checked={online === 'true'}
                        onChange={(e) => setOnline(e.target.value)}
                        value='true'
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                    <label className="specific-date-label">
                    <TranslatedText id="general.inPerson" />
                    </label>
                    <Radio
                        checked={online === 'false'}
                        onChange={(e) => setOnline(e.currentTarget.value)}
                        value='false'
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                </div>
                { (online==="true") ?
                    (   
                        <React.Fragment>
                            <h3>                                
                                <TranslatedText id="general.type" />
                            </h3>
                            <div className="specific-date">    
                                <label className="type-label">
                                    <TranslatedText id="newListing.class" />
                                </label>
                                <Radio
                                    checked={listingFormat === 'class'}
                                    onChange={(e) => setListingFormat(e.currentTarget.value)}
                                    value='class'
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'A' }}
                                />
                                <label className="type-label">
                                    <TranslatedText id="newListing.webinar"  />
                                </label>
                                <Radio
                                    checked={listingFormat === 'webinar'}
                                    onChange={(e) => setListingFormat(e.currentTarget.value)}
                                    value='webinar'
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'A' }}
                                />  
                            </div>
                        </React.Fragment>
                    )
                    :
                    (
                        <React.Fragment>
                            <h3>
                                <TranslatedText id="general.type" />
                            </h3>
                            <div className="specific-date">    
                            {/* <select required onChange={e => setFormat(e.currentTarget.value)}> */}
                                <label className="type-label">
                                    <TranslatedText id="newListing.class" />
                                </label>
                                <Radio
                                    checked={listingFormat === 'class'}
                                    onChange={(e) => setListingFormat(e.currentTarget.value)}
                                    value='class'
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'A' }}
                                />
                                <label className="type-label">
                                    <TranslatedText id="newListing.seminar"  />
                                </label>
                                <Radio
                                    checked={listingFormat === 'seminar'}
                                    onChange={(e) => setListingFormat(e.currentTarget.value)}
                                    value='seminar'
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'A' }}
                                />
                                <label className="type-label">
                                    <TranslatedText id="newListing.meetup"  />
                                </label>
                                <Radio
                                    checked={listingFormat === 'meetup'}
                                    onChange={(e) => setListingFormat(e.currentTarget.value)}
                                    value='meetup'
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'A' }}
                                />          
                            </div>
                            <h3>                                
                                <TranslatedText id="newListing.location" />
                            </h3>
                            <div className="provider-form-item">
                                <label className="required" title="city">
                                <TranslatedText id="newListing.city" />: </label>
                                <TextField
                                    required
                                    id="city"
                                    value={city}
                                    margin="normal"
                                    variant="outlined"
                                    onChange={(e) => setCity(e.currentTarget.value)}
                                />
                            </div>
                            <div className="provider-form-item">
                                <label className="required" title="district">
                                <TranslatedText id="newListing.district" />: </label>
                                <TextField
                                    required
                                    id="district"
                                    value={district}
                                    margin="normal"
                                    variant="outlined"
                                    onChange={(e) => setDistrict(e.currentTarget.value)}
                                />
                            </div>
                            <div className="provider-form-item">
                                <label className="required" title="address">                                
                                <TranslatedText id="newListing.address" />: </label>
                                <TextField
                                    required
                                    id="address"
                                    value={address}
                                    margin="normal"
                                    variant="outlined"
                                    onChange={(e) => setAddress(e.currentTarget.value)}
                                />
                            </div>
                        </React.Fragment>
                    )
                }
                

                <h3><TranslatedText id="newListing.bookingInfo" /></h3>
                <div className="provider-form-item">
                    <label className="required" title="price">
                    <TranslatedText id="newListing.price" /> (€)
                    </label>
                    <TextField
                        required
                        id="price"
                        value={price}
                        margin="normal"
                        variant="outlined"
                        placeholder="25"
                        onChange={(e) => setPrice(e.currentTarget.value)}
                    />
                </div>
                <div className="provider-form-item">
                    <label className="required" title="website">
                    <TranslatedText id="newListing.website" /></label>
                    <TextField
                        required
                        id="website"
                        margin="normal"
                        variant="outlined"
                        value={website}
                        placeholder="https://google.com"
                        onChange={(e) => setWebsite(e.currentTarget.value)}
                    />
                </div>

                <h3><TranslatedText id="general.topics" /></h3>
                <div className="provider-form-item">
                    <label className="required" title="tags">
                    <TranslatedText id="newListing.topics" />
                    </label>
                    <div className="topics-selection">
                    { 
                        TOPICS.map(topic => {
                            return(
                                <div 
                                    key={topic.id} 
                                    onClick={()=>addRemoveTopics(topic.id)}
                                    className={`topics-selection__input topics-selection__input--${topic.id}`}
                                >
                                    <span 
                                        style={{textTransform:'capitalize'}} 
                                    >
                                        <TranslatedText id={`topics.${topic.id}`} />
                                    </span>
                                </div>
                            );
                        })
                    }
                    </div>
                </div>

                <h3><TranslatedText id="newListing.additionalInfo" /></h3>
                <div className="provider-form-item">
                    <label className="required" title="image">
                    <TranslatedText id="newListing.image" />
                    </label>
                    <Tooltip title="Edit listing image" placement="top">
                        <div className="image-container image-container--listing-image">
                        {(imageUploading) ?
                            (<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <SmallLoader style/>
                            </div>)
                            :
                            (imageLink!=="") ? 
                                (
                                    <React.Fragment>
                                        <img 
                                            style={{ position:'absolute', width: '750px', height: '300px' }} 
                                            src={imageLink} 
                                            alt="Add a compeling image to bring your listing to life."
                                        />
                                        <EditIcon 
                                            className="image-container__edit-icon image-container__edit-icon--image"
                                            onClick={ handleListingImage }
                                        />
                                    </React.Fragment>
                                )
                                :
                                (
                                    <div 
                                        style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems:'center', color: '#999999'}}
                                        onClick={ handleListingImage }
                                    >
                                        <EditIcon style={{ marginBottom: '20px'}} />
                                        <strong><TranslatedText id="newListing.addImage" /></strong>
                                        <p><TranslatedText id="newListing.addCompelingImage" /></p>
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
                    <label className="required" title="duration">
                    <TranslatedText id="newListing.duration" /> (mins)</label>
                    <TextField
                        required
                        id="duration"
                        value={duration}
                        margin="normal"
                        variant="outlined"
                        placeholder="90"
                        onChange={(e) => setDuration(e.currentTarget.value)}
                    />
                </div>
                <div className="provider-form-item">
                    <label className="required" title="Customer">
                    <TranslatedText id="newListing.language" /></label>
                    <select required onChange={e => setLanguage(e.currentTarget.value)}>
                        <option value=""></option>
                        <option value="english">English</option>
                        <option value="french">French</option>
                        <option value="spanish">Spanish</option>
                        <option value="norwegian">Norwegian</option>
                        <option value="swedish">Swedish</option>
                    </select>
                </div>
                <div className="provider-form-item">
                    <label className="required" title="description">
                    <TranslatedText id="newListing.description" />: </label>
                    <TextField
                        required
                        id="description"
                        value={description}
                        multiline
                        rows="12"
                        // placeholder={<TranslatedText id="newListing.describeClass" />}
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setDescription(e.currentTarget.value)}
                    />
                </div>
                {/* {   (auth.user && auth.isAdmin) ? */}
                    <React.Fragment>
                        <div className="admin-section">
                            <em><TranslatedText id="newListing.offeredBy" /></em>
                        </div>
                        <div className="provider-form-item">
                            <label className="required" title="companyName">
                            <TranslatedText id="newListing.companyName" /> </label>
                            <TextField
                                id="companyName"
                                value={companyName}
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => setCompanyName(e.currentTarget.value)}
                            />
                        </div>
                        <div className="provider-form-item">
                            <label className="required" title="image">
                                <TranslatedText id="newListing.logo" /> 
                            </label>
                            <Tooltip title="Add a logo (max 500px x 500px)" placement="top">
                            <div className="image-container image-container--listing-logo">
                            {(logoUploading) ?
                                (<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <SmallLoader style/>
                                </div>)
                                :
                                (logoLink!=="") ? 
                                    (<React.Fragment>
                                        <img 
                                            src={logoLink} 
                                            className="image-container__image image-container__image--logo"
                                            alt="Logo"
                                        />
                                        <EditIcon 
                                            className="image-container__edit-icon image-container__edit-icon--logo"
                                            onClick={ handleListingLogo }
                                        />
                                    </React.Fragment>)
                                    :
                                    (<div 
                                        style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems:'center', color: '#999999'}}
                                        onClick={ handleListingLogo }
                                    >
                                        <EditIcon
                                            style={{ marginBottom: '5px'}} />
                                        <strong><TranslatedText id="newListing.addImage" /></strong>
                                    </div>)
                            }
                            </div>
                        </Tooltip>
                        <input
                            type="file"
                            id="logoInput"
                            hidden="hidden"
                            onChange={ e => {
                                let logo = e.currentTarget.files[0];
                                if(logo!==null && typeof logo !== 'undefined') handleLogoChange(logo)}}
                        />
                        </div>
                    </React.Fragment>
                        {/* :
                        null
                } */}
                
                <div className="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                
                    <div className="form-buttons">
                        <Link to={{pathname:`/${locale.split('-')[0]}/listings`}}>
                            <Button variant="outlined" className="cancel-form-data secondary">            
                                <TranslatedText id="general.cancel" />
                            </Button>
                        </Link>
                        { !loading ? (
                        <Button variant="contained" className="send-form-data primary" type="submit" >  
                            &nbsp;<TranslatedText id="general.save" />
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
                    <Link to={{pathname:`/${locale.split('-')[0]}/listings`}}>
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
