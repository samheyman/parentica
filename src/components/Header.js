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
                                PARENTHUB
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
                        <li><a class="sidenav-close" href="#!"><i className="material-icons">close</i></a></li>
                        {/* <li><div class="divider"></div></li> */}
                        <li><NavLink className="sidenav-close" to="/"><i className="material-icons nav-icon">home</i>Home</NavLink></li>
                        <li><NavLink className="sidenav-close" to="/classes"><i className="material-icons nav-icon">search</i>Classes</NavLink></li>
                        <li><NavLink className="sidenav-close" to="mobile.html"><i className="material-icons nav-icon">business</i>Partners</NavLink></li>
                        <li><NavLink className="sidenav-close" to="collapsible.html"><i className="material-icons nav-icon">account_circle</i>Sign up</NavLink></li>
                    </ul>
            </div>
        </header>
        );
    }
}

export default Header;