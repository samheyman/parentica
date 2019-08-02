import React, { Component } from 'react';
import DesktopHeader from './Header/DesktopHeader';
import DesktopNavigation from './DesktopNavigation';
import MobileBackHeader from './Header/MobileBackHeader';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

class ClassDetails extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const divStyle = {
            backgroundImage: 'url(../' + this.props.selectedClass.image + ')',
        };

        return(
            <React.Fragment>
                <MobileBackHeader link="/classes" />
                
                <DesktopHeader/>
                <div className="row">
                    <div className="container">
                        <div className="class-image-mobile hide-on-large-only" style={divStyle}>
                        </div>
                        <DesktopNavigation />
                        <div className="col s12 m9 l9">
                            <div className="class-image hide-on-med-and-down" style={divStyle}>
                            </div>
                            <div className="class-details">
                                <div>
                                    <span className="card-title">{this.props.selectedClass.className}</span>
                                    <span className="card-subtitle">{this.props.selectedClass.companyName}</span>
                                </div>
                                <div className="card-footer">
                                    <div className="datetime">
                                        <span>
                                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(this.props.selectedClass.date)))}
                                        {/* {classEntry.date} */}
                                        </span>
                                    </div>
                                    <div className="price">
                                        <span>{this.props.selectedClass.price}€</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(ClassDetails);