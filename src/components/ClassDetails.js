import React from 'react';
import DesktopHeader from './Header/DesktopHeader';
import DesktopNavigation from './DesktopNavigation';

const ClassDetails = (props) => {
    return(
        <React.Fragment>
            <a href="/classes" className="hide-on-large-only" >
                <i className="material-icons">arrow_back</i>
            </a>
            <DesktopHeader/>
            <div className="row">
                <div className="container">
                    <DesktopNavigation />
                    <div className="col s12 m12 l9">
                        <div>You selected {props.selectedClass.className}</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ClassDetails;