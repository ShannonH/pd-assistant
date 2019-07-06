import React from 'react';
import { Paper, Button, Typography } from '@material-ui/core';

function WelcomeContent(props) {
  if (props.isAuthenticated) {
    return (
      <div>
        <Typography variant={'h4'} gutterBottom style={{ padding: 30 }}>
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
        color='secondary'
        onClick={props.authButtonMethod}
        style={{ marginBottom: 30 }}>
        Click here to sign in
      </Button>
      <br />
      *This will allow you to save your work.
    </div>
  );
}

export default function Welcome(props) {
  return (
    <Paper style={{ padding: 30 }}>
      <Typography variant={'h4'} gutterBottom style={{ padding: 30 }}>
        EP Assistant
      </Typography>
      <WelcomeContent
        isAuthenticated={props.isAuthenticated}
        user={props.user}
        authButtonMethod={props.authButtonMethod}
      />
    </Paper>
  );
}
