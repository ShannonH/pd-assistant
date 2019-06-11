import Divider from '@material-ui/core/Divider/index';
import ListItem from '@material-ui/core/ListItem/index';
import ListItemIcon from '@material-ui/core/ListItemIcon/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import CodeIcon from '@material-ui/icons/Code';
import TeamIcon from '@material-ui/icons/PeopleRounded';
import HomeIcon from '@material-ui/icons/HomeRounded';
import DashboardIcon from '@material-ui/icons/DashboardRounded';
import CreateIcon from '@material-ui/icons/CreateNewFolder';
import CalendarIcon from '@material-ui/icons/PermContactCalendarRounded';
import SettingsIcon from '@material-ui/icons/Settings';
import * as PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class ListItemLink extends React.Component {
  renderLink = React.forwardRef((itemProps, ref) => (
    <Link to={this.props.to} {...itemProps} ref={ref} />
  ));

  render() {
    const { icon, primary } = this.props;
    return (
      <li>
        <ListItem button component={this.renderLink}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  }
}

ListItemLink.propTypes = {
  icon: PropTypes.node.isRequired,
  primary: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired
};

class DrawerList extends React.Component {
  render() {
    return (
      <div>
        <ListItemLink
          to='/home'
          primary='Home'
          icon={<HomeIcon color={'secondary'} />}
        />
        <ListItemLink
          to={'/teams'}
          primary={'My Teams'}
          icon={<TeamIcon color={'secondary'} />}
        />
        <ListItemLink
          to={'/dataCreator'}
          primary={'Data Creator'}
          icon={<CreateIcon color={'secondary'} />}
        />
        <ListItemLink
          to={'/analyses'}
          primary={'Risk Analysis'}
          icon={<DashboardIcon color={'secondary'} />}
        />
        <ListItemLink
          to={'/uiaAssist'}
          primary={'UIA Assist'}
          icon={<CodeIcon color={'secondary'} />}
        />
        <Divider component={'div'} />
        <ListItemLink
          icon={<CalendarIcon color={'secondary'} />}
          primary={'My Calendar'}
          to={'/calendar'}
        />
        <ListItemLink
          to='/settings'
          primary='Settings'
          icon={<SettingsIcon color={'secondary'} />}
        />
      </div>
    );
  }
}

export default DrawerList;
