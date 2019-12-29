import React from 'react';
import { CenterSection, SectionTitle, SectionText, LogoProgramAcad } from '../styles';
import { Container } from '@material-ui/core';

type SectionProps = { title: string, startImage?: React.ReactNode, endImage?: React.ReactNode, align?: "left" | "right" | "center" }

export const Section = ({ children, align = "left", title, startImage, endImage }: React.PropsWithChildren<SectionProps>) => {
    return (
        <CenterSection>
            {startImage}
            <Container style={{ textAlign: align }}>
                <SectionTitle variant="h4" align={align}>{title}</SectionTitle>
                {children}
            </Container>
            {endImage}
        </CenterSection>
    );
}