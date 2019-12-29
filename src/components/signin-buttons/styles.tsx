import { withStyles, Button } from "@material-ui/core";

export const RoyalBlueButton = withStyles(theme => ({
    root: {
        color: '#fff',
        background: 'linear-gradient(#4e69a2, #3b5998 50%);',
        '&:hover': {
            backgroundColor: '#4267b2',
        },
    },
}))(Button);

export const BlackButton = withStyles(theme => ({
    root: {
        color: '#fff',
        background: '#24292e',
        '&:hover': {
            backgroundColor: '#383d42',
        }
    },
}))(Button);

export const WhiteButton = withStyles(theme => ({
    root: {
        color: '#000',
        background: '#f0f0f0',
        '&:hover': {
            backgroundColor: '#d2d2d2',
        },
        '& img': {
            maxWidth: 20,
            marginRight: 18
        }
    },
}))(Button);