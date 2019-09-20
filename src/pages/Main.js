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
import Error from '../pages/Error';

const mapStateToProps = (state) => {
    return(
        {
            classes: state.classes,
            providers: state.providers,
            topics: state.topics,
            tab: state.tab
        }
    );
};

function userRedirect(nextState, replace) {
    var defaultLanguage = 'en';
    var redirectPath = defaultLanguage + nextState.location.pathname
    replace({
      pathname: redirectPath,
    })
  };
  

class Main extends Component {
    
    render() {
        const HomePage = () => {
            return(
                <Home 
                    classEntries={this.props.classes}
                    topics={this.props.topics}
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

        const ClassWithName = ({match}) => {
            let selectedClass = this.props.classes.filter((theClass) => theClass.nameId === match.params.classNameId)[0];
            if (selectedClass == null) {
                return(<Redirect to='/error' />);
            } else {
                return(
                    <ClassDetails
                        selectedClass={this.props.classes.filter((theClass) => theClass.nameId === match.params.classNameId)[0]}
                        // TODO only send the class names, not all the information
                        otherClasses={this.props.classes}
                    />
                );
            } 
        }

        const NotFound = () => {
            return(
                <Error />
            );
        }

        return(
            <React.Fragment>
                <Navbar/>
                <Switch>
                    <Route exact path='/' component={HomePage} />
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
                    {/* <Route path='/classes/:classId' component={ClassWithId} /> */}
                    <Route path='/classes/:classNameId' component={ClassWithName} />
                    <Route path='/online-classes' component={OnlineClassesPage} />
                    <Route path='/locations' component={Locations} />
                    <Route path='/about' component={About} />
                    <Route path='/contact' component={Contact} />
                    <Route component={NotFound}  />
                </Switch>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));