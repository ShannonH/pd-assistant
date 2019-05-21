import Grid from '@material-ui/core/Grid/index';
import Typography from '@material-ui/core/Typography/index';
import React, { Component } from 'react';
import { AddFab } from '../components/buttons';
import TeamCard from '../components/teamCards';

class Teams extends Component {
  render() {
    return (
      <div>
        <Typography variant="h4" gutterBottom component="h2">
          Polls
        </Typography>
        <Grid container spacing={24}>
          <Grid item md={3}>
            <TeamCard team={'VHS'} />
          </Grid>
          <Grid item md={3}>
            <TeamCard team={'Betamax'} />
          </Grid>
          <Grid item md={3}>
            <TeamCard team={'Alpha'} />
          </Grid>
        </Grid>
        <AddFab href={'./addTeam'} />
      </div>
    );
  }
}

export default Teams;
