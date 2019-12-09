import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ListingCard from "../components/ListingCard";
import { FormattedMessage } from "react-intl";
import { LocaleContext } from "../contexts/LocaleContext";
import { ListingsContext } from "../contexts/ListingsContext";
import { transform } from "@babel/core";
import TranslatedText from "../components/TranslatedText";
import Icon from "@material-ui/core/Icon";
import { TOPICS } from "../shared/topicsJSON";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`
  };
}

function Explore(props) {
  const [value, setValue] = useState(props.tab);
  const { currentListings, currentTopic, setCurrentTopic } = useContext(
    ListingsContext
  );
  const listings = currentListings();
  const { locale } = useContext(LocaleContext);
  // console.log(listings);
  // const [tab, setTab] = useState(props.tab);

  function handleChange(event, newValue) {
    // scroll down 1px to trigger lazy loading of cards
    window.scrollBy(0, 1);
    setValue(newValue);
  }
  //   console.log(listings);
  const classesList = listings.map(listing => {
    console.log(
      listing.date == null
        ? listing.id + ": " + "no date"
        : listing.id + ": " + new Date(listing.date.seconds * 1000)
    );
    if (
      !listing.online &&
      listing.city.toLowerCase() === props.city &&
      (listing.format === "group" ||
        listing.format === "class" ||
        listing.format === "workshop") &&
      new Date(listing.date.seconds * 1000) >= new Date()
    ) {
      return (
        <Grid item xs={12} sm={6} md={4} key={listing.id}>
          <ListingCard
            nameId={listing.nameId}
            format={listing.format}
            online={listing.online}
            listingImage={listing.listingImage}
            listingTitle={
              listing.hasOwnProperty("listingTitle")
                ? listing.listingTitle
                : listing.listingName
            }
            companyLogo={listing.companyLogo}
            companyName={listing.companyName}
            date={listing.date}
            duration={listing.duration}
            district={listing.district}
            address={listing.address}
            city={listing.city}
            language={listing.language}
            tags={listing.tags}
          />
        </Grid>
      );
    }
  });

  const meetupsList = listings.map(listing => {
    if (
      !listing.online &&
      listing.city.toLowerCase() === props.city &&
      listing.format === "meetup"
    ) {
      return (
        <Grid item xs={12} sm={6} md={4} key={listing.id}>
          <ListingCard
            nameId={listing.nameId}
            format={listing.format}
            online={listing.online}
            listingImage={listing.listingImage}
            listingTitle={
              listing.hasOwnProperty("listingTitle")
                ? listing.listingTitle
                : listing.listingName
            }
            companyLogo={listing.companyLogo}
            companyName={listing.companyName}
            date={listing.date}
            duration={listing.duration}
            district={listing.district}
            address={listing.address}
            city={listing.city}
            language={listing.language}
            tags={listing.tags}
          />
        </Grid>
      );
    } else {
      return null;
    }
  });

  const seminarsList = listings.map(listing => {
    if (
      !listing.online &&
      listing.city.toLowerCase() === props.city &&
      (listing.format === "seminar" || listing.format === "webinar")
    ) {
      return (
        <Grid item xs={12} sm={6} md={4} key={listing.id}>
          <ListingCard
            nameId={listing.nameId}
            format={listing.format}
            online={listing.online}
            listingImage={listing.listingImage}
            listingTitle={
              listing.hasOwnProperty("listingTitle")
                ? listing.listingTitle
                : listing.listingName
            }
            companyLogo={listing.companyLogo}
            companyName={listing.companyName}
            date={listing.date}
            duration={listing.duration}
            district={listing.district}
            address={listing.address}
            city={listing.city}
            language={listing.language}
            tags={listing.tags}
          />
        </Grid>
      );
    } else {
      return null;
    }
  });
  // TODO better way to do this
  let classesCount = classesList.filter(item => item !== "" && item != null)
    .length;
  let seminarsCount = seminarsList.filter(item => item !== "" && item != null)
    .length;
  let meetupsCount = meetupsList.filter(item => item !== "" && item != null)
    .length;

  // console.log(props.classes.length + " classes: " + props.classes);
  console.log(classesCount + " classes");
  console.log(seminarsCount + " seminars");
  console.log(meetupsCount + " meetups");

  return (
    <Container className="main-content">
      <h2 style={{ textTransform: "capitalize" }}>
        {props.format === "online" ? (
          <FormattedMessage
            id={`explore.tab.online.${locale}`}
            defaultMessage="Online"
          />
        ) : (
          <FormattedMessage
            id={`explore.tab.${props.city}.${locale}`}
            defaultMessage={props.city}
          />
        )}
      </h2>

      <div className="result-filters scroll-container">
        {/* { currentTopic && currentTopic.id!=="" ? (<div 
                            onClick={()=>setCurrentTopic("")}
                            className={"topics-selection__input topics-selection__input--all " 
                                + (currentTopic === "" ? 'topics-selection--selected' : null)  }
                        >
                            <span 
                                style={{textTransform:'capitalize'}} 
                            >
                                <TranslatedText id={`topics.${currentTopic.id}`} />
                            </span>
                        </div>)
                        :
                        null
                    } */}
        <div
          onClick={() => setCurrentTopic("")}
          className={
            "topics-selection__input topics-selection__input--all " +
            (currentTopic === "" ? "topics-selection--selected" : null)
          }
        >
          <span style={{ textTransform: "capitalize" }}>
            <TranslatedText id={`topics.all`} />
          </span>
        </div>
        {TOPICS.map(topic => {
          return (
            <div
              key={topic.id}
              onClick={() => setCurrentTopic(topic.id)}
              className={
                `topics-selection__input topics-selection__input--${topic.id} ` +
                (currentTopic.toLowerCase() === topic.id.toLocaleLowerCase()
                  ? "topics-selection--selected"
                  : currentTopic
                  ? "hidden"
                  : "null")
              }
            >
              <span style={{ textTransform: "capitalize" }}>
                <TranslatedText id={`topics.${topic.id}`} />
              </span>
            </div>
          );
        })}
      </div>
      {classesCount > 0 ? (
        <Grid container spacing={2} alignContent="center">
          {classesList.filter(item => item !== "")}
        </Grid>
      ) : (
        <p>
          <FormattedMessage
            id={`explore.results.city.none.${locale}`}
            defaultMessage=""
          />
        </p>
      )}
    </Container>
  );
}

export default Explore;
