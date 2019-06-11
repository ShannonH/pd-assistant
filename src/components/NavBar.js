import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AvatarButton from '@material-ui/icons/AccountCircleOutlined';

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
        <Button onClick={handleClick}>{props.user.displayName}</Button>
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
            onClick={props.authButtonMethod}>
            Sign Out
          </MenuItem>
        </Menu>
      </div>
    );
  }

  // Not authenticated, return a sign in link
  return (
    <IconButton onClick={props.authButtonMethod}>
      <AvatarButton>Sign In</AvatarButton>
    </IconButton>
  );
}
