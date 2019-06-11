import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';

export default function ErrorMessage(props) {
  const [open, setOpen] = React.useState(false);

  function handleClose() {
    setOpen(false);
  }

  let debug = null;
  if (this.props.debug) {
    debug = (
      <pre className='alert-pre border bg-light p-2'>
        <code>{this.props.debug}</code>
      </pre>
    );
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <p className='mb-3'>{this.props.message}</p>
            {debug}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
