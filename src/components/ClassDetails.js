import React, { Component} from 'react';

class ClassDetails extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        if(this.props.selectedClass!=null) {
            return(
                <div>You selected {this.props.selectedClass.className}</div>
            );
        } else {
            return(null);   
        }
    }
}

export default ClassDetails;