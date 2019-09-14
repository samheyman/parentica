import React from 'react';
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

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {

    const classes = useStyles();
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });

    const toggleDrawer = (side, open) => event => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [side]: open });
    };

    const drawer = side => (
      <div
        className={classes.toolbar}
        role="presentation"
        onClick={toggleDrawer(side, false)}
        onKeyDown={toggleDrawer(side, false)}
      >
      {/* <div className="spacer"></div> */}
      <List className="sidebar-links">
        <NavLink to="/home">
            <ListItem button key="home">
              <ListItemText primary="Home" />
            </ListItem>
          </NavLink>
          <NavLink to="/explore">
            <ListItem button key="explore">
              <ListItemText primary="Explore" />
            </ListItem>
          </NavLink>
          <NavLink to="/about">
            <ListItem button key="about">
              <ListItemText primary="About us" />
            </ListItem>
          </NavLink>
          <NavLink to="/locations">
            <ListItem button key="locations">
              <ListItemText primary="Locations" />
            </ListItem>
          </NavLink>
          <NavLink to="/contact">
            <ListItem button key="contact">
              <ListItemText primary="Contact" />
            </ListItem>
          </NavLink>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className="app-header" position="static">
          <Toolbar>
            <NavLink to="/" className="brand-logo">
              <Logo />
            </NavLink>
            <Box display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }}>
              <ul className="app-header-full">                      
                <li><NavLink to="/explore">Explore</NavLink></li>
                <li><NavLink to="/about">About us</NavLink></li>
                <li><NavLink to="/locations">Locations</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
                {/* <li><NavLink to="collapsible.html">Sign in</NavLink></li>
                <li><NavLink className="btn-small" to="collapsible.html">Sign up</NavLink></li> */}
              </ul>
            </Box>
            <Box display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none' }}>
              <IconButton 
                onClick={toggleDrawer('top', true)} className={`${classes.menuButton} menu-icon`} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer anchor="right" open={state.top} onClose={toggleDrawer('top', false)}>
        {drawer('top')}
        </Drawer>
      </div>
      
    );
}