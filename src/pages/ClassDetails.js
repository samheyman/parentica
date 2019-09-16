import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

function RenderTags({tags}) {
    let i=0;
    const output = tags.map((tag) => {
        return (
            <Link key={i++} to={{pathname:"/explore", topic:`${tag}`}}>
                <span className={`tag tag-${tag}`}>{tag}</span>
            </Link>
        );
    });
    return output;
}

function RenderDescription({description}) {
    let i=0;
    const formatedDescription = description.map((paragraph) => {
        return (
            <p key={i++}>{paragraph}</p>
        );
    });
    return formatedDescription;
}

function RenderOtherClasses({otherClasses}) {
    // const formatedDates = <span>{new Intl.DateTimeFormat('es-ES', { weekday: 'short', day: '2-digit', month: 'short' }).format(new Date(Date.parse(date)))}</span>;
    // const formatedTime = <span>{new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }).format(new Date(Date.parse(date)))}</span>;
    let i =0;
    const otherClassesList = otherClasses.map((item) => {
        let formatedDates = null;
        if (item.date != null) {
            formatedDates = <span>{new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: '2-digit', month: 'short' }).format(new Date(Date.parse(item.date)))}</span>;
        }
        return (
            <TableRow key={i++}>
                <TableCell>
                    <Link to={`/classes/${item.nameId}`}>{item.className}</Link>
                </TableCell>
                <TableCell>{formatedDates} - {item.time}</TableCell>
                <TableCell>
                    {item.district}
                </TableCell>
            </TableRow>
        );
    });
    if(otherClasses.length > 0) {
        return (
            <Table>
                <TableBody>
                    {otherClassesList}  
                </TableBody>
            </Table>
        );
    } else {
        return(<p>No other classes found.</p>);
    } 
}

function ClassDate({classDate}, {icon}) {
    if (classDate != null) {
        return(
            <div className="value">
                <Icon className={icon}>
                calendar_today
                </Icon>
                <span className="date-time">{new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: '2-digit', month: 'short' }).format(new Date(Date.parse(classDate)))}</span>
            </div>
        );
    } else {
        return null;
    }
}

function ClassTime({classTime}, {icon}) {
    if (classTime != null) {
        return(
            <div className="value">
                <Icon className={icon}>
                schedule
                </Icon>
                <span>{classTime}</span>
            </div>
        );
    } else {
        return null;
    }
}

function ClassPrice({classPrice, classPriceCouple}) {
    let price = null;
    let couplePrice = null;

    if (classPrice != null && classPrice > 0) {
        price =  <span className="class-price">Price: {classPrice}€</span>;
    } else {
        price =  <span className="class-price">Price: Free</span>;
    }
    if (classPriceCouple >= 0) {
        couplePrice = <span className="class-price"> ({classPriceCouple}€ for couples)</span>;
    } 
   
    return(
        <div className="value">
            {price} {couplePrice}
        </div>
    );
}

function ClassLocation({address, icon}) {
    if (address != null) {
        return(
            <div className="value">
                <Icon className={icon}>
                location_on
                </Icon>
                <span>{address}</span>
            </div>
        );
    } else {
        return null;
    }
}

function ClassLanguage({language}, {icon}) {
    if (language != null) {
        return(
            <div className="value">
                <Icon className={icon}>
                language
                </Icon>
                <span className="language">{language}</span>
                <img className="language-flag" src={`../images/flags/${language}.png`} alt={`${language}`} />
            </div>
        );
    } else {
        return null;
    }
}

function ClassDuration({duration}, {icon}) {
    if (duration != null) {
        return(
            <div className="value">
                <Icon className={icon}>
                timelapse
                </Icon>
                <span>{duration}</span>
            </div>
        );
    } else {
        return null;
    }
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
}
const useStyles = makeStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
    companyName: {
      fontSize: 16,
    },
    className: {
      fontSize: 22,
      fontWeight: 600,
    },
    icon: {
      fontSize:20,
      verticalAlign: 'middle',
      display: 'inline-flex',
    },
    cardFooter: {
      fontSize: 14,
    },
    root: {
        backgroundColor: 'ffffff',
      //   width: 1000,
    },
});

