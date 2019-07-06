import {
  AppBar,
  Badge,
  CircularProgress,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Tooltip,
  Typography
} from '@material-ui/core';
import {
  Brightness4 as DarkMode,
  Brightness5 as LightMode,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon
} from '@material-ui/icons';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { UserAgentApplication } from 'msal';
import * as PropTypes from 'prop-types';
import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { getUserDetails } from '../api/GraphService';
import DrawerList from '../components/drawerList';
import ErrorBoundary from '../components/errorBoundary';
import NavBar from '../components/NavBar';
import SnackBar from '../components/snackbar';
import * as config from '../Config';
import { dark, light } from '../styles/palette';
import { styles } from '../styles/styles';

const Home = lazy(() => import('../pages/Home'));
const Teams = lazy(() => import('../pages/Teams'));
const DataCreator = lazy(() => import('../pages/DataCreator'));
const Calendar = lazy(() => import('../components/Calendar'));
const Settings = lazy(() => import('../pages/Settings'));
const Analyses = lazy(() => import('../pages/Analyses'));
const RiskAnalysisCreator = lazy(() => import('../pages/RiskAnalysisCreator'));
//const UIAAssist = lazy(() => import(''));

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.userAgentApplication = new UserAgentApplication({
      auth: {
        clientId: config.appId
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true
      }
    });

    const user = this.userAgentApplication.getAccount();
    this.state = {
      isAuthenticated: user !== null,
      user: {},
      error: null,
      theme: light,
      darkMode: false,
      open: false
    };

    if (user) {
      // Enhance user object with data from Graph
      this.getUserProfile();
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleDarkMode = () => {
    //this needs refactored to save the choice in localStorage or redis
    if (!this.state.darkMode) {
      this.setState({ theme: dark, darkMode: true });
    } else {
      this.setState({ theme: light, darkMode: false });
    }
  };

  render() {
    const { classes } = this.props;
    let drawer = (
      <List component={'nav'}>
        {<DrawerList isAuthenticated={this.state.isAuthenticated} />}
      </List>
    );

    return (
      <MuiThemeProvider theme={this.state.theme}>
        <div className={classNames(classes.root)}>
          <CssBaseline />
          <AppBar
            position='absolute'
            className={classNames(
              classes.appBar,
              this.state.open && classes.appBarShift
            )}>
            <Toolbar
              disableGutters={!this.state.open}
              className={classes.toolbar}>
              <IconButton
                color='secondary'
                aria-label='Open drawer'
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden
                )}>
                <MenuIcon />
              </IconButton>
              <Typography
                component='h1'
                variant='h6'
                color='secondary'
                noWrap
                className={classes.title}>
                EP Assistant
              </Typography>
              <Tooltip title={'Toggle Dark Mode'}>
                <IconButton color={'secondary'} onClick={this.handleDarkMode}>
                  {this.state.darkMode ? <LightMode /> : <DarkMode />}
                </IconButton>
              </Tooltip>
              {this.state.isAuthenticated ? (
                <IconButton color='secondary'>
                  <Badge badgeContent={4} color='error'>
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              ) : (
                ''
              )}
              <NavBar
                isAuthenticated={this.state.isAuthenticated}
                authButtonMethod={
                  this.state.isAuthenticated
                    ? this.logout.bind(this)
                    : this.login.bind(this)
                }
                user={this.state.user}
              />
            </Toolbar>
          </AppBar>
          <Drawer
            variant='permanent'
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.state.open && classes.drawerPaperClose
              )
            }}
            open={this.state.open}>
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider component={'div'} />
            {drawer}
          </Drawer>
          <ErrorBoundary>
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Suspense
                fallback={
                  <div>
                    <CircularProgress />
                  </div>
                }
                color={'secondary'}
                className={classNames(classes.progress)}>
                <Route
                  exact
                  path='/'
                  render={props => (
                    <Home
                      {...props}
                      isAuthenticated={this.state.isAuthenticated}
                      user={this.state.user}
                      authButtonMethod={this.login.bind(this)}
                    />
                  )}
                />{' '}
                <Route
                  path='/home'
                  render={props => (
                    <Home
                      {...props}
                      isAuthenticated={this.state.isAuthenticated}
                      user={this.state.user}
                      authButtonMethod={this.login.bind(this)}
                    />
                  )}
                />{' '}
                <Route path='/teams' component={Teams} />
                <Route path='/dataCreator' component={DataCreator} />
                <Route exact path='/analyses' component={Analyses} />
                <Route
                  exact
                  path={'/analyses/new'}
                  component={RiskAnalysisCreator}
                />
                {/*<Route path='/uiaAssist' component={UIAAssist} />*/}
                <Route path={'/calendar'} component={Calendar} />
                <Route
                  path='/settings'
                  render={props => (
                    <Settings
                      {...props}
                      user={this.state.user}
                      theme={this.state.theme}
                      darkMode={this.state.darkMode}
                    />
                  )}
                />
              </Suspense>
            </main>
            <SnackBar />
          </ErrorBoundary>
        </div>
      </MuiThemeProvider>
    );
  }
  setErrorMessage(message, debug) {
    this.setState({
      error: { message: message, debug: debug }
    });
  }

  async login() {
    try {
      await this.userAgentApplication.loginPopup({
        scopes: config.scopes,
        prompt: 'select_account'
      });
      await this.getUserProfile();
    } catch (err) {
      const errParts = err.split('|');
      this.setState({
        isAuthenticated: false,
        user: {},
        error: { message: errParts[1], debug: errParts[0] }
      });
    }
  }

  logout() {
    this.userAgentApplication.logout();
  }

  async getUserProfile() {
    try {
      // Get the access token silently
      // If the cache contains a non-expired token, this function
      // will just return the cached token. Otherwise, it will
      // make a request to the Azure OAuth endpoint to get a token

      let accessToken = await this.userAgentApplication.acquireTokenSilent({
        scopes: config.scopes
      });

      if (accessToken) {
        const user = await getUserDetails(accessToken);
        this.setState({
          isAuthenticated: true,
          user: {
            displayName: user.displayName,
            email: user.mail || user.userPrincipalName
          },
          error: null
        });
      }
    } catch (err) {
      let error = {};
      if (typeof err === 'string') {
        const errParts = err.split('|');
        error =
          errParts.length > 1
            ? { message: errParts[1], debug: errParts[0] }
            : { message: err };
      } else {
        error = {
          message: err.message,
          debug: JSON.stringify(err)
        };
      }

      this.setState({
        isAuthenticated: false,
        user: {},
        error: error
      });
    }
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);

