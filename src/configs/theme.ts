import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        background: {
            default: '#171717',
            paper: '#2E2E2E'
        },
        primary: {
            light: '#484848',
            main: '#212121',
            dark: '#000000',
            contrastText: '#fff',
        },
        secondary: {
            light: '#60ad5e',
            main: '#2e7d32',
            dark: '#005005',
            contrastText: '#fff'
        },
        type: 'dark'
    },
    typography: {
        fontFamily: 'Abel, Roboto, sans-serif'
    }
});