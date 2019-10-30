import React, { useState, useEffect, useContext } from 'react';
import Explore from './Explore';
// import ClassDetails from '../pages/ClassDetails';
import ListingDetails from '../pages/ListingDetails';
import Home from './Home';
import Online from './Online';
import City from './City';
import { Switch, Route, Redirect, withRouter, useRouteMatch, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Locations from './Locations';
import About from './About';
import Contact from './Contact';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer';
import PageNotFound from './PageNotFound';
import NewListing from './NewListing';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Providers from './Providers';
import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';
import { TOPICS } from '../shared/topicsJSON';
import { PROVIDERS } from '../shared/providersJSON';
import { AuthContext } from '../contexts/AuthContext';

export default function Main(props) {
    let listings = useListings();
    const [loading, setLoading] = useState(false);

    function useListings() {
        const [listings, setListings] = useState([]);
        useEffect(() => {
            const unsubscribe = firebase.firestore()
                .collection('listings')
                .where("active", "==", true)
                .orderBy('date', 'asc')
                .onSnapshot((snapshot) => {
                const newListings = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setListings(newListings);
                setLoading(false);
            });
            return () => unsubscribe();
        }, [])
    
        return listings;
    }

    const HomePage = () => {
        let count = 0;
        let onlineClasses = listings.filter(
            (item) => (item.online || item.format==='webinar') && 
                        count++ < 6);
        return(
            <Home 
                topics={TOPICS}
                onlineClasses={onlineClasses}
                onlineProviders={PROVIDERS.filter((provider) => provider.online)}
            />
        );
    }

    const CityPage = ({city}) => {
        let count = 0;
        let today = new Date();
        let nextWeek = new Date();
        let sevenDays = today.getDate() + 7;
        nextWeek.setDate(sevenDays);
        let results = listings.filter(
            (item) => (item.city.toLowerCase() === city) && 
                        new Date(item.date.seconds * 1000) > today && 
                        new Date(item.date.seconds * 1000) < nextWeek  && 
                        count++ < 6);
        console.log(results);
        return(
            <City 
                city={city}
                classesThisWeek={results}
                topics={TOPICS}
                providers={PROVIDERS.filter((provider) => !provider.online && provider.city.toLowerCase() === city)}
            />
        );
    }

        // const OnlinePage = () => {
        //     return(
        //         <City 
        //             locale={this.props.locale}
        //             classEntries={this.props.classes}
        //             topics={this.props.topics}
        //             onlineProviders={this.props.providers.filter((provider) => provider.online)}
        //         />
        //     );
        // }

    const ListingWithName = () => {
        let { listingId } = useParams();
        // console.log("ListingId:");
        // console.log(listingId);
        // listings = useListings();
        let result = listings.filter((item) => item.nameId === match.params.listingId)[0];
        return(
            // result !== null ? 
            // (
            //     <ClassDetails
            //         selectedClass={result}
            //         // TODO only send the class names, not all the information
            //         otherClasses={listings}
            //     />
            // )
            // :
            // (<Redirect to='/error' />)
            <div>{listingId}</div>
        );
    }
    let match = useRouteMatch();

    const PrivateRoute = ({ component: RouteComponent, ...rest}) => {
        const { currentUser } = useContext(AuthContext);
        // console.log("Private route!");
        // console.log(currentUser);
        return(
            <Route 
                {...rest}
                render={routeProps =>
                    !!currentUser ? (
                        <RouteComponent {...routeProps} />
                    ) 
                    :
                    (
                        <Redirect to={`${match.path}/login`} />
                    )
                }
            />
        );
    };

    return(
        <React.Fragment>
            <Navbar/>
            <Switch>
                <Route path={`${match.path}/home`} render={()=><Redirect to={`${props.match.url}/`} /> } />
                <Route path={`${match.path}/madrid/explore`} render={()=><Explore tab={0} city="madrid" />} />
                <Route path={`${match.path}/madrid`} render={()=><CityPage city="madrid" />} />
                <Route path={`${match.path}/oslo`} render={()=><CityPage city="oslo" />} />
                <Route path={`${match.path}/stockholm`} render={()=><CityPage city="stockholm" />} />
                <Route path={`${match.path}/paris/explore`} render={()=><Explore tab={0} city="paris" />} />
                <Route path={`${match.path}/paris`} render={()=><CityPage city="paris" />} />
                <Route path={`${match.path}/london`} render={()=><CityPage city="london" />} />
                <Route path={`${match.path}/online/explore`} render={()=><Online />} />
                <Route path={`${match.path}/listings/:listingId`} component={ListingDetails} />
                <Route path={`${match.path}/about`} component={About}/>
                <PrivateRoute exact path={`${match.path}/providers/new`} component={NewListing}/>
                <PrivateRoute exact path={`${match.path}/providers`} component={Providers} />
                {/* <Route path={`${match.path}/providers`} component={Providers}/> */}
                <Route path={`${match.path}/contact`} render={()=> <Contact/>} />
                <Route path={`${match.path}/signup`} component={Signup}/>
                <Route path={`${match.path}/login`} component={Login}/>
                <Route exact path={`${match.path}/`} component={HomePage} />
                <Route component={PageNotFound}/> */}

                    {/*
                    <Route exact path={`${match.url}/other`} component={About} />

                    <Route exact path={`${match.url}/online`} component={OnlinePage} /> */}

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
                    {/* <Route path={`${match.url}/online/explore`} render={() => {
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
                        console.log("Searching " + type);

                        // let cityListings = this.props.classes.filter((listing) => listing.city==='Madrid' && new Date(listing.date) > new Date());
                        if(language === 'english' || language === 'spanish') {
                            // let cityListingsLanguage = this.props.classes.filter((listing) => listing.city==='Madrid' && new Date(listing.date) > new Date() && listing.language===language);
                            return(
                                <Explore
                                    format="group"
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
                                    format="group"
                                    topic="all"
                                    tabSelected={2}
                                />
                            );
                        }
                        if(topic == null || topic === "all") {
                            return(
                                <Explore
                                    format="group"
                                    topic="all"
                                    tabSelected={0}
                                />
                            );
                        } else {
                            return(
                                <Explore
                                    format="group"
                                    topic={topic}
                                    tabSelected={0}
                                />
                            );
                        }
                    }} /> */}
                    {/* issue here is that a new component is rendered every time, rather than update existing one */}
                    {/* https://tylermcginnis.com/react-router-pass-props-to-components/ */}
                    {/* <Route path={`${match.url}/listings/:listingId`} component={ListingWithName} />
                    */}
                    
                    {/*}
                    
                    {/* <Route path={`${match.url}/:classNameId`} component={ClassWithName} /> */}
                    
                    <Route component={PageNotFound}  />
                </Switch>
                <Footer/>
            </React.Fragment>
        );

}