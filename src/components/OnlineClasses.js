import React from 'react';
import { Link } from 'react-router-dom';
import OnlineClassCard from './OnlineClassCard';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

// function RenderCard() {
//     resources.map((resource) => {
//         return(
//             <Grid item xs={12} sm={6} md={4}>
//                 <OnlineClassCard classEntry={resource} />      
//             </Grid>
//         );
//     });
// }

// function RenderCardsList({resources}) {
//     return (
//         <Grid container spacing={2}>
//             {}
//         </Grid>
//     );
// }

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

function OnlineClasses(props) {
    const classes = useStyles();

    const classesList = props.onlineClasses.map((classEntry) => {
        if( classEntry.type === 'online') {
            return (
                <Grid key={classEntry.id} item xs={12} sm={6} md={4}>
                    <OnlineClassCard classEntry={classEntry} />      
                </Grid>
            );
        } else {
            return(
                <span />
            );
        }
    });

    const providersList = props.onlineProviders.map((provider) => {
        return (
            <Grid item xs={4} sm={3} md={2} key={provider.id}>
                <div className="logo-container">
                    <Link to={`classes/${provider.id}`}> 
                        <img src={`../images/logos/${provider.logo}.png`} alt={`${provider.logo} logo`} />
                    </Link>
                </div>
            </Grid>
        );        
    });

    return(
        <React.Fragment>
            {/* <MobileHeader /> */}
            <Container>
                <div className="col content">
                    <div className={classes.root}>
                        <h2>Online Classes</h2>
                        <Grid container spacing={2}>
                            {classesList}
                        </Grid>
                    </div>
                </div>
            </Container>
            <Container>
                <div className="col content">
                    <div className={classes.root}>
                        <h2>Online Providers</h2>
                        <Grid container spacing={2}>
                            {providersList}
                        </Grid>
                    </div>
                </div>
            </Container>
        </React.Fragment>
    );
}

export default OnlineClasses; 