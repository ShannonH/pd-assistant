import React, { Component } from 'react';
import { TextField, Typography } from '@material-ui/core';

class UIAAssist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSource: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Typography variant={'h4'} gutterBottom align={'left'}>
          UIA Assist
        </Typography>
        <Typography variant={'subtitle1'} gutterBottom align={'left'}>
          Open the page in your browser, then right click and open the page
          source. Copy and paste the full HTML below:
        </Typography>
        <TextField
          variant={'outlined'}
          name={'pageSource'}
          label={'Paste HTML here'}
          multiline
          fullWidth
          rows={30}
          value={this.state.pageSource}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default UIAAssist;
