import React, { Component } from 'react';
import Explore from './Explore';
import ClassDetails from '../pages/ClassDetails';
import Home from './Home';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Locations from './Locations';
import About from './About';
import Contact from './Contact';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer';
import PageNotFound from './PageNotFound';

const mapStateToProps = (state) => {
    return(
        {
            classes: state.classes,
            providers: state.providers,
            topics: state.topics,
            tab: state.tab,
            locale: state.locale,                   
        }
    );
};

class Main extends Component {
    
    render() {
        const HomePage = () => {
            return(
                <Home 
                    locale={this.props.locale}
                    classEntries={this.props.classes}
                    topics={this.props.topics}
                    madridProviders={this.props.providers.filter((provider) => !provider.online)}
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
                        locale={this.props.locale}
                    />
                );
            }
        }
        const { match } = this.props;
        console.log("match url: " + match.url);
        return(
            <React.Fragment>
                <Navbar/>
                <Switch>
                    <Route exact path={`${match.url}/`} component={HomePage} />
                    <Route path={`${match.url}/home`} render={()=><Redirect to={`${match.url}/`} /> } />
                    <Route exact path={`${match.url}/explore`} render={() => {
                        if(this.props.location.topic == null || this.props.location.topic === "all") {
                            return(
                                <Explore
                                    classes={this.props.classes} 
                                    tabSelected={0}
                                    topic="all"
                                    locale={this.props.locale}
                                />
                            );
                        } else {
                            return(
                                <Explore
                                    classes={this.props.classes.filter(item => item.tags.includes(`${this.props.location.topic}`))} 
                                    tabSelected={0}
                                    topic={this.props.location.topic}
                                    locale={this.props.locale}
                                />
                            );
                        }
                    }} />
                    <Route path={`${match.url}/explore/online`} render={() => {
                        if(this.props.location.topic == null || this.props.location.topic === "all"){
                            return(
                                <Explore
                                    classes={this.props.classes} 
                                    tabSelected={1}
                                    topic="all"
                                    locale={this.props.locale}
                                />
                            );
                        } else {
                            return(
                                <Explore
                                    classes={this.props.classes} 
                                    tabSelected={1}
                                    topic={this.props.location.topic}
                                    locale={this.props.locale}
                                />
                            );
                        }
                    }} />
                    <Route path={`${match.url}/explore/madrid`} render={() => {
                        if(this.props.location.topic == null || this.props.location.topic === "all") {
                            return(
                                <Explore
                                    classes={this.props.classes} 
                                    tabSelected={0}
                                    topic="all"
                                    locale={this.props.locale}
                                />
                            );
                        } else {
                            return(
                                <Explore
                                    classes={this.props.classes} 
                                    tabSelected={0}
                                    topic={this.props.location.topic}
                                    locale={this.props.locale}
                                />
                            );
                        }
                    }} />
                    {/* issue here is that a new component is rendered every time, rather than update existing one */}
                    {/* https://tylermcginnis.com/react-router-pass-props-to-components/ */}
                    {/* <Route path='/classes/:classId' component={ClassWithId} /> */}
                    <Route path={`${match.url}/classes/:classNameId`} component={ClassWithName} />
                    <Route path={`${match.url}/locations`} component={Locations}/>
                    <Route path={`${match.url}/about`} component={About}/>
                    <Route path={`${match.url}/contact`} render={
                            (props) => <Contact {...props}
                        />}
                    />
                    <Route component={PageNotFound}  />
                </Switch>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));