import React, { useState, useEffect, useRef } from 'react';
import {  Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from '../hocs/Layout';
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

const Profile = ({ isAuthenticated }) => {
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

    if (isAuthenticated) {
       
        return(
            <>
                <Layout>
                    <Container>
                        <Wrap docref={docref}>
                            <Content>
                                <Main>
                                    <MainH1>
                                        PROFILE {doc.ref}
                                    </MainH1>
                                    <Text>
                                        Headline
                                    </Text>
                                    <Text>
                                        Overview
                                    </Text>
                                    <Text>
                                        Review
                                    </Text>
                                    <Text>
                                        Portfolio
                                    </Text>
                                    <Text>
                                        Employment History
                                    </Text>
                                    <Text>
                                        Certification
                                    </Text>
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
                        </Wrap>
                    </Container>
                </Layout>
            </>
        )  
    
    } else {
        return <Navigate to='/login' />
    }
    
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Profile);