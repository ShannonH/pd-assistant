import { Button, Chip, Paper, Typography } from '@material-ui/core';
import {
  Assignment,
  AssignmentTurnedIn,
  Cached,
  CastForEducation,
  CompareArrows,
  DateRange,
  Dns,
  Done,
  Edit,
  FolderOpen,
  Group,
  InsertDriveFileOutlined,
  MyLocation,
  Notifications,
  QuestionAnswer,
  RecordVoiceOver,
  Spellcheck,
  Star
} from '@material-ui/icons';
import React from 'react';
import { withStyles } from '@material-ui/core';
import { SelectableChip } from '../buttons';

const styles = theme => ({
  buttonShell: {
    borderRadius: 50,
    padding: 0,
    margin: 5,
    textTransform: 'none'
  }
});

const IntegrationChips = props => {
  const { classes } = props;
  return (
    <div>
      <Paper style={{ padding: 30 }}>
        <Typography
          variant={'subtitle1'}
          gutterBottom
          style={{ marginBottom: 15 }}>
          Select any existing areas of the application that this project will
          either directly or indirectly use.
        </Typography>
      </Paper>
      {!props.selected.includes('Announcements') ? (
        <Button
          className={classes.buttonShell}
          size={'medium'}
          children={
            <Chip
              color={'secondary'}
              variant='outlined'
              deleteIcon={<Done />}
              icon={<RecordVoiceOver style={{ paddingLeft: 5 }} />}
              component={'div'}
              label={'Announcements'}
              onDelete={() => console.log('announcements')}
            />
          }
          onClick={props.selectChip('Announcements')}
        />
      ) : (
        <Button
          className={classes.buttonShell}
          size={'medium'}
          children={
            <Chip
              variant='outlined'
              icon={<RecordVoiceOver style={{ paddingLeft: 5 }} />}
              component={'div'}
              label={'Announcements'}
            />
          }
          onClick={props.deselectChip}
        />
      )}
      <SelectableChip
        label={'Assessments'}
        icon={<Assignment style={{ paddingLeft: 5 }} />}
        selected={props.Assessments}
        selectChip={props.selectChip}
      />
      <SelectableChip
        label={'Attendance'}
        icon={<AssignmentTurnedIn style={{ paddingLeft: 5 }} />}
        selected={props.Attendance}
        selectChip={props.selectChip}
      />
      <SelectableChip
        label={'Base Navigation'}
        icon={<Dns style={{ paddingLeft: 5 }} />}
        selected={props.BaseNav}
        selectChip={props.selectChip}
      />
      <SelectableChip
        label={'Calendar'}
        icon={<DateRange style={{ paddingLeft: 5 }} />}
        selected={props.Calendar}
        selectChip={props.selectChip}
      />
      <SelectableChip
        label={'Content Exchange'}
        icon={<CompareArrows style={{ paddingLeft: 5 }} />}
        selected={props.ContentExchange}
        selectChip={props.selectChip}
      />
      <SelectableChip
        label={'Course Conversion'}
        icon={<Cached style={{ paddingLeft: 5 }} />}
        selected={props.CourseConversion}
        selectChip={props.selectChip}
      />
      <SelectableChip
        label={'Discussions'}
        icon={<QuestionAnswer style={{ paddingLeft: 5 }} />}
        selected={props.Discussions}
        selectChip={props.selectChip}
      />
      <SelectableChip
        label={'Documents'}
        icon={<InsertDriveFileOutlined style={{ paddingLeft: 5 }} />}
        selected={props.Documents}
        selectChip={props.selectChip}
      />

      <SelectableChip
        label={'Text Editor'}
        icon={<Spellcheck style={{ paddingLeft: 5 }} />}
        selected={props.TextEditor}
        selectChip={props.selectChip}
      />

      <SelectableChip
        label={'Files'}
        icon={<FolderOpen style={{ paddingLeft: 5 }} />}
        selected={props.Files}
        selectChip={props.selectChip}
      />
      <SelectableChip
        label={'Goals'}
        icon={<Star style={{ paddingLeft: 5 }} />}
        selected={props.Goals}
        selectChip={props.selectChip}
      />
      <SelectableChip
        label={'Gradebook'}
        icon={<Edit style={{ paddingLeft: 5 }} />}
        selected={props.Gradebook}
        selectChip={props.selectChip}
      />
      <SelectableChip
        label={'Groups'}
        icon={<Group style={{ paddingLeft: 5 }} />}
        selected={props.Groups}
        selectChip={props.selectChip}
      />
      <SelectableChip
        label={'LTI'}
        icon={<CastForEducation style={{ paddingLeft: 5 }} />}
        selected={props.LTI}
        selectChip={props.selectChip}
      />
      <SelectableChip
        label={'Notifications'}
        icon={<Notifications style={{ paddingLeft: 5 }} />}
        selected={props.Notifications}
        selectChip={props.selectChip}
      />
      <SelectableChip
        label={'Telemetry'}
        icon={<MyLocation style={{ paddingLeft: 5 }} />}
        selected={props.Telemetry}
        selectChip={props.selectChip}
      />
    </div>
  );
};

export default withStyles(styles)(IntegrationChips);
