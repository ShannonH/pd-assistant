import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import { styles } from '../../styles/styles';

function ProjectDetails(props) {
  return (
    <div>
      <Typography
        variant={'h6'}
        gutterBottom
        color={'secondary'}
        style={{ padding: 20 }}>
        Project Name: {props.name}
      </Typography>
      <Typography
        variant={'subtitle1'}
        style={{ paddingLeft: 40, paddingRight: 40, paddingBottom: 30 }}>
        <b>DP Link:</b> {props.dpLink}
        <br />
        <b> Description: </b>
        {props.description}
      </Typography>
    </div>
  );
}

export default withStyles(styles)(ProjectDetails);
