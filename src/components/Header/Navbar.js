import React, { useContext } from 'react';
import { Redirect } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from './Logo';
import { NavLink } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import TranslatedText from '../../components/TranslatedText';
import { LocaleContext } from '../../contexts/LocaleContext';
// import { signOut } from '../../contexts/useAuth';

// Auth
import { useAuth } from '../../contexts/AuthContext';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar(props) {
    const { locale } = useContext(LocaleContext);
    const classes = useStyles();
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
    const auth = useAuth();

    const toggleDrawer = (side, open) => event => {
      var element = document.getElementById("nav-icon");
      (element.className==="open") ? element.classList.remove("open") : element.classList.add("open");
              
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [side]: open });
    };

    const drawer = (side, locale) => (
      <div
        className={classes.toolbar}
        role="presentation"
        onClick={toggleDrawer(side, false)}
        onKeyDown={toggleDrawer(side, false)}
      >
      {/* <div className="spacer"></div> */}
      <List className="sidebar-links">
        <NavLink to={`/${locale.split('-')[0]}/home`}>
          <ListItem button key="home">
            <ListItemText 
              primary={<TranslatedText id={`navbar.home.link`} />} 
            />
          </ListItem>
        </NavLink>
        <NavLink to={`/${locale.split('-')[0]}/about`}>
          <ListItem button key="about">
            <ListItemText 
              primary={<TranslatedText id={`navbar.about.link`} />} 
            />
          </ListItem>
        </NavLink>
        <NavLink to={`/${locale.split('-')[0]}/contact`}>
          <ListItem button key="contact">
            <ListItemText               
              primary={<TranslatedText id={`navbar.contact.link`} />} 
            />
          </ListItem>
        </NavLink>
        <div className="spacer"></div>
          { !!auth.user ? 
            <React.Fragment>
              <NavLink to={`/${locale.split('-')[0]}/profile`}>
                <ListItem button key="profile">
                  <ListItemText 
                    primary={<TranslatedText id={`navbar.profile.link`} />} 
                  />
                </ListItem>
              </NavLink>
              <NavLink to={`/${locale.split('-')[0]}/listings`}>
                <ListItem button key="providers">
                  <ListItemText 
                    primary={<TranslatedText id={`navbar.listings.link`} />} 
                  />
                </ListItem>
              </NavLink>   
              <NavLink to={`/${locale.split('-')[0]}/listings/new`}>
                <ListItem button key="new">
                  <ListItemText 
                    primary={<TranslatedText id={`navbar.newListing.link`} />} 
                  />
                </ListItem>
              </NavLink>       
              <NavLink to={`/${locale.split('-')[0]}/providers/settings`}>
                <ListItem button key="providers">
                  <ListItemText 
                    primary={<TranslatedText id={`navbar.settings.link`} />} 
                  />
                </ListItem>
              </NavLink>             
              <ListItem button key="login" onClick={()=> {
                  auth.signOut();
                  return <Redirect to="/login" />;
                }}      
                >
                  <ListItemText               
                    primary={<TranslatedText id={`navbar.logout.link`} />}
                  />
              </ListItem>
            </React.Fragment>
            : 
            <React.Fragment>
              <NavLink to={`/${locale.split('-')[0]}/login`}>
                <ListItem button key="login">
                  <ListItemText               
                    primary={<TranslatedText id={`navbar.login.link`} />} 
                  />
                </ListItem>
              </NavLink>
              <NavLink to={`/${locale.split('-')[0]}/signup`}>
                <ListItem button key="signup">
                  <ListItemText               
                    primary={<TranslatedText id={`navbar.signup.link`} />} 
                  />
                </ListItem>
              </NavLink>
            </React.Fragment>
          }
        </List>
      </div>
    );
    
    return (
      <div className={classes.root}>
        <AppBar className="app-header" position="static">
          <Toolbar>
            <NavLink to={`/${locale.split('-')[0]}`} className="brand-logo">
              <Logo />
            </NavLink>
            <Box display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }}>
              <ul className="app-header-full">                      
                <li><NavLink to={`/${locale.split('-')[0]}/about`}><TranslatedText id={`navbar.about.link`} /></NavLink></li>
                <li><NavLink to={`/${locale.split('-')[0]}/contact`}><TranslatedText id={`navbar.contact.link`} /></NavLink></li>
                { !!auth.user ?
                    <React.Fragment>
                      <li>
                        <NavLink to={`/${locale.split('-')[0]}/profile`}>
                          <TranslatedText id={`navbar.profile.link`} />
                        </NavLink>
                      </li>  
                      <li>
                        <NavLink to={`/${locale.split('-')[0]}/listings`}>
                          <TranslatedText id={`navbar.listings.link`} />
                        </NavLink>
                      </li>  
                      <li>
                        <NavLink to={`/${locale.split('-')[0]}/listings/new`}>
                          <TranslatedText id={`navbar.newListing.link`} />
                        </NavLink>
                      </li>       
                      <li className="logout-link" onClick={()=> {
                          auth.signOut();
                          return <Redirect to="/login" />;
                        }}      
                        >
                          <TranslatedText id={`navbar.logout.link`} />
                      </li>
                      <li>
                        <img 
                          style={{display:'inline', height:'38px', borderRadius:'50%'}} 
                          src="../../images/avatar.png" 
                          alt="Profile image" />
                      </li>
                    </React.Fragment>
                    : 
                    <React.Fragment>
                      <li>
                        <NavLink to={`/${locale.split('-')[0]}/login`}>
                          <TranslatedText id={`navbar.login.link`} />
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={`/${locale.split('-')[0]}/signup`}>
                          <TranslatedText id={`navbar.signup.link`} />
                        </NavLink>
                      </li>
                    </React.Fragment>
                }
              </ul>
            </Box>
            <Box display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none' }}>
            <div id="nav-icon" 
              aria-label="menu"
              onClick = {toggleDrawer('top', true)}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer anchor="right" open={state.top} onClose={toggleDrawer('top', false)}>
        {drawer('top', locale)}
        </Drawer>
      </div>
    );
}