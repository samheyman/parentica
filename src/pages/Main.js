import React, { Component, useContext } from 'react';
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
import ClassForm from './ClassForm';
import Providers from './Providers';
import { ListingsContext } from '../contexts/ListingsContext';

const mapStateToProps = (state) => {
    return(
        {
            providers: state.providers,
            topics: state.topics,
            tab: state.tab,
        }
    );
};

class Main extends Component {
    static contextType = ListingsContext;
    render() {  
        const {listings} = this.context;     
        const HomePage = () => {
            // let count = 0;
            // let today = new Date();
            return(
                <Home 
                    topics={this.props.topics}
                    // onlineClasses={listings.filter((item) => 
                    //     (item.type==='online' || item.type==='webinar' ) && 
                    //     (!item.date || new Date(item.date) > today) &&
                    //     count++ < 4)}
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
                        listings.filter(
                            (item) => (item.city==='Madrid' || item.city==='madrid') && 
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
            let selectedClass = listings.filter((item) => item.nameId === match.params.classNameId)[0];
            return(
                selectedClass ? 
                    (
                        <ClassDetails
                            selectedClass={selectedClass}
                            // TODO only send the class names, not all the information
                            otherClasses={listings}
                        />
                    )
                    :
                    (<Redirect to='/error' />)
            );
        }

        const { match } = this.props;

        return(
            <React.Fragment>
                <Navbar/>
                <Switch>
                    <Route exact path={`${match.url}/`} component={HomePage} />
                    <Route path={`${match.url}/home`} render={()=><Redirect to={`${match.url}/`} /> } />
                    <Route exact path={`${match.url}/madrid`} component={CityPage} />
                    <Route exact path={`${match.url}/other`} component={About} />

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
                        let language = this.props.location.language;
                        let onlineListings = listings.filter((item)=> item.type==='online' || item.type==='webinar');
                        console.log(onlineListings);
                        console.log(topic);
                        if(type === 'online classes' || type == null || !type){
                            if(language === 'english' || language === 'spanish') {
                                let onlineListingsLanguage = onlineListings.filter((listing) => listing.language===language);
                                return(
                                    <Explore
                                        format="online"
                                        listings={onlineListingsLanguage}
                                        topic="all"
                                        tabSelected={0}
                                        classLanguage={language}
                                    />
                                );
                            } else if (topic != null && topic !== "all"){
                                console.log('here');
                                return(
                                    <Explore
                                        format="online"
                                        listings={onlineListings.filter((listing) => listing.tags.includes(`${topic}`))}
                                        topic={topic}
                                        tabSelected={0}
                                    />
                                );
                            } else {
                                return(
                                    <Explore
                                        format="online"
                                        listings={onlineListings}
                                        topic="all"
                                        tabSelected={0}
                                    />
                                );
                            }
    
                        } else {
                            return(
                                <Explore
                                    format="online"
                                    listings={onlineListings}
                                    topic="all"
                                    tabSelected={1}
                                />
                            );
                        }
                    }} />
                    <Route path={`${match.url}/madrid/explore`} render={() => {
                        console.log("Searching classes in Madrid for  " + this.props.location.topic);
                        let topic = this.props.location.topic;
                        let type = this.props.location.type;
                        let language = this.props.location.language;
                        // let cityListings = this.props.classes.filter((listing) => listing.city==='Madrid' && new Date(listing.date) > new Date());
                        if(language === 'english' || language === 'spanish') {
                            let cityListingsLanguage = this.props.classes.filter((listing) => listing.city==='Madrid' && new Date(listing.date) > new Date() && listing.language===language);
                            return(
                                <Explore
                                    format="madrid"
                                    topic="all"
                                    tabSelected={0}
                                    classLanguage={language}
                                />
                            );
                        }
                        if(type === 'seminars') {
                            return(
                                <Explore
                                    format="madrid"
                                    topic="all"
                                    tabSelected={1}
                                />
                            );
                        }
                        if(type === 'meetups') {
                            return(
                                <Explore
                                    format="madrid"
                                    topic="all"
                                    tabSelected={2}
                                />
                            );
                        }
                        if(topic == null || topic === "all") {
                            return(
                                <Explore
                                    format="madrid"
                                    topic="all"
                                    tabSelected={0}
                                />
                            );
                        } else {
                            return(
                                <Explore
                                    format="madrid"
                                    topic={topic}
                                    tabSelected={0}
                                />
                            );
                        }
                    }} />
                    {/* issue here is that a new component is rendered every time, rather than update existing one */}
                    {/* https://tylermcginnis.com/react-router-pass-props-to-components/ */}
                    {/* <Route path='/classes/:classId' component={ClassWithId} /> */}
                    <Route path={`${match.url}/locations`} component={Locations}/>
                    <Route path={`${match.url}/about`} component={About}/>
                    <Route exact path={`${match.url}/providers`} render={
                            (props) => <Providers {...props} classes={listings}
                        />}
                    />
                    <Route path={`${match.url}/providers/new`} render={
                            (props) => <ClassForm {...props}
                        />}
                    />
                    <Route path={`${match.url}/contact`} render={
                            (props) => <Contact {...props}
                        />}
                    />
                    <Route path={`${match.url}/error`} component={PageNotFound}/>
                    
                    <Route path={`${match.url}/:classNameId`} component={ClassWithName} />
                    
                    <Route component={PageNotFound}  />
                </Switch>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));