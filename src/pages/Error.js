import React from 'react';
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

function Error(props) {
    const classes = useStyles();

    return(
            <Container className="main-content">
                <div className="col content">
                    <div className={classes.root}>
                        <p>Sorry, the page you requested was not found.</p>
                    </div>
                </div>
            </Container>
    );
}

export default Error; 