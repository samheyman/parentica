import React from 'react';
import { Link } from 'react-router-dom';

const ClassCard = (props) => {
    const divStyle = {
        backgroundImage: 'url(' + props.classEntry.image + ')',
    };
    return(
        <div className="col s12 m4 l6" key={props.classEntry.id}>
            <Link to={`classes/${props.classEntry.id}`}>  
                <div className="card">
                    <div className="card-image" style={divStyle} >
                    </div>
                    <div className="card-content">
                        <span className="card-title">{props.classEntry.className}</span>
                        <span className="card-subtitle">{props.classEntry.companyName}</span>
                        <div className="card-footer">
                            <div className="datetime">
                                <span>
                                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(props.classEntry.date)))}
                                {/* {classEntry.date} */}
                                </span>
                            </div>
                            <div className="price">
                                <span>{props.classEntry.price}€</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ClassCard;