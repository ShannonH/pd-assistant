import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles/index';
import { styles } from '../../styles/styles';
import Typography from '@material-ui/core/Typography';

function InstructorSelect(props) {
  return (
    <span>
      <Typography variant={'subtitle1'} gutterBottom>
        The following instructor and number of random students will be enrolled
        in the course. <br />
        If you have an existing instructor, replace the randomly generated value
        with your instructor's username.
      </Typography>
      <br />
      <TextField
        variant={'outlined'}
        label={'Instructor Username'}
        value={props.instructor}
        style={{ paddingRight: 30, paddingBottom: 30 }}
        onChange={props.onChange}
        component={'div'}
      />
    </span>
  );
}

function StudentSelect(props) {
  return (
    <TextField
      name={'studentCount'}
      variant={'outlined'}
      label={'# of Students'}
      value={props.studentCount}
      style={{ width: 100, paddingBottom: 30 }}
      onChange={props.onChange}
      component={'div'}
    />
  );
}

function UserSelect(props) {
  return (
    <span>
      <InstructorSelect
        instructor={props.instructor}
        onChange={props.onChange}
      />
      <StudentSelect
        studentCount={props.studentCount}
        onChange={props.onChange}
      />
    </span>
  );
}

const UsersBlock = withStyles(styles)(UserSelect);

export { UsersBlock };
