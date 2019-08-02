import React from 'react';
import DesktopHeader from './Header/DesktopHeader';
import DesktopNavigation from './DesktopNavigation';
import MobileBackHeader from './Header/MobileBackHeader';

const ClassDetails = (props) => {
    const divStyle = {
        backgroundImage: 'url(../' + props.selectedClass.image + ')',
    };

    return(
        <React.Fragment>
            <MobileBackHeader link="/classes" />
            
            <DesktopHeader/>
            <div className="row">
                <div className="container">
                    <DesktopNavigation />
                    <div className="col s12 m9 l9">
                        <div className="class-image" style={divStyle}>
                        </div>
                        <div className="class-details">
                            <div>
                                <span className="card-title">{props.selectedClass.className}</span>
                                <span className="card-subtitle">{props.selectedClass.companyName}</span>
                            </div>
                            <div className="card-footer">
                                <div className="datetime">
                                    <span>
                                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(props.selectedClass.date)))}
                                    {/* {classEntry.date} */}
                                    </span>
                                </div>
                                <div className="price">
                                    <span>{props.selectedClass.price}€</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ClassDetails;