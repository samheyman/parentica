import React from 'react';
import Container from '@material-ui/core/Container';
import { LocaleContext } from '../contexts/LocaleContext';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';

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
        <LocaleContext.Consumer>{(context) => {
            const locale = context.locale;
            return(<Container className="main-content">
            <div className="col content">
                <div className={classes.root}>
                    <h2>
                        <FormattedMessage 
                            id={`locations.locations.${locale}`}
                            defaultMessage="Locations"
                        />
                    </h2>
                    <p>
                    <FormattedMessage 
                        id={`locations.contactUs.p1.${locale}`}
                        defaultMessage=""
                    /></p>
                    <p>
                    <FormattedMessage 
                        id={`locations.contactUs.p2.${locale}`}
                        defaultMessage=""
                    /></p>
                </div>
            </div>
        </Container>)}}</LocaleContext.Consumer>
    );
}

export default Locations; 