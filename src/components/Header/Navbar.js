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
import { FormattedMessage } from 'react-intl';
import { LocaleContext } from '../../contexts/LocaleContext';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar(props) {

    const classes = useStyles();
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });

    const toggleDrawer = (side, open) => event => {
      var element = document.getElementById("nav-icon3");
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
              primary={<FormattedMessage id={`navbar.home.link.${locale}`} />} 
            />
            </ListItem>
          </NavLink>
          {/* <NavLink to={`/${locale.split('-')[0]}/explore`}>
            <ListItem button key="explore">
              <ListItemText 
                primary={<FormattedMessage id={`navbar.explore.link.${locale}`} />} 
              />
            </ListItem>
          </NavLink> */}
          <NavLink to={`/${locale.split('-')[0]}/about`}>
            <ListItem button key="about">
              <ListItemText 
                primary={<FormattedMessage id={`navbar.about.link.${locale}`} />} 
              />
            </ListItem>
          </NavLink>
          {/* <NavLink to={`/${locale.split('-')[0]}/locations`}>
            <ListItem button key="locations">
              <ListItemText               
                primary={<FormattedMessage id={`navbar.locations.link.${locale}`} />} 
               />
            </ListItem>
          </NavLink> */}
          {/* <NavLink to={`/${locale.split('-')[0]}/providors`}>
            <ListItem button key="providors">
              <ListItemText               
                primary={<FormattedMessage id={`navbar.providors.link.${locale}`} />} 
               />
            </ListItem>
          </NavLink> */}
          <NavLink to={`/${locale.split('-')[0]}/contact`}>
            <ListItem button key="contact">
              <ListItemText               
                primary={<FormattedMessage id={`navbar.contact.link.${locale}`} />} 
             />
            </ListItem>
          </NavLink>
        </List>
      </div>
    );

    return (
      <LocaleContext.Consumer>{(context) => {
        const locale = context.locale;
        return(<div className={classes.root}>
        <AppBar className="app-header" position="static">
          <Toolbar>
            <NavLink to={`/${locale.split('-')[0]}`} className="brand-logo">
              <Logo />
            </NavLink>
            <Box display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }}>
              <ul className="app-header-full">                      
                {/* <li><NavLink to={`/${locale.split('-')[0]}/explore`}><FormattedMessage id={`navbar.explore.link.${locale}`} /></NavLink></li> */}
                <li><NavLink to={`/${locale.split('-')[0]}/about`}><FormattedMessage id={`navbar.about.link.${locale}`} /></NavLink></li>
                {/* <li><NavLink to={`/${locale.split('-')[0]}/locations`}><FormattedMessage id={`navbar.locations.link.${locale}`} /></NavLink></li> */}
                {/* <li><NavLink to={`/${locale.split('-')[0]}/providers`}><FormattedMessage id={`navbar.providors.link.${locale}`} /></NavLink></li> */}
                <li><NavLink to={`/${locale.split('-')[0]}/contact`}><FormattedMessage id={`navbar.contact.link.${locale}`} /></NavLink></li>
              </ul>
            </Box>
            <Box display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none' }}>
            <div id="nav-icon3" 
              aria-label="menu"
              onClick = {toggleDrawer('top', true)}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
              {/* <IconButton 
                onClick={toggleDrawer('top', true)} className={`${classes.menuButton} menu-icon`} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton> */}
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer anchor="right" open={state.top} onClose={toggleDrawer('top', false)}>
        {drawer('top', locale)}
        </Drawer>
      </div>)}}</LocaleContext.Consumer>
      
    );
}