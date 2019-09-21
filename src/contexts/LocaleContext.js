import React, {createContext, Component} from 'react';

export const LocaleContext = createContext();

class LocaleContextProvider extends Component {
    state = {
        // locale: 'en-GB',
        locale: 'es-SP'
    }

    setEnglish = () => {
        this.setState({ locale: 'en-GB' });
    }
    
    setSpanish = () => {
        this.setState({ locale: 'es-SP' });
    }

    render() {
        return(
            <LocaleContext.Provider value={{...this.state, setEnglish: this.setEnglish, setSpanish: this.setSpanish}}>
                {this.props.children}
            </LocaleContext.Provider>
        );
    }
}

export default LocaleContextProvider;