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
  Event as CalendarIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon
} from '@material-ui/icons';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { UserAgentApplication } from 'msal';
import * as PropTypes from 'prop-types';
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { getUserDetails, getUserAvatar } from '../data/api/GraphService';
import DrawerList from '../components/drawerList';
import ErrorBoundary from '../components/errorBoundary';
import NavBar from '../components/NavBar';
import SnackBar from '../components/snackbar';
import { dark, light } from '../styles/palette';
import { styles } from '../styles/styles';
import { asyncFetch } from '../utils/frontEnd';
import { LinkedIconButton } from '../components/buttons';

const Home = lazy(() => import('./Home'));
const Teams = lazy(() => import('./Teams'));
const DataCreator = lazy(() => import('./DataCreator'));
const Calendar = lazy(() => import('./Calendar'));
const Analyses = lazy(() => import('./Analyses'));
const RiskAnalysisCreator = lazy(() => import('./RiskAnalysisCreator'));
const UIAAssist = lazy(() => import('./UIAAssist'));
const Projects = lazy(() => import('./Projects'));
const ProjectCreator = lazy(() => import('./ProjectCreator'));

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.userAgentApplication = new UserAgentApplication({
      auth: {
        clientId: '12d73aec-3aa8-4e24-a433-b3c97d1b2b1e'
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true
      }
    });

    const user = this.userAgentApplication.getAccount();

    function authCallback(error, response) {
      //handle redirect response here - I feel like it should be where I'm finding or creating the user, but who knows
      console.log(response);
    }

    this.userAgentApplication.handleRedirectCallback(authCallback);

    this.state = {
      isAuthenticated: user !== null,
      user: {},
      darkMode: false,
      error: null,
      open: false
    };

    if (user) {
      // Get data from Graph service
      this.getUserProfile();
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleDarkMode = async () => {
    if (!this.state.darkMode) {
      this.setState({ darkMode: true });
      await asyncFetch('post', '/preferences/' + this.state.user.id, {
        darkMode: true
      });
    } else {
      this.setState({ darkMode: false });
      await asyncFetch('post', '/preferences/' + this.state.user.id, {
        darkMode: false
      });
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
      <MuiThemeProvider theme={this.state.darkMode ? dark : light}>
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
                children={<MenuIcon />}
                color='secondary'
                aria-label='Open drawer'
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden
                )}
              />
              <Typography
                component='h1'
                variant='h6'
                color='secondary'
                noWrap
                className={classes.title}>
                PD Assistant
              </Typography>
              <Tooltip
                title={
                  !this.state.darkMode
                    ? 'Toggle Dark Mode'
                    : 'Toggle Light Mode'
                }>
                <IconButton
                  color={'secondary'}
                  onClick={this.handleDarkMode}
                  children={this.state.darkMode ? <LightMode /> : <DarkMode />}
                />
              </Tooltip>
              {this.state.isAuthenticated ? (
                <Tooltip title={'Notifications'}>
                  <IconButton
                    color='secondary'
                    children={
                      <Badge badgeContent={4} color='error'>
                        <NotificationsIcon />
                      </Badge>
                    }
                  />
                </Tooltip>
              ) : (
                ''
              )}
              {this.state.isAuthenticated ? (
                <Tooltip title={'Calendar'}>
                  <LinkedIconButton
                    color={'secondary'}
                    icon={<CalendarIcon color={'secondary'} />}
                    to={'/calendar'}
                  />
                </Tooltip>
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
                avatar={this.state.avatar}
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
              <IconButton
                onClick={this.handleDrawerClose}
                children={<ChevronLeftIcon />}
              />
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
                  <Route
                    path='/teams'
                    render={() => <Teams userId={this.state.user.id} />}
                  />
                  <Route path='/dataCreator' render={() => <DataCreator />} />
                  <Route exact path='/analyses' render={() => <Analyses />} />
                  <Route
                    exact
                    path={'/analyses/new'}
                    render={() => <RiskAnalysisCreator />}
                  />
                  <Route path='/uiaAssist' component={UIAAssist} />
                  <Route
                    path={'/calendar'}
                    render={() => <Calendar accessToken={this.state.token} />}
                  />
                  <Route
                    exact
                    path={'/projects'}
                    render={() => <Projects userId={this.state.user.id} />}
                  />
                  <Route
                    path={'/projects/new'}
                    render={() => (
                      <ProjectCreator userId={this.state.user.id} />
                    )}
                  />
                </Switch>
              </Suspense>
            </main>
            <SnackBar />
          </ErrorBoundary>
        </div>
      </MuiThemeProvider>
    );
  }

  async login() {
    try {
      await this.userAgentApplication.loginPopup({
        scopes: ['user.read', 'calendars.read'],
        prompt: 'select_account'
      });
      await this.getUserProfile();
    } catch (err) {
      this.setState({
        isAuthenticated: false,
        user: {},
        error: { message: err }
      });
    }
  }

  async findOrCreateUser(user) {
    //this really needs to use the sequelize findOrCreate or upsert methods, but can't figure it out using finale endpoints
    asyncFetch('get', '/users/' + user.id).then(result => {
      console.log(result);
      if (result.message === 'Not Found') {
        asyncFetch('post', '/users', {
          displayName: user.displayName,
          email: user.mail,
          id: user.id
        }).then(createdUser =>
          asyncFetch('post', '/preferences/', {
            userId: createdUser.id
          })
        );
      } else if (result.id === user.id) {
        asyncFetch('get', '/preferences/' + user.id).then(result =>
          this.setState({
            darkMode: result.darkMode
          })
        );
      }
    });
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
        scopes: ['user.read', 'calendars.read']
      });

      if (accessToken) {
        const user = await getUserDetails(accessToken);
        const userAvatar = await getUserAvatar(accessToken);
        this.setState({
          isAuthenticated: true,
          token: accessToken.accessToken,
          user: {
            id: user.id,
            displayName: user.displayName,
            email: user.mail || user.userPrincipalName
          },
          avatar: userAvatar,
          error: null
        });
        await this.findOrCreateUser(user);
      }
    } catch (error) {
      if (error.errorMessage.indexOf('interaction_required') !== -1) {
        this.userAgentApplication
          .acquireTokenPopup({ scopes: ['user.read'] })
          .then(function (accessTokenResponse) {
            const user = getUserDetails(accessTokenResponse.accessToken);
            const userAvatar = getUserAvatar(accessTokenResponse.accessToken);
            this.setState({
              isAuthenticated: true,
              user: {
                id: user.id,
                displayName: user.displayName,
                email: user.mail || user.userPrincipalName,
                avatar: userAvatar
              },
              error: null
            });
          })
          .then(() => this.findOrCreateUser(this.state.user.id))
          .catch(function (error) {
            this.setState({
              error: { error }
            });
            console.log(error);
          });
      }
      console.log(error);
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
