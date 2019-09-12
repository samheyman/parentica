import React from 'react';
import Container from '@material-ui/core/Container';

export default function Footer() {
    return(
        <React.Fragment>
            <Container>
                <div className="footer">
                    <div className="copyright">
                        &copy; 2019, <span className="brand">Parentica</span>
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
                        {/* <div className="instagram">
                            <img src="../images/logos/social/instagram.jpeg" alt="instagram"/>
                        </div> */}
                    </div>
                </div>
            </Container>
        </React.Fragment>
    );
}