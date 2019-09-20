import React from 'react';
import Container from '@material-ui/core/Container';

function ShowLanguage({language}) {
    let selectedLanguage = 'english';
    switch(language) {
        case 'en-GB':
            selectedLanguage = 'english';
            break;
        case 'es-SP':
            selectedLanguage = 'spanish';
            break;
        default:
            break;
    }
    return(
        <div>
            <img className="locale-flag" 
                 src={`/images/flags/${selectedLanguage}.png`} 
                 alt={`language set to ${selectedLanguage} flag`} />
        </div>
    );
}

export default function Footer(props) {
    return(
        <React.Fragment>
            <Container>
                <div className="footer">
                    <div className="copyright">
                        &copy; 2019, <span className="brand">Parentica</span>
                        {(props.locale === 'es-SP')?
                            <ShowLanguage language={props.locale} />
                            :
                            null
                        }
                    </div>
                    <div className="social-links">
                        <div className="instagram">
                            <a href="https://www.linkedin.com/company/parentica/about" target="_blank" rel="noopener noreferrer">
                                <img src="../images/logos/social/linkedin.png" alt="linkedin"/>
                            </a>
                        </div>
                        <div className="facebook">
                            <a href="https://www.facebook.com/Parentica-107756380598610" target="_blank" rel="noopener noreferrer">
                                <img src="../images/logos/social/facebook.png" alt="facebook"/>
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </React.Fragment>
    );
}