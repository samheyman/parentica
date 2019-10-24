import React from 'react';
import Spinner from 'react-spinner-material';

const SmallLoader = () => {
    return(
        <div className="loading-spinner">
            <Spinner spinnerWidth={4} visible={true} />
        </div>
    );
}

export default SmallLoader;