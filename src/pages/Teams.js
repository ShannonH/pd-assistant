import Grid from '@material-ui/core/Grid/index';
import Typography from '@material-ui/core/Typography/index';
import React, { Component } from 'react';
import { AddFab } from '../components/buttons';
import TeamCard from '../components/teamCards';
import { styles } from '../styles/styles';
import withStyles from '@material-ui/styles/withStyles';

class Teams extends Component {
  render() {
    return (
      <div style={{ padding: 24 }}>
        <Typography
          style={{ paddingBottom: 10 }}
          align={'left'}
          variant='h4'
          gutterBottom
          component='h2'>
          Teams
        </Typography>
        <Grid container spacing={5}>
          <Grid item md={3}>
            <TeamCard team={'VHS'} />
          </Grid>
          <Grid item md={3}>
            <TeamCard team={'PVC'}/>
          </Grid>
          <Grid item md={3}>
            <TeamCard team={'Team With a Long Name for Some Odd Reason'}/>
          </Grid>
        </Grid>
        <AddFab href={'./addTeam'} />
      </div>
    );
  }
}

export default withStyles(styles)(Teams);
