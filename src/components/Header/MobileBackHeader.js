import React from 'react';
import { NavLink } from 'react-router-dom';

const MobileBackHeader = (props) => {
    return(
        <header className="hide-on-large-only mobile-back-header">
            <div className="container">
                <nav>
                    <div className="nav-wrapper">
                        <NavLink to={props.link}>
                            <i className="material-icons">arrow_back</i>
                        </NavLink>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default MobileBackHeader;