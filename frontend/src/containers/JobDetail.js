import React, {useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Layout from '../hocs/Layout';
import {
    Container, 
    Wrap, 
    Main,
    Header,
    Content,
    Input, 
    Icon,
    MainH1,
    Href,
    Text,
    CardGroup,
    Card,
    InfoGroup,
    Info
} from '../components/PageElements';

const Contact = () => {
    const [job, setJob] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const jobref = useRef(null);

    const getData = async () => {
        const jobResponse = await fetch('/api/jobs/:id')
        const jobData = await jobResponse.json()
        setJob(jobData)
    }

    return (
        <>
            <Layout>
                <Container>
                    <Wrap jobref={jobref}>
                        <Content>
                            <Main>
                                <Header>
                                    <Input type="text" placeholder="Search by Job Ticket Id" />
                                    <span>Filter</span>
                                </Header>
                                <MainH1>
                                    JOB LISTS {job.ref}
                                </MainH1>
                                <CardGroup ref={jobref}>
                                    {job && job.map(e => (
                                        <Card>
                                            <Href to='/jobs/{e.id}'>
                                                {e.title}
                                            </Href>
                                            <InfoGroup>
                                                <Info>
                                                    
                                                </Info>
                                                <Info>
                                                    ${e.fee}
                                                </Info>
                                            </InfoGroup>
                                            <Text>
                                                {e.desc.length > 250 ? `${e.desc.substring(0, 250)}...`: e.desc}
                                            </Text>
                                        </Card> 
                                    ))}
                                </CardGroup>                         
                            </Main>
                        </Content>        
                    </Wrap>
                </Container>
            </Layout>
        </>       
    );
}

export default Contact;