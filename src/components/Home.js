import React from 'react';

function RenderCard({classEntry}) {
    const divStyle = {
        backgroundImage: 'url(' + classEntry.image + ')',
    };
    return(
        <div className="col s12 m4 l3" key={classEntry.id}>
                    <div className="card" onClick={() => this.props.onClick(classEntry.id)}>
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
                </div>
    );

}

function Home(props) {
    return(
        <div className="row">
            <div className="col s12">
                <h2>Featured class</h2>
            </div>
            <div className="row">
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-12 col-md m-1">
                            <RenderCard classEntry={props.featuredClass} />
                        </div>
                        {/* <div className="col-12 col-md m-1">
                            <RenderCard item={props.promotion} />
                        </div>
                        <div className="col-12 col-md m-1">
                            <RenderCard item={props.leader} />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home; 