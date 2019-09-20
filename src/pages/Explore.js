import React from 'react';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ClassCard from '../components/ClassCard';
import { FormattedMessage } from 'react-intl';


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
    value: PropTypes.any.isRequired,
};
  
function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}


function Explore(props) {
    const [value, setValue] = React.useState(props.tabSelected);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    let duplicates = [];

    const classesList = props.classes.map((classEntry) => {
        if( classEntry.type === 'group' || classEntry.type === "meetup") {
            let classEntryName = classEntry.className + "_" + classEntry.companyName;
            if (new Date(classEntry.date) > new Date()) {
                duplicates.push(classEntryName);
                return (
                    <Grid item xs={12} sm={6} md={4} key={classEntry.id}>
                        <ClassCard classEntry={classEntry} />      
                    </Grid>
                );
            } else {
                return null;
            }
        } else {
            return(
                null
            );
        }
    });

    const onlineClassesList = props.classes.map((classEntry) => {
        if( classEntry.type === 'online') {
            return (
                <Grid item xs={12} sm={6} md={4} key={classEntry.id}>
                    <ClassCard classEntry={classEntry} />      
                </Grid>
            );        
        } else {
            return(
                null
            );
        }
    });

    return(
        <Container className="main-content">
            <div className="result-filters">
                {(props.topic!=="all")?
                    <span className={`tag tag-${props.topic}`}>
                        <FormattedMessage 
                            id={`topics.${props.topic.split(" ")[0]}.${props.locale}`}
                            defaultMessage={props.topic}
                        />
                    </span>
                    :
                    null
                }
            </div>
            <AppBar position="static" color="default">
                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="full width tabs example">
                    <Tab 
                        label={
                            <FormattedMessage 
                                id={`explore.tab.madrid.${props.locale}`}
                                defaultMessage="Madrid"
                            />
                        } 
                        {...a11yProps(0)} 
                    />
                    <Tab 
                        label={
                            <FormattedMessage 
                                id={`explore.tab.online.${props.locale}`}
                                defaultMessage="online"
                            />
                        } 
                        {...a11yProps(1)} 
                    />
                </Tabs>
            </AppBar>
            <TabPanel className="search-results" value={value} index={0}>
                {(classesList.length > 0) ? 
                    <Grid container spacing={2} alignContent="center">
                        {classesList}
                    </Grid> 
                    : <p>No classes found</p>}
            </TabPanel>
            <TabPanel className="search-results" value={value} index={1}>
                {(onlineClassesList.length > 0) ? 
                    <Grid container spacing={2} alignContent="center">
                        {onlineClassesList}
                    </Grid> 
                    : <p>No classes found</p>}
            </TabPanel>
        </Container>
    );
}

export default Explore;