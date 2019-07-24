import React from 'react';
import {
  withStyles,
  Typography,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  Paper
} from '@material-ui/core';
import { styles } from '../../styles/styles';

const ProjectIntegrationsQuestions = () => {
  const [state, setState] = React.useState({
    announcements: false,
    assessments: false,
    baseNav: false,
    calendar: false,
    contentExchange: false,
    courseConversion: false,
    discussions: false,
    documents: false,
    editor: false,
    files: false,
    goals: false,
    gradebook: false,
    groups: false,
    LTI: false,
    notifications: false,
    telemetry: false
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <Paper style={{ padding: 30 }}>
      <Typography variant={'subtitle1'} gutterBottom>
        Select any existing areas of the application that this project will
        either directly or indirectly use.
      </Typography>
      <FormControl component='fieldset'>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={state.announcements}
                onChange={handleChange('announcements')}
                value='announcements'
              />
            }
            label='Announcements'
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.assessments}
                onChange={handleChange('assessments')}
                value='assessments'
              />
            }
            label='Assessments'
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.baseNav}
                onChange={handleChange('baseNav')}
                value='baseNav'
              />
            }
            label='Base Navigation'
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.calendar}
                onChange={handleChange('calendar')}
                value='calendar'
              />
            }
            label='Course Calendar'
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.contentExchange}
                onChange={handleChange('contentExchange')}
                value='contentExchange'
              />
            }
            label='Content Exchange'
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.courseConversion}
                onChange={handleChange('courseConversion')}
                value='courseConversion'
              />
            }
            label='Course Conversion'
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.discussions}
                onChange={handleChange('discussions')}
                value='discussions'
              />
            }
            label='Discussions'
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.documents}
                onChange={handleChange('documents')}
                value='documents'
              />
            }
            label='Documents'
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.editor}
                onChange={handleChange('editor')}
                value='editor'
              />
            }
            label='Rich Text Editor'
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.files}
                onChange={handleChange('files')}
                value='files'
              />
            }
            label='Files'
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.goals}
                onChange={handleChange('goals')}
                value='goals'
              />
            }
            label='Goals'
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.gradebook}
                onChange={handleChange('gradebook')}
                value='gradebook'
              />
            }
            label='Gradebook'
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.groups}
                onChange={handleChange('groups')}
                value='groups'
              />
            }
            label='Groups'
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.LTI}
                onChange={handleChange('LTI')}
                value='LTI'
              />
            }
            label='LTI'
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.notifications}
                onChange={handleChange('notifications')}
                value='notifications'
              />
            }
            label='Notifications'
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.telemetry}
                onChange={handleChange('telemetry')}
                value='telemetry'
              />
            }
            label='Telemetry'
          />
        </FormGroup>
      </FormControl>
    </Paper>
  );
};

export default withStyles(styles)(ProjectIntegrationsQuestions);
