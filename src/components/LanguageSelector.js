import React from 'react';
import { LocaleContext } from '../contexts/LocaleContext';
import { FormattedMessage } from 'react-intl';


export default function LanguageSelector() {
    return(<LocaleContext.Consumer>{(context) => {
        const {setEnglish, setSpanish} = context;
        const locale = context.locale;
        return(
            <div className="locale-selector">
                <span>
                    <FormattedMessage 
                        id={`navbar.selectLanguage.${locale}`}
                        defaultMessage=""
                    />
                </span>
                <img className="locale-flag" src='../images/flags/spanish.png' alt="Spanish flag"
                    onClick={setSpanish} />
                <img className="locale-flag" src='../images/flags/english.png' alt="British flag"
                    onClick={setEnglish} />
            </div>);
    }}</LocaleContext.Consumer>);
}