import React, { Component } from 'react';
import ChipBox from '../components/chipBox';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { styles } from '../styles/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
//import { db } from '../data/database';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'shannon',
      teams: [],
      theme: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    this.setState({
      theme: 'light'
    });
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleAdd(option) {
    this.state.options.push(option);
  }

  handleDelete(deletedOption) {
    this.setState({
      options: this.state.options.filter(c => c !== deletedOption)
    });
  }

  handleSubmit() {
    //db.push('/users/1/name', this.state.name);
    // db.push('/users/1/theme', this.state.theme);
    //db.push('/users/1/teams', this.state.teams);
    //this.state.teams.forEach(team => {
    //   db.push('/teams/', team);
    //  });
  }

  handleCancel() {
    console.dir(`cancel`);
    this.setState({ name: '', teams: [], theme: '' });
  }

  render() {
    const { classes } = this.props;

    return (
      <div align={'left'}>
        <Typography variant={'h4'}>Settings</Typography>
        <br />
        <br />
        <form id={'settings_form'}>
          <TextField
            variant={'outlined'}
            label={'Name'}
            onChange={this.handleNameChange.bind(this)}
          />
          <br />
          <br />
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
              variant={'outlined'}
              onClick={this.handleCancel}>
              Cancel
            </Button>
          </span>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
