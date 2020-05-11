import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  withStyles,
  Tooltip,
  Typography
} from '@material-ui/core';
import { Delete, BarChart, ViewList as ProjectsIcon } from '@material-ui/icons';
import * as PropTypes from 'prop-types';
import React from 'react';
import { LinkedIconButton } from './buttons';

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

let teamName;

function TeamCard(props) {
  teamName = 'Team ' + props.team;
  let handleDelete = props.handleDeleteTeam;
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          align={'left'}
          gutterBottom
          variant='h5'
          component='h2'
          color={'primary'}>
          {teamName}
        </Typography>
      </CardContent>
      <CardActions style={{ float: 'left' }}>
        <Tooltip title='Projects'>
          <LinkedIconButton
            icon={<ProjectsIcon color='primary' />}
            to={'/projects'}
          />
        </Tooltip>
        <Tooltip title='Analyses'>
          <LinkedIconButton
            icon={<BarChart color='primary' />}
            to={'/analyses'}
          />
        </Tooltip>
      </CardActions>
      <CardActions style={{ float: 'right' }}>
        <Tooltip title='Remove Team'>
          <IconButton
            color='primary'
            children={<Delete />}
            onClick={() => handleDelete(props.team)}
          />
        </Tooltip>
      </CardActions>
    </Card>
  );
}

TeamCard.propTypes = {
  classes: PropTypes.object.isRequired,
  team: PropTypes.string.isRequired
};

export default withStyles(styles)(TeamCard);