function ClassDetails(props) {
    
    const divStyle = {
        backgroundImage: 'url(../images/classes/' + props.selectedClass.image + ')',
    };
    const classes = useStyles();

    const theme = useTheme();

    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    // function handleChangeIndex(index) {
    //     setValue(index);
    // }
    return(
        <React.Fragment>
            <ScrollToTop/>
            <div className="row">
                <Grid container className="class-details-container">
                    <div className="class-image-mobile hide-on-med-and-up" style={divStyle}></div>
                    {/* <Grid className="col s12 m4 main-content"> */}
                    <div className="class-image hide-on-med-and-down" style={divStyle}>
                            </div>
                        <Grid item xs={12} sm={12} md={12} className="class-details">
                            
                            <div className="header">
                                <h2 className="class-title">{props.selectedClass.className}</h2>
                                <div className="company">
                                    <img className="logo" src={`../images/logos/${props.selectedClass.companyLogo}`} alt={`${props.selectedClass.companyLogo} logo`}></img>
                                    <div className="company-name">
                                        {props.selectedClass.companyName}
                                    </div>
                                </div>
                                <div className="class-top-info">
                                        {/* <Icon className={classes.icon} color="">
                                        price
                                        </Icon> */}
                                        {/* <span>{props.selectedClass.price}€</span> */}
                                    <ClassDate classDate={props.selectedClass.date} classes={classes.icon} />
                                    <ClassTime classTime={props.selectedClass.time} classes={classes.icon} />
                                    <ClassDuration duration={props.selectedClass.duration} classes={classes.icon} />
                                    <ClassLocation address={props.selectedClass.address} classes={classes.icon} />
                                    <ClassLanguage language={props.selectedClass.language} classes={classes.icon} />
                                    <ClassPrice classPrice={props.selectedClass.price} classPriceCouple={props.selectedClass.priceCouple} />

                                </div>
                                
                            </div>
                            <div className="class-tags">
                                <RenderTags tags={props.selectedClass.tags} />
                            </div>
                            <div className="button-div">
                                <a href={props.selectedClass.url} target="_blank" rel="noopener noreferrer" 
                                    onClick={()=>{
                                        window.gtag("event", props.selectedClass.companyName, {
                                            event_category: "conversions",
                                            event_label: props.selectedClass.companyName + " - " + props.selectedClass.className
                                        }); 
                                    }}
                                >
                                    <Button variant="outlined" color="primary">Go to website</Button>
                                </a>
                            </div>
                            <div className="row">
                                <div className="class-details-tabs">
                                    <AppBar position="static" color="default">
                                        <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        variant="fullWidth"
                                        aria-label="full width tabs example"
                                        >
                                        <Tab label="About" {...a11yProps(0)} />
                                        <Tab label="Other classes" {...a11yProps(1)} />
                                        {/* <Tab label="Price" {...a11yProps(2)} /> */}
                                        </Tabs>
                                    </AppBar>
                                    
                                    <TabPanel className="about-class" value={value} index={0} dir={theme.direction}>
                                        <RenderDescription 
                                            description={props.selectedClass.description}
                                        />
                                    </TabPanel>
                                    <TabPanel className="about-class" value={value} index={1} dir={theme.direction}>
                                        <RenderOtherClasses
                                            otherClasses={props.otherClasses.filter((item) => (item.companyName === props.selectedClass.companyName) && item.id !== props.selectedClass.id)}
                                        />
                                    </TabPanel>
                                    {/* <TabPanel value={value} index={2} dir={theme.direction}>
                                        <RenderPrice
                                            price={props.selectedClass.price}
                                        />
                                    </TabPanel> */}
                                </div>
                            </div>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );

}

export default withRouter(ClassDetails);