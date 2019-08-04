import React from 'react';
import { Link } from 'react-router-dom';
import DesktopHeader from './Header/DesktopHeader';
import MobileHeader from './Header/MobileHeader';
import DesktopNavigation from './DesktopNavigation';
import ClassCard from './ClassCard';

function RenderClassCard({classEntry}) {
    return(
        <ClassCard classEntry={classEntry} />
    );
}

function RenderProviderCard({provider}) {
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
                    <div className="col s12 m12 l9 main-content ">
                        <div className="row">
                            <div className="col s12 m12 l12">
                                <h2>Featured class</h2>  
                                <RenderClassCard classEntry={props.featuredClass} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 m12 l12">
                                <h2>Classes near you</h2>  
                                <RenderClassCard classEntry={props.nearbyClass} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 m12 l12 partners">
                                <h2>Partners</h2> 
                                <img src="images/logos/bm_logo2.png"/>
                                <img src="images/logos/rm_logo.jpg"/>
                                <img src="images/logos/gf_logo.png"/>

                                {/* <RenderProviderCard provider={props.providers} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Home; 