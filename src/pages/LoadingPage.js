import React from 'react';
import Container from '@material-ui/core/Container';
import SmallLoader from '../components/Widgets/SmallLoader';

const LoadingPage = () => {

    return(
        <Container className="content">
            <div style={{display:'flex', flexDirection: 'column', minHeight:'70vh',justifyContent:'center', maxWidth:'1200px'}}>
                <SmallLoader/>
            </div>
        </Container>
    );
}

export default LoadingPage;