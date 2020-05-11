import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import {
  Code as CodeIcon,
  PeopleRounded as TeamIcon,
  HomeRounded as HomeIcon,
  BarChart as BarCharIcon,
  ViewList as ProjectsIcon,
  AddCircleOutline as CreateIcon
} from '@material-ui/icons';
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
          icon={<HomeIcon color={'primary'} />}
        />
        <ListItemLink
          to={'/dataCreator'}
          primary={'Data Creator'}
          icon={<CreateIcon color={'primary'} />}
        />
        <ListItemLink
          to={'/analyses'}
          primary={'Risk Analysis'}
          icon={<BarCharIcon color={'primary'} />}
        />
        <ListItemLink
          to={'/uiaAssist'}
          primary={'UIA Assist'}
          icon={<CodeIcon color={'primary'} />}
        />
        <Divider component={'div'} />
        {this.props.isAuthenticated ? (
          <div>
            <ListItemLink
              to={'/teams'}
              primary={'Teams'}
              icon={<TeamIcon color={'primary'} />}
            />
            <ListItemLink
              to={'/projects'}
              primary={'Projects'}
              icon={<ProjectsIcon color={'primary'} />}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default DrawerList;
