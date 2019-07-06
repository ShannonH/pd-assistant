import React, { Component } from 'react';
import ChipBox from '../components/chipBox';
import { Typography, withStyles, Button, FormGroup } from '@material-ui/core';
import { styles } from '../styles/styles';
import classNames from 'classnames';
import { openSnackbar } from '../components/snackbar';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.user.username,
      teams: [],
      settings: {
        calendarSetting: false,
        theme: props.theme,
        darkMode: props.darkMode
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteTeam = this.handleDeleteTeam.bind(this);
    this.handleAddTeam = this.handleAddTeam.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    /*this.getUserTeams(this.props.user.username).then(result => {
      console.log(result);
    });*/
    fetch('/users').then(response => console.log(response.json()));
  }

  getUserTeams(username) {
    fetch('/preferences?searchByUser=' + username).then(result =>
      this.setState({ teams: result })
    );
  }

  handleAddTeam(team) {
    this.state.teams.push(team);
    console.log(this.state);
  }

  handleDeleteTeam(deletedOption) {
    this.setState({
      teams: this.state.teams.filter(c => c !== deletedOption)
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  }

  handleSubmit() {
    console.log(this.state);
    fetch('/preferences', {
      method: 'POST',
      body: this.state
    }).then(result => {
      if (result.status === 200) openSnackbar({ message: 'Settings saved!' });
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant={'h4'}>Settings</Typography>
        <br />
        <br />
        <FormGroup>
          <ChipBox addOnBlur value={this.state.teams} />
          <br />
          <br />
          <span className={classNames(classes.bottomSave)}>
            <Button
              onClick={this.handleSubmit}
              size={'large'}
              variant='contained'
              color='secondary'>
              Save
            </Button>
            <Button
              style={{ left: 15 }}
              size={'large'}
              color={'primary'}
              id={'cancel_button'}
              variant={'outlined'}>
              Cancel
            </Button>
          </span>
        </FormGroup>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
