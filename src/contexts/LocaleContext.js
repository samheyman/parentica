import React, {createContext, Component} from 'react';

export const LocaleContext = createContext();

class LocaleContextProvider extends Component {

    setEnglish = () => {
        this.setState({ locale: 'en-GB' });
    }
    
    setSpanish = () => {
        this.setState({ locale: 'es-ES' });
    }

    getFirstBrowserLanguage = () => {
        var nav = window.navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i,
        language;

        // support for HTML 5.1 "navigator.languages"
        if (Array.isArray(nav.languages)) {
        for (i = 0; i < nav.languages.length; i++) {
            language = nav.languages[i];
            if (language && language.length) {
            return language;
            }
        }
        }

        // support for other well known properties in browsers
        for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
        language = nav[browserLanguagePropertyKeys[i]];
        if (language && language.length) {
            return language;
        }
        }

        return null;
    };

    state = {
        locale: (window.location.pathname==="/") ?
            this.getFirstBrowserLanguage()
            :
            (window.location.pathname==="/es") ? 'es-ES' : 'en-GB'
    }

    render() {
        // console.log(window.location.pathname);
        console.log(window.location.pathname);
        console.log("Locale detected: " + this.getFirstBrowserLanguage());
        return(
            <LocaleContext.Provider value={{...this.state, setEnglish: this.setEnglish, setSpanish: this.setSpanish}}>
                {this.props.children}
            </LocaleContext.Provider>
        );
    }
}

export default LocaleContextProvider;