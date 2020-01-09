import React, { Fragment } from 'react';
import { Typography, Container } from '@material-ui/core';
import { WhiteSection, LogoProgramAcad, CenterSection, SectionText } from './styles';
import { Section } from './sections';
import { useDocumentTitle } from '../../components/hooks';

export interface HomeScreenProps {
    title?: string
}

const HomeScreen = ({ title }: HomeScreenProps) => {
    useDocumentTitle(title);

    return (
        <Fragment>
            <WhiteSection>
                <CenterSection>
                    <Typography variant="h3" color="primary">A sua plataforma de desenvolvimento de algoritmos na Web</Typography>
                    <LogoProgramAcad />
                </CenterSection>
            </WhiteSection>

            <Section title="O que é a Program.Acad?" endImage={<LogoProgramAcad />}>
                <SectionText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in commodo mi, et condimentum lorem. Vivamus in justo sed odio placerat feugiat.</SectionText>
                <SectionText>Proin fringilla in tellus a consectetur. Proin quis purus gravida, mollis eros at, imperdiet nunc. Aliquam massa est, tempor in mi ut, posuere luctus elit.</SectionText>
            </Section>

            <Section title="Como funciona?" align="right" startImage={<LogoProgramAcad />}>
                <SectionText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in commodo mi, et condimentum lorem. Vivamus in justo sed odio placerat feugiat.</SectionText>
                <SectionText>Proin fringilla in tellus a consectetur. Proin quis purus gravida, mollis eros at, imperdiet nunc. Aliquam massa est, tempor in mi ut, posuere luctus elit.</SectionText>
            </Section>

            <Section title="Como começar" align="center">
                <Container>
                    <SectionText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in commodo mi, et condimentum lorem. Vivamus in justo sed odio placerat feugiat.</SectionText>
                </Container>
            </Section>
        </Fragment>
    );
}

export default HomeScreen;