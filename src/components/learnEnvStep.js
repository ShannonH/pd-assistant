import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { LEARNS } from '../data/learnEnvironments';
import Typography from '@material-ui/core/Typography';

const mappedLearns = LEARNS.map(learn => ({
  value: learn.label,
  label: learn.hostname
}));

const useStyles = makeStyles(() => ({
  container: {
    display: 'inline-block',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 500
  },
  fieldsContainer: {
    display: 'inline-block'
  }
}));

function LearnEnvironmentsSelect(props) {
  return (
    <div>
      <Typography variant={'subtitle1'} gutterBottom>
        Either select one of the test servers from the list, or choose 'Other'
        to manually enter a Learn URL and administrator credentials.
      </Typography>
      <br/>
      <div>
        <TextField
          select
          fullWidth
          name={'learnUrl'}
          onChange={props.onChange}
          value={props.learnUrl}
          variant='outlined'
          component={'div'}>
          {mappedLearns.map(option => (
            <MenuItem
              key={option.value}
              value={option.label}
              button={false}
              component={'li'}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </div>
  );
}

function CustomEnvironment(props) {
  return (
    <div hidden={props.hidden}>
      <Typography variant={'subtitle1'} gutterBottom>
        Enter the URL and administrator password for the environment you'd like
        to use.
      </Typography>
      <TextField
        name={'learnUrl'}
        fullWidth
        label={'Server URL'}
        component={'div'}
        type={'url'}
        variant={'outlined'}
        value={props.learnUrl}
        onChange={props.onChange}
      />
      <br/>
      <br/>
      <TextField
        name={'adminUsername'}
        label={'Administrator Username'}
        component={'div'}
        variant={'outlined'}
        value={props.adminUsername}
        onChange={props.onChange}
      />
      <br/>
      <br/>
      <TextField
        name={'adminPassword'}
        label={'Administrator Password'}
        component={'div'}
        variant={'outlined'}
        value={props.adminPassword}
        onChange={props.onChange}
      />
    </div>
  );
}

function LearnEnvStep(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <LearnEnvironmentsSelect
        learnUrl={props.learnUrl}
        onChange={props.onChange}
      />
      <br/>
      <br/>
      <CustomEnvironment
        hidden={props.hidden}
        className={classes.fieldsContainer}
        learnUrl={props.learnUrl}
        adminUsername={props.adminUsername}
        adminPassword={props.adminPassword}
        onChange={props.onChange}
        key={props.hidden}
      />
      <br/>
    </div>
  );
}

export { LearnEnvStep };
