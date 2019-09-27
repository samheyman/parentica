import React, { Component } from 'react';
import Explore from './Explore';
import ClassDetails from '../pages/ClassDetails';
import Home from './Home';
import City from './City';
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
            let count = 0;
            let today = new Date();
            return(
                <Home 
                    locale={this.props.locale}
                    classEntries={this.props.classes}
                    topics={this.props.topics}
                    onlineClasses={this.props.classes.filter((item) => 
                        (item.type==='online' || item.type==='webinar' ) && 
                        (!item.date || new Date(item.date) > today) &&
                        count++ < 4)}
                    onlineProviders={this.props.providers.filter((provider) => provider.online)}
                />
            );
        }

        const CityPage = () => {
            let count = 0;
            let today = new Date();
            let nextWeek = new Date();
            let sevenDays = today.getDate() + 7;
            nextWeek.setDate(sevenDays);
            console.log(today);
            console.log(nextWeek);
            return(
                <City 
                    locale={this.props.locale}
                    city='madrid'
                    classesThisWeek={
                        this.props.classes.filter(
                            (item) => item.city==='Madrid' && 
                                      new Date(item.date) > today && 
                                      new Date(item.date) < nextWeek  && 
                                      count++ < 4)}
                    topics={this.props.topics}
                    madridProviders={this.props.providers.filter((provider) => !provider.online)}
                />
            );
        }

        const OnlinePage = () => {
            return(
                <City 
                    locale={this.props.locale}
                    classEntries={this.props.classes}
                    topics={this.props.topics}
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

        return(
            <React.Fragment>
                <Navbar/>
                <Switch>
                    <Route exact path={`${match.url}/`} component={HomePage} />
                    <Route path={`${match.url}/home`} render={()=><Redirect to={`${match.url}/`} /> } />
                    <Route exact path={`${match.url}/madrid`} component={CityPage} />
                    <Route exact path={`${match.url}/online`} component={OnlinePage} />

                    {/* <Route exact path={`${match.url}/explore`} render={() => {
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
                    }} /> */}
                    <Route path={`${match.url}/online/explore`} render={() => {
                        console.log("Searching online classes for  " + this.props.location.topic);
                        console.log("and of type  " + this.props.location.type);

                        let topic = this.props.location.topic;
                        let type = this.props.location.type;
                        let onlineListings = this.props.classes.filter((item)=> item.type==='online' || item.type==='webinar');
                        if(type === 'online classes' || type == null ){
                            return(
                                <Explore
                                    format="online"
                                    listings={onlineListings}
                                    topic="all"
                                    locale={this.props.locale}
                                    tabSelected={0}
                                />
                            );
                        } else {
                            return(
                                <Explore
                                    format="online"
                                    listings={onlineListings}
                                    topic="all"
                                    locale={this.props.locale}
                                    tabSelected={1}
                                />
                            );
                        }
                    }} />
                    <Route path={`${match.url}/madrid/explore`} render={() => {
                        console.log("Searching classes in Madrid for  " + this.props.location.topic);
                        let topic = this.props.location.topic;
                        let type = this.props.location.type;
                        let cityListings = this.props.classes.filter((listing) => listing.city==='Madrid' && new Date(listing.date) > new Date());
                        if(type === 'seminars') {
                            return(
                                <Explore
                                    format="madrid"
                                    listings={cityListings}
                                    topic="all"
                                    locale={this.props.locale}
                                    tabSelected={1}
                                />
                            );
                        }
                        if(type === 'meetups') {
                            return(
                                <Explore
                                    format="madrid"
                                    listings={cityListings}
                                    topic="all"
                                    locale={this.props.locale}
                                    tabSelected={2}
                                />
                            );
                        }
                        if(topic == null || topic === "all") {
                            return(
                                <Explore
                                    format="madrid"
                                    listings={cityListings}
                                    topic="all"
                                    locale={this.props.locale}
                                    tabSelected={0}
                                />
                            );
                        } else {
                            return(
                                <Explore
                                    format="madrid"
                                    listings={cityListings.filter((listing) => listing.tags.includes(`${topic}`))}
                                    topic={topic}
                                    locale={this.props.locale}
                                    tabSelected={0}
                                />
                            );
                        }
                    }} />
                    {/* issue here is that a new component is rendered every time, rather than update existing one */}
                    {/* https://tylermcginnis.com/react-router-pass-props-to-components/ */}
                    {/* <Route path='/classes/:classId' component={ClassWithId} /> */}
                    <Route path={`${match.url}/listings/:classNameId`} component={ClassWithName} />
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