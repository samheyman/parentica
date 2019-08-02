import React, { Component } from 'react';
import Classes from './Classes';
import ClassDetails from './ClassDetails';
import Home from './Home';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
 
const mapStateToProps = (state) => {
    return(
        {
            classes: state.classes,
            providers: state.providers
        }
    );
};

class Main extends Component {

    constructor(props) {
        super(props);
    }

    onClassSelect(classId) {
        this.setState({ classSelected: classId});
    }
    
    render() {
        const HomePage = () => {
            return(
                <Home 
                    featuredClass={this.props.classes.filter((theClass) => theClass.featured)[0]}
                    providers={this.props.providers.filter((prov) => prov.featured)[0]}
                />
            );
        }

        const ClassWithId = ({match}) => {
            // alert(match);
            return(
                <ClassDetails
                    selectedClass={this.props.classes.filter((theClass) => theClass.id === parseInt(match.params.classId,10))[0]}
                />
            );
        }

        return(
            <Switch>
                <Route path='/home' component={HomePage} />
                <Route exact path='/classes' component={() => <Classes classes={this.props.classes} />} />
                <Route path='/classes/:classId' component={ClassWithId} />
                <Redirect to="/home" />
            </Switch>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));