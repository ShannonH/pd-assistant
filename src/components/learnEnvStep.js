/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react';
import * as PropTypes from 'prop-types';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { LEARNS } from '../data/learnEnvironments';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const suggestions = LEARNS.map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label
}));

const styles = theme => ({
  input: {
    display: 'flex',
    padding: 0
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  chartContainer: {
    display: 'inline-block',
    width: '60%',
    padding: 30
  },
  customEnvContainer: {
    padding: 30
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  paper: {
    position: 'absolute',
    zIndex: 2,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}>
      {props.children}
    </MenuItem>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  SingleValue,
  ValueContainer
};

class LearnEnvStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: '',
      hideCustom: true,
      learnUrl: '',
      adminPassword: '',
      showPassword: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      choice: '',
      hideCustom: true,
      learnUrl: '',
      adminPassword: '',
      showPassword: false
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChoice = name => value => {
    this.setState({
      [name]: value.value
    });
    if (value.value === 'Other') {
      this.setState({ hideCustom: false });
    } else {
      this.setState({ hideCustom: true });
    }
    console.log(this.state);
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.primary,
        '& input': {
          font: 'inherit'
        }
      })
    };

    return (
      <div>
        <NoSsr>
          <Typography variant={'subtitle1'} gutterBottom>
            Choose a test server or "Other" to manually enter a URL and
            credentials.
          </Typography>
          <div className={classes.chartContainer}>
            <Select
              classes={classes}
              styles={selectStyles}
              options={suggestions}
              components={components}
              value={this.state.choice.label}
              onChange={this.handleChoice('choice')}
            />
          </div>
          <div
            className={classes.customEnvContainer}
            hidden={this.state.hideCustom}>
            <form>
              <Typography variant={'subtitle1'} gutterBottom>
                Enter the URL and administrator password for the environment
                you'd like to use.
              </Typography>
              <br />
              <TextField
                margin="normal"
                type={'url'}
                onInput={this.handleChange}
                variant={'outlined'}
                label={'Url'}
                style={{ width: 500 }}
                name={'learnUrl'}
                value={this.state.learnUrl}
              />
              <br /> <br />
              <TextField
                type={this.state.showPassword ? 'text' : 'password'}
                margin="normal"
                onInput={this.handleChange}
                variant={'outlined'}
                label={'Admin Password'}
                name={'adminPassword'}
                value={this.state.adminPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}>
                        {this.state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </form>
          </div>
        </NoSsr>
      </div>
    );
  }
}

LearnEnvStep.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(LearnEnvStep);
