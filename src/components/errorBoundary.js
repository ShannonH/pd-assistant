import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: null
    };
  }
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error: error,
      info: info
    });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Oops, something went wrong :(</h1>
          <div>The error: {this.state.error.toString()}</div>
          <div>Where it occurred: {this.state.info.componentStack}</div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
