import Grid from '@material-ui/core/Grid/index';
import Typography from '@material-ui/core/Typography/index';
import React, { Component } from 'react';
import { AddFab } from '../components/buttons';
import TeamCard from '../components/teamCards';
import { styles } from '../styles/styles';
import withStyles from '@material-ui/styles/withStyles';
import { asyncFetch } from '../utils/frontEnd';
import TeamDialog from '../components/addTeam';

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      userId: props.userId,
      dialogOpen: false,
      newTeam: ''
    };
    this.handleSubmitDialog = this.handleSubmitDialog.bind(this);
  }

  componentDidMount() {
    asyncFetch('get', '/teams/?userId=' + this.state.userId).then(result => {
      if (result !== null) {
        this.setState({ teams: result });
      } else {
        this.setState({ teams: [] });
      }
    });
  }

  handleOpenDialog = () => {
    this.setState({ dialogOpen: true });
  };

  handleCloseDialog = () => {
    this.setState({ dialogOpen: false });
  };

  handleChange = event => {
    this.setState({ newTeam: event.target.value });
  };

  handleSubmitDialog = async () => {
    await asyncFetch('post', '/teams', {
      userId: this.state.userId,
      name: this.state.newTeam
    }).then(result => {
      if (result.name === this.state.newTeam) {
        this.state.teams.push(result);
        this.handleCloseDialog();
      }
    });
  };

  handleDeleteTeam = async team => {
    await asyncFetch(
      'delete',
      '/teams/' + this.state.userId + '/team/' + team
    ).then(() => {
      this.setState({
        teams: this.state.teams.filter(c => c.name !== team)
      });
    });
  };

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
        <Grid container spacing={5} component={'div'}>
          {this.state.teams.map(team => (
            <Grid item md={3} key={team.name} component={'div'}>
              <TeamCard
                team={team.name}
                handleDeleteTeam={this.handleDeleteTeam}
              />
            </Grid>
          ))}
        </Grid>
        <AddFab onClick={this.handleOpenDialog} />
        <TeamDialog
          open={this.state.dialogOpen}
          userId={this.state.userId}
          onCancel={this.handleCloseDialog}
          onInput={this.handleChange}
          onAdd={this.handleSubmitDialog}
          value={this.state.newTeam}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Teams);
