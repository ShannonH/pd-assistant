import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function TeamDialog(props) {
  return (
    <div>
      <Dialog open={props.open}>
        <DialogContent>
          <DialogContentText style={{ paddingTop: 20, paddingBottom: 20 }}>
            Add another team to your profile by entering the team name below:
          </DialogContentText>
          <TextField
            id='name'
            name={'newTeam'}
            label='Team Name'
            fullWidth
            onChange={props.onInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancel} color={'primary'}>
            Cancel
          </Button>
          <Button onClick={props.onAdd} color='secondary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
