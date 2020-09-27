import { Container, Typography } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import React from 'react';

export const SpacedBox = styled(Container)({
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    borderTop: '1px solid #d2d2d2'
});

const useStyles = makeStyles({
    image: {
        maxWidth: 250
    }
})

export const Logo = (props: React.PropsWithChildren<React.ImgHTMLAttributes<{}>>) => {
    const classes = useStyles();
    return <img alt="" {...props} className={[props.className, classes.image].join(' ')} />
}

export const Credits = styled(Typography)({
    fontSize: 20,
    fontWeight: 500
});