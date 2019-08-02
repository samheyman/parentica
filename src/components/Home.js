import React from 'react';
import { Link } from 'react-router-dom';
import DesktopHeader from './Header/DesktopHeader';
import MobileHeader from './Header/MobileHeader';
import DesktopNavigation from './DesktopNavigation';


function RenderClassCard({classEntry}) {
    const divStyle = {
        backgroundImage: 'url(' + classEntry.image + ')',
    };
    return(
        <div className="col s12 m4 l3" key={classEntry.id}>
            <Link to={`classes/${classEntry.id}`}>  
                <div className="card">
                    <div className="card-image" style={divStyle} >
                    </div>
                    <div className="card-content">
                        <span className="card-title">{classEntry.className}</span>
                        <span className="card-subtitle">{classEntry.companyName}</span>
                        <div className="card-footer">
                            <div className="datetime">
                                <span>
                                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(classEntry.date)))}
                                {/* {classEntry.date} */}
                                </span>
                            </div>
                            <div className="price">
                                <span>{classEntry.price}€</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );

}

function RenderProviderCard({provider, onClick}) {
    const divStyle = {
        backgroundImage: 'url(' + provider.logo + ')',
    };
    return(
        <div className="col s12 m4 l3" key={provider.id}>
            <Link to={`classes/${provider.id}`}>  
                <div className="card">
                    <div className="card-image" style={divStyle} >
                    </div>
                    <div className="card-content">
                        <span className="card-title">{provider.name}</span>
                    </div>
                </div>
            </Link>
        </div>
    );

}

function Home(props) {
    return(
        <React.Fragment>
            <DesktopHeader />
            <MobileHeader />
            <div className="row">
                <div className="container">
                    <DesktopNavigation />
                    <div className="col s12 m12 l9">
                        <div className="row">
                            <div className="col s12 ">
                                <h2>Featured class</h2>  
                                <RenderClassCard classEntry={props.featuredClass} />
                            </div>
                            <div className="col s12 ">
                                <h2>Classes near you</h2>  
                                <RenderClassCard classEntry={props.featuredClass} />
                            </div>
                            <div className="col s12 ">
                                <h2>Providers</h2>  
                                <RenderProviderCard provider={props.providers} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Home; 