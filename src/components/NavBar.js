import { Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import AvatarButton from '@material-ui/icons/AccountCircleOutlined';
import React from 'react';

export default function AuthNavItem(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  if (props.isAuthenticated) {
    return (
      <div>
        <Button
          color={'secondary'}
          onClick={handleClick}
          children={props.user.displayName}
        />

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <MenuItem component={'li'} button={false} onClick={handleClose}>
            {props.user.displayName}
          </MenuItem>
          <MenuItem
            component={'li'}
            button={true}
            onClick={props.authButtonMethod}
            children={'Sign Out'}
          />
        </Menu>
      </div>
    );
  }

  // Not authenticated, return a sign in link
  return (
    <IconButton
      onClick={props.authButtonMethod}
      children={<AvatarButton color={'secondary'}>Sign In</AvatarButton>}
    />
  );
}
