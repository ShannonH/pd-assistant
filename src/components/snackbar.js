import IconButton from '@material-ui/core/IconButton/index';
import Snackbar from '@material-ui/core/Snackbar/index';
import { withStyles } from '@material-ui/core/styles/index';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

let openSnackbarFn;

const styles = theme => ({
  close: {
    padding: theme.spacing / 2
  }
});

class SimpleSnackbar extends React.Component {
  state = {
    open: false,
    message: ''
  };

  openSnackbar = ({ message }) => {
    this.setState({
      open: true,
      message
    });
  };

  componentDidMount() {
    openSnackbarFn = this.openSnackbar;
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false, message: '' });
  };

  render() {
    const message = (
      <span
        id='snackbar-message-id'
        dangerouslySetInnerHTML={{ __html: this.state.message }}
      />
    );
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleClose}
          message={message}
          action={[
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

export function openSnackbar({ message }) {
  openSnackbarFn({ message });
}

export default withStyles(styles)(SimpleSnackbar);
