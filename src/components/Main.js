import React, { Component } from 'react';
import Header from './Header';
import Classes from './Classes';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedClass: null
        }
    }
    
    render() {
        return(
            <div>
                <Header />
                <div className="container body-container">
                    <Classes classes={this.props.classes} />
                </div>
            </div>
        );
    }
}

export default Main;