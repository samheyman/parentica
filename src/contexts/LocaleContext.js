import React, {createContext, Component} from 'react';

export const LocaleContext = createContext();

class LocaleContextProvider extends Component {
    state = {
        locale: (window.location.pathname==="/es") ? 'es-SP' : 'en-GB',
    }

    setEnglish = () => {
        this.setState({ locale: 'en-GB' });
    }
    
    setSpanish = () => {
        this.setState({ locale: 'es-SP' });
    }

    render() {
        console.log(window.location.pathname);
        console.log(this.state.locale);

        return(
            <LocaleContext.Provider value={{...this.state, setEnglish: this.setEnglish, setSpanish: this.setSpanish}}>
                {this.props.children}
            </LocaleContext.Provider>
        );
    }
}

export default LocaleContextProvider;