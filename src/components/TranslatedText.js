import React, { useContext } from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { LocaleContext } from '../contexts/LocaleContext';

const TranslatedText = ({id, defaultText}) => {
    const { locale } = useContext(LocaleContext);
    return(
        <FormattedMessage 
            id={`${id}.${locale}`}
            defaultMessage={defaultText}
        />
    );
}

export default TranslatedText;