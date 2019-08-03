import React from 'react';
import { Link } from 'react-router-dom';
import DesktopHeader from './Header/DesktopHeader';
import DesktopNavigation from './DesktopNavigation';
import MobileHeader from './Header/MobileHeader';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import ClassCard from './ClassCard';

const Classes = (props) => {

    const classes = props.classes.map((classEntry) => {
        return (    
            <ClassCard classEntry={classEntry} />            
        );
    });

    return(
        <React.Fragment>
            <DesktopHeader />
            <MobileHeader />
            <div className="row">
                <div className="container">
                    <DesktopNavigation />
                    <div className="col s12 m12 l9 main-content">
                        <div className="row">
                            <div className="col s12">
                                <h2>All classes in Madrid</h2>
                                {classes}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default withRouter(Classes);