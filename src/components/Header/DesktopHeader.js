import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

class Header extends Component {
    render() {
        return(
            <header className="hide-on-med-and-down">
            <div className="container">
                <nav>
                    <div className="nav-wrapper white">
                        <NavLink to="/" className="brand-logo">
                            <Logo />
                        </NavLink>
                        <ul className="right hide-on-med-and-down">
                            {/* <li><a href="calendar.html">Calendar</a></li> */}
                            <li><NavLink to="/classes">Classes</NavLink></li>                            
                            <li><NavLink to="mobile.html">Providers</NavLink></li>
                            <li><NavLink to="collapsible.html">Sign in</NavLink></li>
                            <li><NavLink className="btn-small" to="collapsible.html">Sign up</NavLink></li>
                        </ul>
                        <ul className="right hide-on-large-only">
                            <li><NavLink to="collapsible.html">Sign up</NavLink></li>
                        </ul>
                    </div>
                </nav>
        </div>
        </header>
        );
    }
}

export default Header;