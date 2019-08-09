import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import {
  TextField,
  Typography,
  withStyles,
  Fab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import { styles } from '../../styles/styles';

const ProjectRequirements = props => {
  return (
    <div>
      <Typography variant={'h6'} gutterBottom>
        Project Requirements
      </Typography>
      <TextField
        label={'Requirement'}
        style={{ marginBottom: 20 }}
        fullWidth
        multiline
        rows={4}
        rowsMax={20}
        variant={'outlined'}
        value={props.requirement}
        onChange={props.onChange}
        name={'requirement'}
      />
      <Fab
        size={'small'}
        onClick={props.addRequirement}
        color='secondary'
        aria-label='Add'
        children={<AddIcon />}
      />
      <div>
        <List component={'nav'}>
          {props.requirements.map(requirement => (
            <ListItem component={'span'} key={requirement}>
              <ListItemText primary={requirement} key={requirement} />
              <ListItemSecondaryAction>
                <IconButton edge='end'>
                  <DeleteIcon onClick={props.deleteRequirement} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default withStyles(styles)(ProjectRequirements);
