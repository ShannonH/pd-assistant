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
import * as PropTypes from 'prop-types';
import React, { Suspense, lazy } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
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
const Settings = lazy(() => import('../pages/Settings'));
//const RiskAnalysis = lazy(() => import('../pages/Analyses'));
//const UIAAssist = lazy(() => import(''));

class Dashboard extends React.Component {
  state = {
    darkMode: false,
    theme: light,
    open: false
  };

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
                  Quality Assistant
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
                    <Route exact path='/' component={Home} />
                    <Route path='/home' component={Home} />
                    <Route path='/teams' component={Teams} />
                    <Route path='/dataCreator' component={DataCreator} />
                    {/*<Route path='/analyses' component={RiskAnalysis} />*/}
                    {/*<Route path='/uiaAssist' component={UIAAssist} />*/}
                    <Route path='/settings' component={Settings} />
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
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
