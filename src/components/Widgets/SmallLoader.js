import React from 'react';
import Spinner from 'react-spinner-material';

const SmallLoader = () => {
    return(
        <div className="loading-spinner" style={{width:'40px'}}>
            <Spinner spinnerWidth={3} visible={true} />
        </div>
    );
}

export default SmallLoader;