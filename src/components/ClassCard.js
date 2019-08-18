import React from 'react';
import { Link } from 'react-router-dom';

function RenderTags({tags}) {
    const output = tags.map((tag) => {
        return (
            <span className={`tag tag-${tag}`}>{tag}</span>
        );
    });

    return output;
}

const ClassCard = (props) => {
    const divStyle = {
        backgroundImage: 'url(images/' + props.classEntry.image + ')',
    };
    return(
        <div className="col s12 m6 l4 xl4" key={props.classEntry.id}>
            <Link to={`classes/${props.classEntry.id}`}>  
                <div className="card z-depth-1">
                    <div className="card-image" style={divStyle} >
                    </div>
                    <div className="card-content">
                        <div className="card-header">
                            <div className="company">
                                <img className="logo" src={`../images/logos/${props.classEntry.companyLogo}`}></img>
                                <div className="company-details">
                                    <div className="company-name">
                                        {props.classEntry.companyName}
                                    </div>
                                    <div className="company-address truncate">
                                        {props.classEntry.district}
                                    </div>
                                </div>
                            </div>   
                            <span className="card-title truncate">{props.classEntry.className}</span>
                            <div className="class-tags tags">
                                <RenderTags tags={props.classEntry.tags} />

                                {/* <div className="class-date ">
                                    <i className="material-icons date_range">date_range</i>
                                    <span>{new Intl.DateTimeFormat('en-US', { weekday: 'short', day: '2-digit', month: 'short' }).format(new Date(Date.parse(props.classEntry.date)))}</span>
                                </div>
                                <div className="class-time ">
                                    <i className="material-icons access_time">access_time</i>
                                    <span>{props.classEntry.time}</span>
                                </div> */}
                                {/* <div className="class-duration truncate">
                                    <i className="material-icons timelapse">timelapse</i>
                                    <span>{props.classEntry.duration}</span>
                                </div> */}
                            </div>
                                {/* <span className="card-text">
                                    {props.classEntry.time}
                                </span> */}
                            {/* <span className="card-text">{props.classEntry.address}</span> */}
                        </div>
                        <div className="card-footer">
                            <div className="left-div">
                                <div className="class-duration truncate">
                                    <i className="material-icons timelapse">timelapse</i>
                                    <span> {props.classEntry.duration}</span>
                                </div>
                                {/* <span>{props.classEntry.category}</span> */}
                                {/* <img className="language-flag" src={`images/flags/${props.classEntry.language}.png`} alt="Class in English" /> */}
                                {/* <span className="card-text">
                                    {new Intl.DateTimeFormat('en-US', { weekday: 'short', day: '2-digit', month: 'short' }).format(new Date(Date.parse(props.classEntry.date)))}
                                </span>
                                <span className="card-text">
                                    {props.classEntry.time}
                                </span> */}
                                
                                

                            </div>
                            <div className="center-div">
                                    {/* <span>{props.classEntry.duration}</span> */}
                                {/* <span className="class-price">{props.classEntry.price}€</span> */}
                            </div>
                            <div className="right-div">
                                <div className="class-duration">
                                    {/* <div className="duration-icon-div border-debug">
                                        <i className="material-icons duration-icon">iav_timer</i>
                                    </div> */}
                                    <div className="duration">
                                        {/* {props.classEntry.duration} */}
                                        {props.classEntry.price}€

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="card-action"></div> */}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ClassCard;