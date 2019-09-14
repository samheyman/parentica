import React, { Component } from 'react';
import Explore from './Explore';
import OnlineClasses from '../components/OnlineClasses';
import ClassDetails from '../pages/ClassDetails';
import Home from './Home';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Locations from './Locations';
import About from './About';
import Contact from './Contact';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer';

const mapStateToProps = (state) => {
    return(
        {
            classes: state.classes,
            providers: state.providers,
            resources: state.resources,
            tab: state.tab
        }
    );
};

class Main extends Component {
    
    render() {
        const HomePage = () => {
            return(
                <Home 
                    onlineClasses={this.props.resources.filter((theClass) => theClass.type === 'online')}
                    classEntries={this.props.classes}
                    madridProviders={this.props.providers.filter((provider) => !provider.online)}
                    onlineProviders={this.props.providers.filter((provider) => provider.online)}
                />
            );
        }

        const OnlineClassesPage = () => {
            return(
                <OnlineClasses
                    onlineClasses={this.props.resources.filter((theClass) => theClass.type === 'online')}
                    onlineProviders={this.props.providers.filter((provider) => provider.online)}
                />
            );
        }

        const ClassWithId = ({match}) => {
            return(
                    <ClassDetails
                        selectedClass={this.props.classes.filter((theClass) => theClass.id === parseInt(match.params.classId,10))[0]}
                        // TODO only send the class names, not all the information
                        otherClasses={this.props.classes}
                    />
            );
        }
        return(
            <React.Fragment>
                <Navbar/>
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/explore' render={() => {
                        if(this.props.location.topic == null || this.props.location.topic === "all") {
                            return(
                                <Explore
                                    classes={this.props.classes} 
                                    tabSelected={0}
                                    topic="all"
                                />
                            );
                        } else {
                            return(
                                <Explore
                                    classes={this.props.classes.filter(item => item.tags.includes(`${this.props.location.topic}`))} 
                                    tabSelected={0}
                                    topic={this.props.location.topic}
                                />
                            );
                        }
                    }} />
                    <Route path='/explore/online' render={() => {
                        if(this.props.location.topic == null || this.props.location.topic === "all"){
                            return(
                                <Explore
                                    classes={this.props.classes} 
                                    tabSelected={1}
                                    topic="all"
                                />
                            );
                        } else {
                            return(
                                <Explore
                                    classes={this.props.classes} 
                                    tabSelected={1}
                                    topic={this.props.location.topic}
                                />
                            );
                        }
                    }} />
                    <Route path='/explore/madrid' render={() => {
                        if(this.props.location.topic == null || this.props.location.topic === "all") {
                            return(
                                <Explore
                                    classes={this.props.classes} 
                                    tabSelected={0}
                                    topic="all"
                                />
                            );
                        } else {
                            return(
                                <Explore
                                    classes={this.props.classes} 
                                    tabSelected={0}
                                    topic={this.props.location.topic}
                                />
                            );
                        }
                    }} />
                    {/* issue here is that a new component is rendered every time, rather than update existing one */}
                    {/* https://tylermcginnis.com/react-router-pass-props-to-components/ */}
                    <Route path='/classes/:classId' component={ClassWithId} />
                    <Route path='/online-classes' component={OnlineClassesPage} />
                    <Route path='/locations' component={Locations} />
                    <Route path='/about' component={About} />
                    <Route path='/contact' component={Contact} />
                    <Redirect to="/home" />
                </Switch>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));