/* This is the return from graph service for my own account
Account {accountIdentifier: "552b84b0-da76-485f-ae60-86347a2f398c", homeAccountIdentifier: "NTUyYjg0YjAtZGE3Ni00ODVmLWFlNjAtODYzNDdhMmYzOThj.YmYwYjI5YTItNWU1Yy00YWFhLWJhNGQtYWM5ODhkZjE1ZWE2", userName: "Shannon.Harris@blackboard.com", name: "Shannon Harris", idToken: {…}, …}
accountIdentifier: "552b84b0-da76-485f-ae60-86347a2f398c"
environment: "https://login.microsoftonline.com/bf0b29a2-5e5c-4aaa-ba4d-ac988df15ea6/v2.0"
homeAccountIdentifier: "NTUyYjg0YjAtZGE3Ni00ODVmLWFlNjAtODYzNDdhMmYzOThj.YmYwYjI5YTItNWU1Yy00YWFhLWJhNGQtYWM5ODhkZjE1ZWE2"
idToken:
aio: "ATQAy/8LAAAAHGN6156xMJJBggJXACbAETe0Et0SVPhwvPIJBQlr3sYSlNlvI6QHCUGwS12xbfyR"
aud: "12d73aec-3aa8-4e24-a433-b3c97d1b2b1e"
exp: 1561240073
iat: 1561236173
iss: "https://login.microsoftonline.com/bf0b29a2-5e5c-4aaa-ba4d-ac988df15ea6/v2.0"
name: "Shannon Harris"
nbf: 1561236173
nonce: "3af36b97-0256-46b5-bbae-2c1e0d4c3d8f"
oid: "552b84b0-da76-485f-ae60-86347a2f398c"
preferred_username: "Shannon.Harris@blackboard.com"
sub: "8qR9JhPPrLoLuSL0_I1gro_KSjXdePvJXFB0RwH7ty8"
tid: "bf0b29a2-5e5c-4aaa-ba4d-ac988df15ea6"
uti: "MSOukuYj0kyHQGsXxxYiAA"
ver: "2.0"
__proto__: Object
name: "Shannon Harris"
sid: undefined
userName: "Shannon.Harris@blackboard.com"
__proto__: Object */
