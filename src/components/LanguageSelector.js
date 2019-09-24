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
                    />:
                </span>
                <a href="/es" className="language-selector-btn" onClick={setSpanish}>español</a>
                <a href="/en" className="language-selector-btn" onClick={setEnglish}>english</a>

            </div>);
    }}</LocaleContext.Consumer>);
}