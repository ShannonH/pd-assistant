import { createMuiTheme } from '@material-ui/core/styles/index';

export const light = createMuiTheme({
  id: 0,
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: '#5a9fbf',
      contrastText: '#fafafa'
    },
    secondary: {
      main: '#454545',
      contrastText: '#fafafa'
    },
    error: {
      main: '#bb002f',
      light: '#f9fbe7'
    }
  }
});

export const dark = createMuiTheme({
  id: 1,
  typography: {
    useNextVariants: true
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#616161',
      light: '#ffffff',
      dark: '#212121',
      contrastText: '#000000'
    },
    secondary: {
      main: '#42a5f5',
      light: '#80d6ff',
      dark: '#0077c2',
      contrastText: '#000000'
    },
    error: {
      main: '#bb002f',
      light: '#f9fbe7'
    }
  }
});
