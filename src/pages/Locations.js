import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

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

function Locations(props) {
    const classes = useStyles();

    return(
            <Container className="main-content">
                <div className="col content">
                    <div className={classes.root}>
                        <h2>Locations</h2>
                        <p>We are currently located in and serving Madrid in Spain, but we hope to reach
                        out to other cities in the near future.</p>
                        <p>Feel free to <Link to="contact">contact us</Link> for more information or to list
                        your classes.
                        </p>
                        
                    </div>
                </div>
            </Container>
    );
}

export default Locations; 