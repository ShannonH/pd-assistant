import React from 'react';
import { Button, Typography } from '@material-ui/core';

function WelcomeContent(props) {
  if (props.isAuthenticated) {
    return (
      <div>
        <Typography variant={'h5'} gutterBottom>
          Welcome, {props.user.displayName}!
        </Typography>
        <p>Use the menu on the left to get started.</p>
        <br />
      </div>
    );
  }

  return (
    <div>
      <Button
        variant={'outlined'}
        size={'small'}
        onClick={props.authButtonMethod}
        children={
          <img src={'../../office-365-logo.png'} alt={'Office 365 logo'} />
        }
      />
    </div>
  );
}

export default function Welcome(props) {
  return (
    <div>
      <Typography variant={'h4'} gutterBottom style={{ paddingBottom: 10 }}>
        EP Assistant
      </Typography>
      <WelcomeContent
        isAuthenticated={props.isAuthenticated}
        user={props.user}
        authButtonMethod={props.authButtonMethod}
      />
    </div>
  );
}
