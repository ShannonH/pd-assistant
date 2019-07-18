import React, { Component } from 'react';
import { TextField } from '@material-ui/core';

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
        <TextField
          variant={'outlined'}
          name={'sourceHTML'}
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
