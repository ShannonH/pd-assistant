import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { LinkedAddFab } from '../components/buttons';
import ProjectTable from '../components/projectCreator/projectTable';

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
        <ProjectTable />
        <LinkedAddFab to={'/projects/new'} />
      </div>
    );
  }
}

export default Projects;
