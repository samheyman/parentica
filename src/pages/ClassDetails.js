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
import { FormattedMessage, FormattedDate } from 'react-intl';
import { LocaleContext } from '../contexts/LocaleContext';

function RenderTags({tags, locale, online}) {
    let i=0;
    let rootUrl = (online) ? 'online' : 'madrid';
    const output = tags.map((tag) => {
        return (
            <Link key={i++} to={{pathname:`/${locale.split('-')[0]}/${rootUrl}/explore`, topic:`${tag}`}}
                onClick={()=>{
                    window.gtag("event", "topic tag from class details", {
                        event_category: "topics",
                        event_label: tag
                    }); 
                }}
            >
                <span className={`tag tag-${tag}`}>
                    <FormattedMessage 
                        id={`topics.${tag.split(" ")[0]}.${locale}`}
                        defaultMessage={tag}
                    />
                </span>
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

function RenderOtherClasses({otherClasses, locale}) {
    let i =0;
    const otherClassesList = otherClasses.map((item) => {
        let formatedDate = null;
        let formatedTime = null;

        if (item.date != null) {
            formatedDate = <span>
                                <FormattedDate
                                    value={item.date}
                                    day="2-digit"
                                    month="2-digit"
                                    />
                            </span>;
            formatedTime = <span>
                                <FormattedDate
                                    value={item.date}
                                    hour="2-digit"
                                    minute="2-digit"
                                    />
                            </span>
        }
        return (
            <TableRow key={i++}>
                <TableCell>
                    <Link to={`/${locale.split('-')[0]}/listings/${item.nameId}`}>{item.className.toLowerCase()}</Link>
                </TableCell>
                <TableCell>{formatedDate} - {formatedTime}</TableCell>
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
        return(
            <p>
                <FormattedMessage 
                    id={`classDetails.noOtherClasses.${locale}`}
                    defaultMessage="No other classes"
                />
            </p>
        );
    } 
}

function ClassDate({classDate}, {icon}) {
    if (classDate != null) {
        return(
            <div className="value">
                <Icon className={icon}>
                calendar_today
                </Icon>
                <span className="date-time">
                    <FormattedDate
                        value={classDate}
                        day="2-digit"
                        month="2-digit"
                    />
                </span>
                <span className="date-time"> 
                &nbsp;-&nbsp;<FormattedDate
                        value={classDate}
                        hour="2-digit"
                        minute="2-digit"
                    />
                </span>
            </div>
        );
    } else {
        return null;
    }
}

function OtherSessions({otherDates}, {icon}) {
    if (otherDates != null) {
        let i=0;
        const dates = otherDates.map((sess) => {
            i++;
            return(
                <div className="" key={i} >
                    <span> 
                        <FormattedDate
                            value={sess}
                            day="2-digit"
                            month="2-digit"
                        />
                    </span>
                    <span>&nbsp;-&nbsp;
                        <FormattedDate
                            value={sess}
                            hour="2-digit"
                            minute="2-digit"
                        />
                    </span>             
                </div>
                );
        });
        return(
            <div className="value">
                <div className="other-dates">
                    {dates}
                </div>
            </div>
        );
    } else {
        return null;
    }
}

function ClassPrice({classPrice, classPriceCouple, locale}) {
    let price = null;
    let couplePrice = null;

    if (classPrice != null && classPrice > 0) {
        price =  <span className="class-price">
                    <FormattedMessage 
                        id={`classDetails.price.${locale}`}
                        defaultMessage="Price"
                    />:
                    &nbsp;{classPrice}€
                </span>;
    } else {
        price =  <span className="class-price">
                    <FormattedMessage 
                        id={`classDetails.price.${locale}`}
                        defaultMessage="Price"
                    />:
                    &nbsp;
                    <FormattedMessage 
                        id={`classDetails.price.free.${locale}`}
                        defaultMessage="free"
                    />
                </span>;
    }
    if (classPriceCouple >= 0) {
        couplePrice = <span className="price-couples"> 
                ({classPriceCouple}€&nbsp;
                    <FormattedMessage 
                        id={`classDetails.price.forCouples.${locale}`}
                        defaultMessage="for couples"
                    />
                )
            </span>;
    } 
   
    return(
        <div>
            {price} <br/> {couplePrice}
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

function ClassLanguage({language, locale}, {icon}) {
    if ((language==='english' && locale==='es-ES') || (language==='spanish' && locale==='en-GB')) {
        return(
            <div className="value">
                <Icon className={icon}>
                language
                </Icon>
                <span className="language">
                    <FormattedMessage 
                        id={`general.${language}.${locale}`}
                        defaultMessage=""
                    />
                </span>
                <img className="language-flag" src={`../../images/flags/${language}.png`} alt={`${language}`} />
            </div>
        );
    } else {
        return null;
    }
}

function ClassDuration({duration, sessions, locale}, {icon}) {
    if (duration != null) {
        return(
            <div className="value">
                <Icon className={icon}>
                timelapse
                </Icon>
                <span>{duration/60}h
                    { (sessions != null && sessions > 1) ? 
                        <span>&nbsp;({sessions}&nbsp; 
                            <FormattedMessage 
                                id={`classDetails.sessions.${locale}`}
                                defaultMessage="sessions"
                            />
                        )</span>
                        :
                        null
                    }
                </span>
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
        backgroundImage: 'url(../../images/classes/' + props.selectedClass.image + '.jpg    )',
    };
    const classes = useStyles();

    const theme = useTheme();

    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return(
        <LocaleContext.Consumer>{(context) => {
            const locale = context.locale;
            return(
            <div className="row">
                <ScrollToTop/>
                <Grid container className="class-details-container">
                    <div className="class-image-mobile hide-on-med-and-up" style={divStyle}></div>
                    {/* <Grid className="col s12 m4 main-content"> */}
                    <div className="class-image hide-on-med-and-down" style={divStyle}>
                            </div>
                        <Grid item xs={12} sm={12} md={12} className="class-details">
                            
                            <div className="header">
                                <h2 className="class-title">{props.selectedClass.className}</h2>
                                <div className="company">
                                    <img className="logo" src={`../../images/logos/${props.selectedClass.companyLogo}.jpg`} alt={`${props.selectedClass.companyLogo} logo`}></img>
                                    <div className="company-name">
                                        {props.selectedClass.companyName}
                                    </div>
                                </div>
                                <div className="class-top-info">
                                        {/* <Icon className={classes.icon} color="">
                                        price
                                        </Icon> */}
                                        {/* <span>{props.selectedClass.price}€</span> */}
                                    <ClassDate classDate={props.selectedClass.date} classTime={props.selectedClass.classTime} classes={classes.icon} />
                                    <OtherSessions otherDates={props.selectedClass.otherDates} classes={classes.icon} />
                                    {/* <ClassTime classTime={props.selectedClass.time} classes={classes.icon} /> */}
                                    <ClassDuration sessions={props.selectedClass.sessions} duration={props.selectedClass.duration} locale={locale} classes={classes.icon} />
                                    <ClassLocation address={props.selectedClass.address} classes={classes.icon} />
                                    <ClassLanguage language={props.selectedClass.language} locale={locale} classes={classes.icon} />
                                    <div className="class-tags">
                                        <FormattedMessage 
                                            id={`classDetails.topics.${locale}`}
                                            defaultMessage=""
                                        /> 
                                        <RenderTags tags={props.selectedClass.tags} locale={locale} rootUrl={props.selectedClass.online} />
                                    </div>
                                </div>           
                            </div>
                            
                            <div className="redirect-div">
                                <ClassPrice classPrice={props.selectedClass.price} classPriceCouple={props.selectedClass.priceCouple} locale={locale} />
                                <div>
                                    <span>
                                        <FormattedMessage 
                                            id={`classDetails.infoLinkToWebsite.${locale}`}
                                            defaultMessage=""
                                        />
                                    </span>
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
                                    <Button variant="contained">
                                        <FormattedMessage 
                                            id={`classDetails.linkToWebsite.${locale}`}
                                            defaultMessage="Go to website"
                                        />
                                        <Icon className={classes.icon}>
                                        &nbsp;keyboard_arrow_right
                                        </Icon>
                                    </Button>
                                    </a>
                                </div>
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
                                        <Tab label=
                                            {<FormattedMessage 
                                                id={`classDetails.about.${locale}`}
                                                defaultMessage="Go to website"
                                            />}
                                            {...a11yProps(0)} 
                                        />
                                        <Tab className="other-classes" label=
                                            {<FormattedMessage 
                                                id={`classDetails.otherClasses.${locale}`}
                                                defaultMessage="Go to website"
                                            />}
                                            {...a11yProps(1)} 
                                        />
                                        </Tabs>
                                    </AppBar>
                                    
                                    <TabPanel className="about-class" value={value} index={0} dir={theme.direction}>
                                        <RenderDescription 
                                            description={props.selectedClass.description}
                                        />
                                    </TabPanel>
                                    <TabPanel className="about-class" value={value} index={1} dir={theme.direction}>
                                        <RenderOtherClasses
                                            locale={locale} otherClasses={props.otherClasses.filter((item) => (item.companyName === props.selectedClass.companyName) && item.id !== props.selectedClass.id)}
                                        />
                                    </TabPanel>
                                </div>
                            </div>
                    </Grid>
                </Grid>
            </div>
        )}}</LocaleContext.Consumer>
    );

}

export default withRouter(ClassDetails);