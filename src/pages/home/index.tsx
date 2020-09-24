import { Button, Container, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDocumentTitle } from '../../components/hooks';
import { Section } from './sections';
import { CenterSection, LogoProgramAcad, SectionText, WhiteSection } from './styles';

export interface HomeScreenProps {
    title?: string
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ title }) => {
    const history = useHistory();
    useDocumentTitle(title);

    return (
        <>
            <WhiteSection>
                <CenterSection>
                    <Typography variant="h3" color="primary" style={{ display: 'flex', flex: 1 }}>A sua plataforma de desenvolvimento de algoritmos na Web</Typography>
                    <LogoProgramAcad style={{ display: 'flex', flex: 1 }} />
                </CenterSection>
            </WhiteSection>

            <Section title="O que é a Program.Acad?" endImage={<LogoProgramAcad style={{ display: 'flex', flex: 1 }} />}>
                <SectionText>A Program.Acad é um ambiente de desenvolvimento de algoritmos, que pode ser utilizado diretamente na Web!</SectionText>
                <SectionText>Você poderá participar de turmas e resolver diversos algoritmos que seu instrutor lhe passará.</SectionText>
            </Section>

            <Section title="Como funciona?" align="right" startImage={<LogoProgramAcad style={{ display: 'flex', flex: 1 }} />}>
                <SectionText>Você poderá solicitar o acesso a uma turma, que deverá ser avaliado pelo seu instrutor para que ele permita você entrar na sala.</SectionText>
                <SectionText>Após ser aceito, você terá acesso a todos os algoritmos que o instrutor disponibilizar, tente resolver todos!</SectionText>
            </Section>

            <Section title="Como começar" align="center">
                <Container>
                    <SectionText>Você pode criar uma conta agora mesmo ou acessar utilizando uma de suas redes sociais.</SectionText>
                    <Button variant="contained" color="secondary" onClick={() => history.push("/cadastro")}>Criar minha conta</Button>
                </Container>
            </Section>
        </>
    );
}