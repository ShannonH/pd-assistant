import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import { styles } from '../styles/styles';
import classnames from 'classnames';
import Radio from '@material-ui/core/es/Radio';
import EditIcon from '@material-ui/icons/EditOutlined';
import FilledEditIcon from '@material-ui/icons/Edit';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import faker from 'faker';
import RadioGroup from '@material-ui/core/RadioGroup';

require('@gouch/to-title-case');

const fakerCourseId = faker.internet.password();
const fakerCourseName = faker.company.bs();
const fakerCourseDesc = faker.lorem.sentences(3);

class CoursesStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      completed: new Set(),
      skipped: new Set(),
      available: true,
      type: '',
      courseName: '',
      courseId: '',
      courseDesc: '',
      isActive: {
        customizeCourseName: false,
        customizeCourseId: false,
        customizeCourseDesc: false,
        customizeCourseType: false,
        customizeCourseAvailability: false
      }
    };
    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      activeStep: 0,
      completed: new Set(),
      skipped: new Set(),
      available: true,
      type: 'ULTRA',
      courseName: fakerCourseName.toTitleCase(),
      courseId: fakerCourseId,
      courseDesc: fakerCourseDesc,
      isActive: {
        customizeCourseName: false,
        customizeCourseId: false,
        customizeCourseDesc: false,
        customizeCourseType: false,
        customizeCourseAvailability: false
      }
    });
  }

  handleChange(event) {
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div>
          <Typography variant={'subtitle1'} gutterBottom>
            Click the pencil beside any settings you'd like to customize.
            Otherwise, this will create a course with the random data that was
            generated for you.
          </Typography>
        </div>
        <br />
        <div className={classnames(classes.chartContainer)}>
          <Checkbox
            name={'customizeCourseName'}
            icon={<EditIcon />}
            checkedIcon={<FilledEditIcon />}
            onChange={this.handleChange}
            checked={this.state.isActive.customizeCourseName}
          />
          <TextField
            disabled={this.state.isActive.customizeCourseName}
            onChange={this.handleChange}
            value={this.state.courseName}
            name={'courseName'}
            variant={'outlined'}
            label={'Course Name'}
            className={classnames(classes.shortFields)}
          />
          <br />
          <br />
          <Checkbox
            name={'customizeCourseId'}
            icon={<EditIcon />}
            checkedIcon={<FilledEditIcon />}
            onChange={this.handleChange}
          />
          <TextField
            disabled={this.state.isActive.customizeCourseId}
            onChange={this.handleChange}
            value={this.state.courseId}
            variant={'outlined'}
            label={'Course Id'}
            name={'courseId'}
            className={classnames(classes.shortFields)}
          />
          <br />
          <br />
          <Checkbox
            name={'customizeCourseDesc'}
            icon={<EditIcon />}
            checkedIcon={<FilledEditIcon />}
            onChange={this.handleChange}
          />
          <TextField
            disabled={this.state.isActive.customizeCourseDesc}
            variant={'outlined'}
            label={'Course Description'}
            multiline
            onChange={this.handleChange}
            value={this.state.courseDesc}
            name={'courseDesc'}
            rows={5}
            className={classnames(classes.shortFields)}
          />
          <br />
          <br />
          <Checkbox
            name={'customizeCourseType'}
            icon={<EditIcon />}
            checkedIcon={<FilledEditIcon />}
            onChange={this.handleChange}
          />
          <RadioGroup
            row
            name={'type'}
            value={this.state.type}
            onChange={this.handleChange}
            style={{ display: 'inline', width: '150px' }}>
            <FormControlLabel
              label={'Ultra'}
              control={
                <Radio
                  disabled={this.state.isActive.customizeCourseType}
                  value={'ULTRA'}
                />
              }
            />
            <FormControlLabel
              label={'Original'}
              control={
                <Radio
                  value={'ORIGINAL'}
                  disabled={this.state.isActive.customizeCourseType}
                />
              }
            />
            <FormControlLabel
              label={'Instructor Choice'}
              control={
                <Radio
                  value={'CHOICE'}
                  disabled={this.state.isActive.customizeCourseType}
                />
              }
            />
          </RadioGroup>
          <br />
          <br />
          <Checkbox
            name={'customizeCourseAvailability'}
            icon={<EditIcon />}
            checkedIcon={<FilledEditIcon />}
            onChange={this.handleChange}
          />
          <RadioGroup
            row
            defaultValue={this.state.available}
            style={{ display: 'inline', width: '150px' }}
            name={'available'}
            value={this.state.available}
            onChange={this.handleChange}>
            <FormControlLabel
              label={'Available'}
              control={
                <Radio
                  disabled={this.state.isActive.customizeCourseAvailability}
                  value={true}
                />
              }
            />
            <FormControlLabel
              label={'Unavailable'}
              control={
                <Radio
                  disabled={this.state.isActive.customizeCourseAvailability}
                  value={false}
                />
              }
            />
          </RadioGroup>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

CoursesStep.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CoursesStep);
