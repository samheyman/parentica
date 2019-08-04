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
            backgroundImage: 'url(../images/' + this.props.selectedClass.image + ')',
        };

        return(
            <React.Fragment>
                <MobileBackHeader link="/classes" />  
                <DesktopHeader/>
                <div className="row">
                    <div className="container">
                        <DesktopNavigation />
                        <div className="class-image-mobile hide-on-large-only" style={divStyle}></div>
                        <div className="col s12 m12 l9 main-content">
                            <div className="class-details">
                                <div className="class-image hide-on-med-and-down" style={divStyle}>
                                </div>
                                <div className="header">
                                    <div className="header-top">
                                        <div className="company">
                                            <img className="logo" src={`../images/logos/${this.props.selectedClass.companyLogo}`}></img>
                                            <span className="company-name">
                                             {this.props.selectedClass.companyName}
                                            </span>
                                        </div>
                                        <div className="price">
                                            <span>{this.props.selectedClass.price}€</span>
                                        </div>
                                    </div>
                                    <div className="header-bottom">
                                        <span className="title">{this.props.selectedClass.className}</span>
                                    </div>
                                </div>
                                <div className="card-tabs">
                                    <p className="description">{this.props.selectedClass.description}</p>
                                </div>
                                <div className="actions">
                                    <a className="btn" 
                                    href={`${this.props.selectedClass.url}`} 
                                    rel="nofollow" 
                                    target="_blank">
                                    Select
                                    </a>
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