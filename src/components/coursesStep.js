import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles/index';
import { styles } from '../styles/styles';
import Radio from '@material-ui/core/es/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';

function CourseNameTextField(props) {
  return (
    <TextField
      style={{ width: 500 }}
      value={props.courseName}
      name={'courseName'}
      variant={'outlined'}
      label={'Course Name'}
      onChange={props.onChange}
    />
  );
}

function CourseIdTextField(props) {
  return (
    <TextField
      style={{ width: 500 }}
      value={props.courseId}
      variant={'outlined'}
      label={'Course Id'}
      name={'courseId'}
      onChange={props.onChange}
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
      value={props.courseDesc}
      name={'courseDesc'}
      rows={5}
      onChange={props.onChange}
    />
  );
}

function CourseTypeRadios(props) {
  return (
    <RadioGroup
      row
      name={'type'}
      value={props.type}
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
      value={props.available}
      onChange={props.onChange}>
      <FormControlLabel
        label={'Available'}
        value={'available'}
        control={<Radio />}
      />
      <FormControlLabel
        label={'Unavailable'}
        value={'unavailable'}
        control={<Radio />}
      />
    </RadioGroup>
  );
}

function AllTheSteps(props) {
  return (
    <div>
      <CourseNameTextField
        courseName={props.courseName}
        onChange={props.onChange}
      />
      <br />
      <br />
      <CourseIdTextField courseId={props.courseId} onChange={props.onChange} />
      <br />
      <br />
      <CourseDescTextField
        courseDesc={props.courseDesc}
        onChange={props.onChange}
      />
      <br />
      <br />
      <CourseTypeRadios type={props.type} onChange={props.onChange} />
      <br />
      <br />
      <CourseAvailableRadios
        available={props.available}
        onChange={props.onChange}
      />
      <br />
    </div>
  );
}

const CourseSteps = withStyles(styles)(AllTheSteps);

export { CourseSteps };
