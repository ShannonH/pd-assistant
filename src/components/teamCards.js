import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  withStyles,
  Tooltip,
  Typography
} from '@material-ui/core';
import {
  Edit,
  Delete,
  BarChart,
  Add,
  DeveloperBoard
} from '@material-ui/icons';
import * as PropTypes from 'prop-types';
import React from 'react';
import { asyncFetch } from '../utils/frontEnd';

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

  async function deleteTeam() {
    await asyncFetch('delete');
  }

  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography align={'left'} gutterBottom variant='h5' component='h2'>
          {teamName}
        </Typography>
      </CardContent>
      <CardActions style={{ float: 'left' }}>
        <Tooltip title='Projects'>
          <IconButton
            size='small'
            color='secondary'
            children={<DeveloperBoard />}
          />
        </Tooltip>
        <Tooltip title='Analyses'>
          <IconButton
            size='small'
            color='secondary'
            children={<BarChart />}
            href={'/analysis'}
          />
        </Tooltip>
        <Tooltip title='New Analysis'>
          <IconButton
            size='small'
            color='secondary'
            children={<Add />}
            href={'/analyses'}
          />
        </Tooltip>
      </CardActions>
      <CardActions style={{ float: 'right' }}>
        <Tooltip title={'Edit Team'}>
          <IconButton
            size={'small'}
            color={'secondary'}
            children={<Edit />}
            onClick={props.onEdit}
          />
        </Tooltip>
        <Tooltip title='Remove Team'>
          <IconButton
            size='small'
            color='secondary'
            children={<Delete />}
            onClick={deleteTeam}
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
