import React from 'react';
import { Link } from 'react-router-dom';
import DesktopHeader from './Header/DesktopHeader';
import MobileHeader from './Header/MobileHeader';
import DesktopNavigation from './DesktopNavigation';
import ClassCard from './ClassCard';
import OnlineClassCard from './OnlineClassCard';
import { NavLink } from 'react-router-dom';

function RenderClassCard({classEntry}) {
    return(
        <ClassCard classEntry={classEntry} />
    );
}

function RenderOnlineClassCards({classEntries}) {
    return classEntries.map((classEntry) => {
        return(
            <React.Fragment>
                <OnlineClassCard classEntry={classEntry} />
            </React.Fragment>  
        );
    });
}

function RenderProviderCard({provider}) {
    const divStyle = {
        backgroundImage: 'url(' + provider.logo + ')',
    };
    return(
        <div className="col s12 m4 l3" key={provider.id}>
            <Link to={`classes/${provider.id}`}>  
                <div className="card">
                    <div className="card-image" style={divStyle} >
                    </div>
                    <div className="card-content">
                        <span className="card-title">{provider.name}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

function RenderSearchForm() {
    return(
        <div className="col s12">
            <div className="hide-on-med-and-down">
                <h2>Helping you become a great parent, one class at a time.</h2>
            </div>
            <form action="#" className="form">
                <div className="row">
                    <div className="col s12">
                        <label for="where">WHERE</label>
                        <input className="" placeholder="Madrid" id="where" type="text"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m6">
                        <label>CATEGORY</label>
                        <select className="">
                        <option value="" disabled="" selected="">All</option>
                        <option value="1">Parenting</option>
                        <option value="2">Health</option>
                        <option value="3">Chid birth</option>
                        </select>
                    </div>
                </div>
                    
                <div className="row">
                    <div className="col s12">
                        <div>
                            <label for="last_name">FORMAT</label>
                        </div>
                        <div>
                            <div className="col s6 m4">
                                <label>
                                    <input className="" type="checkbox" checked="checked" />
                                    <span>Group</span>
                                </label>
                            </div>
                            <div className="col s6 m4">
                                <label>
                                    <input type="checkbox" className="" id="filled-in-box" checked="checked" />
                                    <span>Online</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <button className="btn search-button">
                            <NavLink className="sidenav-close"  to="/classes">
                            SEARCH
                            </NavLink>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function Home(props) {
    return(
        <React.Fragment>
            <DesktopHeader />
            <MobileHeader />
            <div className="row">
                <div className="container">
                    {/* <DesktopNavigation /> */}
                    <div className="col s12 m12 l12 main-content ">
                        <div className="row hide-on-large-only">
                            <div className="col s12 m12">
                            <h2>Helping you become a great parent, one class at a time.</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 m12 l12">
                                <RenderSearchForm />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 m12 l12">
                                <h2>Online classes</h2>
                                {/* <p>{props.onlineClasses[1].className}</p>   */}
                                <RenderOnlineClassCards classEntries={props.onlineClasses} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 m12 l12">
                                <h2>Classes in Madrid</h2>  
                                <RenderClassCard classEntry={props.nearbyClass} />
                                {/* Link to all classes */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 m12 l12 partners">
                                <h2>Partners</h2> 
                                <img src="images/logos/bm_logo2.png"/>
                                <img src="images/logos/rm_logo.jpg"/> 
                                <img src="images/logos/gf_logo.png"/>

                                {/* <RenderProviderCard provider={props.providers} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Home; 