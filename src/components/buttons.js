import { withStyles, Fab, IconButton, Chip, Button } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import * as PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const styles = theme => ({
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  buttonShell: {
    borderRadius: 50,
    padding: 0,
    margin: 5,
    textTransform: 'none'
  }
});

class LinkedFab extends React.Component {
  renderLink = React.forwardRef((itemProps, ref) => (
    <Link to={this.props.to} {...itemProps} ref={ref} />
  ));
  render() {
    const { classes } = this.props;
    return (
      <Fab
        component={this.renderLink}
        children={<AddIcon />}
        className={classes.fab}
      />
    );
  }
}

const FloatingAddButton = props => {
  const { classes } = props;
  return (
    <div>
      <Fab
        onClick={props.onClick}
        color='secondary'
        aria-label='Add'
        className={classes.fab}
        href={props.href}
        children={<AddIcon />}
      />
    </div>
  );
};

const SelectableButtonChips = props => {
  const { classes } = props;
  if (!props.selected) {
    return (
      <Button
        className={classes.buttonShell}
        size={'medium'}
        children={
          <Chip
            variant='outlined'
            icon={props.icon}
            component={'div'}
            label={props.label}
          />
        }
        onClick={props.selectChip}
      />
    );
  } else if (props.selected) {
    return (
      <Button
        className={classes.buttonShell}
        size={'medium'}
        children={
          <Chip
            color={'secondary'}
            variant='outlined'
            deleteIcon={<Done />}
            icon={props.icon}
            component={'div'}
            label={props.label}
            onDelete={() => console.log(props.label)}
          />
        }
        onClick={props.selectChip}
      />
    );
  }
};

class LinkedIcon extends React.Component {
  renderLink = React.forwardRef((itemProps, ref) => (
    <Link to={this.props.to} {...itemProps} ref={ref} />
  ));

  render() {
    const { icon } = this.props;
    return <IconButton component={this.renderLink} children={icon} />;
  }
}

FloatingAddButton.propTypes = {
  classes: PropTypes.object.isRequired
};

const AddFab = withStyles(styles)(FloatingAddButton);
const LinkedIconButton = withStyles(styles)(LinkedIcon);
const LinkedAddFab = withStyles(styles)(LinkedFab);
const SelectableChip = withStyles(styles)(SelectableButtonChips);

export { AddFab, LinkedIconButton, LinkedAddFab, SelectableChip };
