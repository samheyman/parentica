import React from 'react';
import { Link } from 'react-router-dom';
import DesktopHeader from './Header/DesktopHeader';
import DesktopNavigation from './DesktopNavigation';
import MobileHeader from './Header/MobileHeader';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

const Classes = (props) => {

    const classes = props.classes.map((classEntry) => {
        const divStyle = {
            backgroundImage: 'url(' + classEntry.image + ')',
        };

        return (    
            <div key={classEntry.id} className="card z-depth-0">
            <Link to={`classes/${classEntry.id}`}>
                <div className="card-image" style={divStyle}>
                </div>
                <div className="card-content">
                    <div>
                        <span className="card-title">{classEntry.className}</span>
                        <span className="card-subtitle">{classEntry.companyName}</span>
                    </div>
                    <div className="card-footer">
                        <div className="datetime">
                            <span>
                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(classEntry.date)))}
                            {/* {classEntry.date} */}
                            </span>
                        </div>
                        <div className="price">
                            <span>{classEntry.price}€</span>
                        </div>
                    </div>
                </div>
            </Link>
            </div>                     
        );
    });

    return(
        <React.Fragment>
            <DesktopHeader />
            <MobileHeader />
            <div className="row">
                <div className="container">
                    <DesktopNavigation />
                    <div className="col s12 m12 l9 main-content border-debug">
                        <h2>All classes in Madrid</h2>
                        {classes}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default withRouter(Classes);