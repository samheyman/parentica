import React, { Component } from 'react';
import Header from './Header';
import Classes from './Classes';
import { CLASSES } from '../shared/classes';
import ClassDetails from './ClassDetails';
import Home from './Home';
import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
          classes: CLASSES,
          classSelected: null
        }
    }

    onClassSelect(classId) {
        this.setState({ classSelected: classId});
    }
    
    render() {
        const HomePage = () => {
            return(
                <Home 
                    featuredClass={this.state.classes.filter((theClass) => theClass.featured)[0]}
                />
            );
        }

        return(
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/classes' component={() => <Classes classes={this.state.classes} onClick={(classId) => this.onClassSelect(classId)}/>} />
                    {/* <Route path='/clases/:classId' component={ClassWithId} /> */}
                    <Redirect to="/home" />
                </Switch>
                    {/* <ClassDetails selectedClass={this.state.classes.filter((myClass) => myClass.id === this.state.classSelected)[0] }/> */}
            </div>
        );
    }
}

export default Main;