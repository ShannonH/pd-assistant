import React from 'react';
import ErrorMessage from '../components/ErrorMessage';
import Welcome from '../components/Welcome';

function Home(props) {
  let error = null;
  if (props.error) {
    error = (
      <ErrorMessage message={props.error.message} debug={props.error.debug} />
    );
  }

  return (
    <div>
      {error}
      <Welcome
        isAuthenticated={props.isAuthenticated}
        user={props.user}
        authButtonMethod={props.authButtonMethod}
      />
    </div>
  );
}

export default Home;
