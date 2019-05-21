import React, { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import * as PropTypes from 'prop-types';

export function UseDarkModeSwitch(props) {
  const [darkMode, setDarkMode] = useState(false);
  const [setTheme] = useState(props.theme);

  const handleThemeChange = () => {
    //this needs refactored to save the choice in localStorage
    if (!darkMode) {
      setDarkMode(true);
      setTheme('dark');
    } else {
      setDarkMode(false);
      setTheme('light');
    }
  };

  return (
    <FormControlLabel
      control={
        <Switch
          onChange={handleThemeChange}
          darkMode={props.darkMode}
          color="primary"
        />
      }
      label="Dark Mode"
    />
  );
}

UseDarkModeSwitch.propTypes = { darkMode: PropTypes.bool };
