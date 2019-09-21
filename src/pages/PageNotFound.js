import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { LocaleContext } from '../contexts/LocaleContext';

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

function PageNotFound(props) {
    const classes = useStyles();

    return(
        <LocaleContext.Consumer>{(context) => {
            const locale = context.locale;
            return(<Container className="main-content">
            <div className="col content">
                <div className={classes.root}>
                    <p><FormattedMessage 
                        id={`errorPage.notFound.${locale}`}
                        defaultMessage=""
                    /></p>
                </div>
            </div>
        </Container>)}}</LocaleContext.Consumer>
    );
}

export default PageNotFound; 