import React from 'react';
import { Link } from 'react-router-dom';

const OnlineClassCard = (props) => {
    const divStyle = {
        backgroundImage: 'url(images/' + props.classEntry.image + ')',
    };
    return(
        <div className="col s12 m6 l6 xl4" key={props.classEntry.id}>
            <Link to={`classes/${props.classEntry.id}`}>  
                <div className="card">
                    <div className="card-image" style={divStyle} >
                    </div>
                    <div className="card-content">
                        <div className="card-header">
                            <span className="card-title">{props.classEntry.className}</span>
                            <span className="card-subtitle">{props.classEntry.companyName}</span>
                            {/* <span className="card-text">{props.classEntry.address}</span> */}
                        </div>
                        <div className="card-footer">
                            <div className="left-div">
                                
                            </div>
                            {/* <div className="center-div">
                                <i className="material-icons">access_time</i>
                                <br />
                                <span>{props.classEntry.duration}</span>
                            </div> */}
                            <div className="left-div">
                                <span>{props.classEntry.price}</span>
                            </div>
                        </div>
                        {/* <div className="card-action"></div> */}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default OnlineClassCard;