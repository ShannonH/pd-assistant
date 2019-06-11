import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

function WelcomeContent(props) {
  // If authenticated, greet the user
  if (props.isAuthenticated) {
    return (
      <div>
        <h2>Welcome, {props.user.displayName}!</h2>
        <p>Use the menu on the left to get started.</p>
        <br/>
      </div>
    );
  }

  // Not authenticated, present a sign in button
  return (
    <Button color='primary' onClick={props.authButtonMethod}>
      Click here to sign in
    </Button>
  );
}

export default function Welcome(props) {
  return (
    <Paper>
      <h1>EP Assistant</h1>
      <WelcomeContent
        isAuthenticated={props.isAuthenticated}
        user={props.user}
        authButtonMethod={props.authButtonMethod}
      />
    </Paper>
  );
}
