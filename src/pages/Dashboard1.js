import React from 'react';
import * as PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles/index';
import { dark } from '../styles/palette';
import { styles } from '../styles/styles';
import AppBar from '@material-ui/core/AppBar/index';
import Tabs from '@material-ui/core/Tabs/index';
import NoSsr from '@material-ui/core/NoSsr/index';
import Tab from '@material-ui/core/Tab/index';
import Typography from '@material-ui/core/Typography/index';
import CodeIcon from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/DashboardRounded';
import TeamIcon from '@material-ui/icons/PeopleRounded';
import CreateIcon from '@material-ui/icons/CreateNewFolder';
import HomeIcon from '@material-ui/icons/HomeRounded';
import HelpIcon from '@material-ui/icons/HelpRounded';
import SettingsIcon from '@material-ui/icons/Settings';
import classnames from 'classnames';
import Settings from './Settings';
import Teams from './Teams';
import ErrorBoundary from '../components/errorBoundary';
import DataCreator from './DataCreator';

function TabContainer(props) {
  return <Typography component='div'>{props.children}</Typography>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

function LinkTab(props) {
  return (
    <Tab component='a' onClick={event => event.preventDefault()} {...props} />
  );
}

class NavTabs extends React.Component {
  state = {
    value: 0,
    theme: dark
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <NoSsr>
        <MuiThemeProvider theme={this.state.theme}>
          <div className={classnames(classes.root)}>
            <AppBar position='sticky'>
              <Tabs
                variant='fullWidth'
                scrollButtons='auto'
                value={value}
                centered
                textColor='secondary'
                indicatorColor={'secondary'}
                onChange={this.handleChange}
                component={'div'}>
                <LinkTab label='Home' href='home' icon={<HomeIcon />} />
                <LinkTab
                  label='Teams'
                  href='teams'
                  textColor='secondary'
                  icon={<TeamIcon />}
                />
                <LinkTab
                  label={'Data Creator'}
                  href={'dataCreator'}
                  icon={<CreateIcon />}
                />
                <LinkTab
                  label='Risk Analysis'
                  href='riskAnalysis'
                  icon={<DashboardIcon />}
                />
                <LinkTab
                  label={'UIA Assist'}
                  href={'uiaAssist'}
                  icon={<CodeIcon />}
                />
                <LinkTab
                  label={'Settings'}
                  href={'settings'}
                  icon={<SettingsIcon />}
                />
                <LinkTab label='Help' href='help' icon={<HelpIcon />} />
              </Tabs>
            </AppBar>
            <div>
              <ErrorBoundary>
                {value === 0 && <TabContainer>Page One</TabContainer>}
                {value === 1 && (
                  <TabContainer>
                    <Teams />
                  </TabContainer>
                )}
                {value === 2 && (
                  <TabContainer>
                    <DataCreator />
                  </TabContainer>
                )}
                {value === 3 && <TabContainer>Page Three</TabContainer>}
                {value === 4 && <TabContainer>PageFive</TabContainer>}
                {value === 5 && (
                  <TabContainer>
                    <Settings />
                  </TabContainer>
                )}
                {value === 6 && <TabContainer>PageFive</TabContainer>}
              </ErrorBoundary>
            </div>
          </div>
        </MuiThemeProvider>
      </NoSsr>
    );
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavTabs);
