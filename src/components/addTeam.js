import React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';

export default function TeamDialog(props) {
  return (
    <div>
      <Dialog open={props.open}>
        <DialogContent>
          <DialogContentText style={{ paddingTop: 20, paddingBottom: 20 }}>
            Add a team to your profile by entering the team name below:
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
