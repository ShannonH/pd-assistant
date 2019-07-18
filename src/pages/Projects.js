import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId
    };
  }

  render() {
    return (
      <div>
        <Typography variant={'h4'} gutterBottom align={'left'}>
          Projects
        </Typography>
      </div>
    );
  }
}

export default Projects;
