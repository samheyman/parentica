import React from 'react';
import Spinner from 'react-spinner-material';

const Loader = () => {
    return(
        <div className="loading-spinner">
            <Spinner size={80} spinnerColor={"#333"} spinnerWidth={4} visible={true} />
        </div>
    );
}

export default Loader;