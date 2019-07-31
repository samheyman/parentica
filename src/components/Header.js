import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    render() {
        return(
            <header>
                <div className="container">
                    <nav>
                        <div className="nav-wrapper white">
                            <NavLink to="/" className="brand-logo">
                                PARENTSKILL
                            </NavLink>
                            <a href="#" data-target="mobile-sidenav" className="sidenav-trigger">
                                <i className="material-icons">menu</i>
                            </a>
                            <ul className="right hide-on-med-and-down">
                                {/* <li><a href="calendar.html">Calendar</a></li> */}
                                <li><NavLink to="/classes">Classes</NavLink></li>                            
                                <li><NavLink to="mobile.html">Partners</NavLink></li>
                                <li><NavLink to="collapsible.html">Sign in</NavLink></li>
                                <li><NavLink className="btn-small" to="collapsible.html">Sign up</NavLink></li>
                            </ul>
                            <ul className="right hide-on-large-only">
                                <li><NavLink to="collapsible.html">Sign up</NavLink></li>
                            </ul>
                        </div>
                    </nav>
                    <ul className="sidenav" id="mobile-sidenav">
                        <li><NavLink class="sidenav-close" to="/">Home</NavLink></li>
                        {/* <li><a href="calendar.html">Calendar</a></li> */}
                        <li><NavLink class="sidenav-close" to="/classes">Classes</NavLink></li>
                        <li><NavLink class="sidenav-close" to="mobile.html">Partners</NavLink></li>
                        <li><NavLink class="sidenav-close" to="collapsible.html">Sign up</NavLink></li>
                    </ul>
            </div>
        </header>
        );
    }
}

export default Header;