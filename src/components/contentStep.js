import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const counter = [
  {
    value: 0,
    label: '0'
  },
  {
    value: 1,
    label: '1'
  },
  {
    value: 2,
    label: '2'
  },
  {
    value: 3,
    label: '3'
  },
  {
    value: 4,
    label: '4'
  },
  {
    value: 5,
    label: '5'
  },
  {
    value: 6,
    label: '6'
  },
  {
    value: 7,
    label: '7'
  },
  {
    value: 8,
    label: '8'
  },
  {
    value: 9,
    label: '9'
  },
  {
    value: 10,
    label: '10'
  }
];

const useStyles = makeStyles(theme => ({
  container: {
    display: 'inline-block',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  fieldsContainer: {
    width: 150,
    display: 'inline-block'
  }
}));

function ContentSelection(props) {
  const classes = useStyles();
  return (
    <div className={classes.fieldsContainer}>
      <TextField
        select
        fullWidth
        className={classes.textField}
        name={props.contentName}
        label={props.contentName}
        value={props.contentCount}
        onChange={props.onChange}
        variant='outlined'
        component={'div'}>
        {counter.map(option => (
          <MenuItem
            key={option.value}
            value={option.value}
            button={false}
            component={'li'}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

function ContentStep(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant={'subtitle1'} gutterBottom>
        By default, the created course is empty. Here you can choose to add one
        or many of the various content types.
        <br /> Currently this list is comprised of activities that Original and
        Ultra courses share. They have basic settings applied.
      </Typography>
      <br />
      <ContentSelection
        contentName={'testCount'}
        className={classes.textField}
        onChange={props.onChange}
        contentCount={props.testCount}
      />
      <br />
      <br />
      <ContentSelection
        className={classes.textField}
        contentName={'assignmentCount'}
        onChange={props.onChange}
        contentCount={props.assignmentCount}
      />
      <br />
      <br />
      <ContentSelection
        className={classes.textField}
        contentName={'documentCount'}
        onChange={props.onChange}
        contentCount={props.documentCount}
      />
      <br />
      <br />
      <ContentSelection
        className={classes.textField}
        contentName={'discussionCount'}
        onChange={props.onChange}
        contentCount={props.discussionCount}
      />
      <br />
      <br />
      <ContentSelection
        className={classes.textField}
        contentName={'fileCount'}
        onChange={props.onChange}
        contentCount={props.fileCount}
      />
      <br />
      <br />
    </div>
  );
}

const ContentSelect = ContentStep;

export { ContentSelect };
