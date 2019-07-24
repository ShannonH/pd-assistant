import { TextField, MenuItem, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { styles } from '../../styles/styles';

function ProjectLinkToTeam(props) {
  return (
    <div>
      <Typography variant={'subtitle1'} gutterBottom>
        Select your team from below. If you don't see it, make sure that you've
        added it on the Teams page.
      </Typography>
      <br />
      <div>
        <TextField
          select
          style={{ width: 300 }}
          name={'teamsList'}
          onChange={props.onChange}
          value={props.selectedTeam}
          variant='outlined'
          component={'div'}>
          {props.teamsList.map(team => (
            <MenuItem
              key={team.id}
              value={team.name}
              button={false}
              component={'li'}>
              {team.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </div>
  );
}

export default withStyles(styles)(ProjectLinkToTeam);
