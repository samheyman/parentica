import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Container from '@material-ui/core/Container';

const Profile = () => {
    const { currentUser } = useContext(AuthContext);

    return(
        <Container className="content">
            <h2>Profile</h2>
            <p>Hello {currentUser.email}</p>
        </Container>
    );
}

export default Profile;