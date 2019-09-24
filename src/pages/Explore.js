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
import { LocaleContext } from '../contexts/LocaleContext';

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

    const classesList = props.classes.map(
        (classEntry) => {
            if ((classEntry.type === 'group' || classEntry.type === "meetup") && new Date(classEntry.date) > new Date()) {
                return(
                    <Grid item xs={12} sm={6} md={4} key={classEntry.id}>
                    <ClassCard classEntry={classEntry} />      
                    </Grid>
                );
            }
        }
    );

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
    let groupCount = classesList.filter((item) => item !== '' && item != null).length;
    let onlineCount = onlineClassesList.filter((item) => item !== '' && item != null).length;
    // console.log(props.classes.length + " classes: " + props.classes);
    console.log(groupCount + " classes in Madrid");
    console.log(onlineCount + " classes online");
    return(
        <LocaleContext.Consumer>{(context) => {
            const locale = context.locale;
            return(<Container className="main-content">
            <div className="result-filters">
                {(props.topic!=="all")?
                    <span className={`tag tag-${props.topic}`}>
                        <FormattedMessage 
                            id={`topics.${props.topic.split(" ")[0]}.${locale}`}
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
                                id={`explore.tab.madrid.${locale}`}
                                defaultMessage="Madrid"
                                values={{
                                    count: groupCount
                                }}
                            />
                        } 
                        {...a11yProps(0)} 
                    />
                    <Tab 
                        label={
                            <FormattedMessage 
                                id={`explore.tab.online.${locale}`}
                                defaultMessage="online"
                                values={{
                                    count: onlineCount
                                }}
                            />
                        } 
                        {...a11yProps(1)} 
                    />
                </Tabs>
            </AppBar>
            <TabPanel className="search-results" value={value} index={0}>
                {(groupCount > 0 ) ?
                <Grid container spacing={2} alignContent="center">
                    {classesList.filter((item) => item !== '')}
                </Grid>
                :
                <p>
                    <FormattedMessage 
                        id={`explore.results.madrid.none.${locale}`}
                        defaultMessage=""
                        values={{
                            topicLabel: <FormattedMessage 
                                            id={`topics.${props.topic.split(" ")[0]}.${locale}`}
                                            defaultMessage={props.topic}
                                        />
                        }}
                    />
                </p>}
            </TabPanel>
            <TabPanel className="search-results" value={value} index={1}>
                {(onlineCount > 0 ) ?
                <Grid container spacing={2} alignContent="center">
                    {onlineClassesList.filter((item) => item !== '')}
                </Grid>
                :
                <p>
                    <FormattedMessage 
                        id={`explore.results.online.none.${locale}`}
                        defaultMessage=""
                        values={{
                            topicLabel: 
                                <FormattedMessage 
                                    id={`topics.${props.topic.split(" ")[0]}.${locale}`}
                                    defaultMessage={props.topic}
                                />
                        }}
                    />
                </p>}
            </TabPanel>
        </Container>)}}</LocaleContext.Consumer>
    );
}

export default Explore;