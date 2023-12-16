import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    Container, 
    Wrap, 
    Main,
    Header,
    Content,
    Input, 
    MainH1,
    Href,
    Text,
    CardGroup,
    Card,
    InfoGroup,
    Info
} from '../components/PageElements';

const Contact = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [doc, setDoc] = useState([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        getData()
    }, [])

    const docref = useRef(null);

    const getData = async () => {
        const docResponse = await fetch("/api/docs/")
        const docData = await docResponse.json()
        setDoc(docData)
    }

    return(
        <>
        <Navbar />
        <Container>
            <Wrap docref={docref}>
                <Content>
                    <Main>
                        <Header>
                            <Input type="text" placeholder="Search by Job Ticket Id" />
                            <span>Filter</span>
                        </Header>
                        <MainH1>
                            JOB LISTS {doc.ref}
                        </MainH1>
                        <CardGroup ref={docref}>
                            {doc && doc.map(e => (
                                <Card>
                                    <Href to='/jobs/:id'>
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
                <Footer />
            </Wrap>
        </Container>
        </>
    )  
    
}

export default Contact;