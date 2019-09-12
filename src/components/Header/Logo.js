import React from 'react';

const Logo = () => {
    return(
        <div className="logo">
            <img src="../images/brand/logo.png" alt="Parentica logo" />
            <div>
                <div className="brand-name">Parentica</div>
                {/* <div className="brand-sub">ica</div> */}
            </div>
        </div>
    );
}

export default Logo;