import AppBar from '@material-ui/core/AppBar/index';
import Badge from '@material-ui/core/Badge/index';
import CssBaseline from '@material-ui/core/CssBaseline/index';
import Divider from '@material-ui/core/Divider/index';
import Drawer from '@material-ui/core/Drawer/index';
import IconButton from '@material-ui/core/IconButton/index';
import List from '@material-ui/core/List/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles/index';
import Toolbar from '@material-ui/core/Toolbar/index';
import Tooltip from '@material-ui/core/Tooltip/index';
import Typography from '@material-ui/core/Typography/index';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import classNames from 'classnames';
import { UserAgentApplication } from 'msal';
import * as PropTypes from 'prop-types';
import React, { Suspense, lazy } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { getUserDetails } from '../api/GraphService';
import NavBar from '../components/NavBar';
import * as config from '../Config';
import { dark, light } from '../styles/palette';
import DarkMode from '@material-ui/icons/Brightness4';
import LightMode from '@material-ui/icons/Brightness5';
import { styles } from '../styles/styles';
import ErrorBoundary from '../components/errorBoundary';
import DrawerList from '../components/drawerList';
import SnackBar from '../components/snackbar';

const Home = lazy(() => import('../pages/Home'));
const Teams = lazy(() => import('../pages/Teams'));
const DataCreator = lazy(() => import('../pages/DataCreator'));
const Calendar = lazy(() => import('../components/Calendar'));
const Settings = lazy(() => import('../pages/Settings'));
//const RiskAnalysis = lazy(() => import('../pages/Analyses'));
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
    console.log(this.state.darkMode);
    if (!this.state.darkMode) {
      this.setState({ theme: dark, darkMode: true });
    } else {
      this.setState({ theme: light, darkMode: false });
    }
    console.log(this.state.darkMode);
  };

  render() {
    const { classes } = this.props;
    let drawer = <List component={'nav'}>{<DrawerList />}</List>;

    return (
      <MuiThemeProvider theme={this.state.theme}>
        <div className={classNames(classes.root)}>
          <HashRouter>
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
                <IconButton color='secondary'>
                  <Badge badgeContent={4} color='error'>
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
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
                  <Switch>
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
                    />
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
                    />
                    <Route path='/teams' component={Teams} />
                    <Route path='/dataCreator' component={DataCreator} />
                    {/*<Route path='/analyses' component={RiskAnalysis} />*/}
                    {/*<Route path='/uiaAssist' component={UIAAssist} />*/}
                    <Route path={'/calendar'} component={Calendar} />
                    <Route
                      path='/settings'
                      render={props => (
                        <Settings
                          {...props}
                          name={this.state.user.displayName}
                        />
                      )}
                    />
                  </Switch>
                </Suspense>
              </main>
              <SnackBar />
            </ErrorBoundary>
          </HashRouter>
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
        // Get the user's profile from Graph
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
