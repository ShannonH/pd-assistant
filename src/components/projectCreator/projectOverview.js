import React from 'react';
import { TextField } from '@material-ui/core';

function ProjectOverview(props) {
  return (
    <div>
      <TextField
        label={'Project Name'}
        variant={'outlined'}
        color={'secondary'}
        name={'projectName'}
        value={props.projectName}
        onChange={props.onChange}
        style={{ width: 300 }}
      />
      <br />
      <br />
      <TextField
        label={'DP Number'}
        variant={'outlined'}
        color={'secondary'}
        name={'projectDpLink'}
        value={props.projectDpLink}
        onChange={props.onChange}
      />
      <br />
      <br />
      <TextField
        label={'Project Description'}
        variant={'outlined'}
        color={'secondary'}
        fullWidth
        multiline
        rows={4}
        rowsMax={10}
        name={'projectDescription'}
        value={props.projectDescription}
        onChange={props.onChange}
      />
      <br />
    </div>
  );
}

export default ProjectOverview;
