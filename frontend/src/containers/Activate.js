import React, { useState } from "react";
import {  Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';
import { 
    Container, 
    FormWrap, 
    FormContent, 
    Icon,
    Form, 
    FormH1, 
    FormH5,
    FormLabel, 
    FormInput, 
    FullButton,
    FormTextWrap,
    Text
} from '../components/Auth/AuthElements';
import Layout from "../hocs/Layout";


const Activate = ({ verify, match }) => {
    const [verified, setVerified] = useState(false);
    
    const verify_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token);
        setVerified(true);
    };

    // Is the user is Authenticated
    // Redirect
    if (verified) {
        return <Navigate to='/stall' />
    }

    return (
        <>
            <Layout>
                <Container>
                    <FormWrap>
                        <FormContent>
                            <Form>
                                <FormH1>Verify your Account</FormH1>

                                <FullButton onClick={verify_account} type="button">
                                    Verify
                                </FullButton>
                                
                                <FormTextWrap>
                                    <FormH5>Forgot your Password?</FormH5>
                                    <Text to="/reset-password">Reset password</Text>
                                    <FormH5>Don't have an account?</FormH5>
                                    <Text to="/signup">Go to Signup</Text>
                                </FormTextWrap>
                            </Form>
                        </FormContent>
                    </FormWrap>
                </Container>
            </Layout>
        </>
    );
};

export default connect(null, { verify })(Activate);