import { createMuiTheme } from '@material-ui/core/styles/index';

export const light = createMuiTheme({
  id: 0,
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: '#262626'
    },
    secondary: {
      main: '#cdcdcd'
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
      main: '#cdcdcd'
    },
    secondary: {
      main: '#5e5b5b'
    },
    error: {
      main: '#bb002f',
      light: '#f9fbe7'
    }
  }
});
