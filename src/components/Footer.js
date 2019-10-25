import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import { LocaleContext } from '../contexts/LocaleContext';
import LanguageSelector from './LanguageSelector';

export default function Footer(props) {
    const { locale } = useContext(LocaleContext);

    return(
        <Container>
            <div className="footer">
                <div className="copyright">
                    &copy; 2019, <span className="brand">Parentica</span>
                    <LanguageSelector/>
                </div>
                <div className="social-links">
                    <div className="instagram">
                        <a href="https://www.linkedin.com/company/parentica/about" target="_blank" rel="noopener noreferrer">
                            <img src="../../images/logos/social/linkedin.jpg" alt="linkedin"/>
                        </a>
                    </div>
                    <div className="facebook">
                        <a href="https://www.facebook.com/Parentica-107756380598610" target="_blank" rel="noopener noreferrer">
                            <img src="../../images/logos/social/facebook.jpg" alt="facebook"/>
                        </a>
                    </div>
                </div>
            </div>
        </Container>
    );
}