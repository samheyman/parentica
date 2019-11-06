import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Container from '@material-ui/core/Container';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
    const auth = useAuth();
    
    return(
        <Container className="content">
            <h2>Profile</h2>
            <img 
                style={{display:'inline', height:'100px', borderRadius:'50%'}} 
                src="../../images/avatar.png" 
                alt="Profile image" />
            <p>Hello</p> 
            <span>{auth.user.email}</span>
        </Container>
    );
}

export default Profile;