function RenderSearchForm() {
    return(
        <div className="col s12">
            <form action="#" className="form">
                {/* <div className="row hide-on-med-and-down">
                    <h2>We help parents find classes they want.</h2>
                </div> */}
                <div className="row">
                    <div className="col s12">
                        <label>Looking for</label>
                        <select className="">
                        <option value="" disabled="" selected="">Classes</option>
                        <option value="1">Parenting</option>
                        <option value="2">Health</option>
                        <option value="3">Chid birth</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <label for="where">In</label>
                        <input className="" tabIndex="0" placeholder="Madrid" id="where" type="text"/>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col s12">
                        <div>
                            <label for="last_name">FORMAT</label>
                        </div>
                        <div>
                            <div className="col s6 m4">
                                <label>
                                    <input className="" type="checkbox" />
                                    <span>Group</span>
                                </label>
                            </div>
                            <div className="col s6 m4">
                                <label>
                                    <input type="checkbox" className="" id="filled-in-box" />
                                    <span>Online</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="row">
                    <div className="col s12">
                        <button className="btn search-button">
                            <NavLink className="sidenav-close"  to="/classes">
                            SEARCH
                            </NavLink>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}