import Typography from '@material-ui/core/Typography';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles/index';
import { styles } from '../styles/styles';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';

function CourseNameTextField(props) {
  return (
    <span>
      <Typography variant={'subtitle1'} component={'span'} gutterBottom>
        Either keep the randomly generated values below, or customize for your
        needs.
      </Typography>
      <br />
      <br />
      <TextField
        style={{ width: 500 }}
        value={props.value}
        name={'courseName'}
        variant={'outlined'}
        label={'Course Name'}
        onChange={props.onChange}
        component={'div'}
      />
    </span>
  );
}

function CourseIdTextField(props) {
  return (
    <TextField
      style={{ width: 500 }}
      value={props.value}
      variant={'outlined'}
      label={'Course Id'}
      name={'courseId'}
      onChange={props.onChange}
      component={'div'}
    />
  );
}

function CourseDescTextField(props) {
  return (
    <TextField
      style={{ width: 500 }}
      variant={'outlined'}
      label={'Course Description'}
      multiline
      value={props.value}
      name={'courseDesc'}
      rows={5}
      onChange={props.onChange}
      component={'div'}
    />
  );
}

function CourseTypeRadios(props) {
  return (
    <RadioGroup
      row
      name={'type'}
      value={props.value}
      style={{ display: 'inline', width: '150px' }}
      onChange={props.onChange}>
      <FormControlLabel label={'Ultra'} control={<Radio />} value={'ULTRA'} />
      <FormControlLabel
        label={'Original'}
        control={<Radio />}
        value={'ORIGINAL'}
      />
      <FormControlLabel
        label={'Instructor Choice'}
        control={<Radio />}
        value={'CHOICE'}
      />
    </RadioGroup>
  );
}

function CourseAvailableRadios(props) {
  return (
    <RadioGroup
      row
      style={{ display: 'inline', width: '150px' }}
      name={'available'}
      value={props.value}
      onChange={props.onChange}>
      <FormControlLabel
        label={'Available'}
        value={'enabled'}
        control={<Radio />}
      />
      <FormControlLabel
        label={'Unavailable'}
        value={'disabled'}
        control={<Radio />}
      />
    </RadioGroup>
  );
}

function AllTheSteps(props) {
  return (
    <div>
      <CourseNameTextField value={props.courseName} onChange={props.onChange} />
      <br />
      <br />
      <CourseIdTextField value={props.courseId} onChange={props.onChange} />
      <br />
      <br />
      <CourseDescTextField value={props.courseDesc} onChange={props.onChange} />
      <br />
      <br />
      <CourseTypeRadios value={props.type} onChange={props.onChange} />
      <br />
      <br />
      <CourseAvailableRadios
        value={props.available}
        onChange={props.onChange}
      />
      <br />
      <br />
    </div>
  );
}

const CourseSteps = withStyles(styles)(AllTheSteps);

export { CourseSteps };
