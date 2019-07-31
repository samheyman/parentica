import React, { Component } from 'react';

class Header extends Component {
    render() {
        return(
            <header>
                <div className="container">
                    <nav>
                        <div className="nav-wrapper white">
                            <a href="/" className="brand-logo">
                                PARENTSKILL
                            </a>
                            <a href="#" data-target="mobile-sidenav" className="sidenav-trigger">
                                <i className="material-icons">menu</i>
                            </a>
                            <ul className="right hide-on-med-and-down">
                                <li><a href="calendar.html">Calendar</a></li>
                                <li><a href="classNamees.html">Explore</a></li>                            
                                <li><a href="mobile.html">Partners</a></li>
                                <li><a href="collapsible.html">Sign in</a></li>
                                <li><a className="btn-small" href="collapsible.html">Sign up</a></li>
                            </ul>
                            <ul className="right hide-on-large-only">
                                <li><a href="collapsible.html">Sign up</a></li>
                            </ul>
                        </div>
                    </nav>
                    <ul className="sidenav" id="mobile-sidenav">
                        <li><a href="/">Home</a></li>
                        <li><a href="calendar.html">Calendar</a></li>
                        <li><a href="classNamees.html">Explore</a></li>
                        <li><a href="mobile.html">Partners</a></li>
                        <li><a href="collapsible.html">Sign up</a></li>
                    </ul>
            </div>
        </header>
        );
    }
}

export default Header;