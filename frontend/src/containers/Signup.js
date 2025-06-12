import React, { useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup, isAuthenticated } from '../actions/auth';
import { useForm } from 'react-hook-form';
import Layout from "../hocs/Layout";
import { 
    Container, 
    FormWrap, 
    FormContent, 
    FormLabel,
    FormInput,
    Form, 
    FormH1, 
    FullButton,
    Text,
    FormH5,
    FormTextWrap
} from '../components/Auth/AuthElements';

const Signup = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false)
    
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        client: false,
        freelancer: true,
        status: '',
        password: '',
        re_password: ''
    });

    const { first_name, last_name, username, email, client, freelancer, status, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(first_name, last_name, username, email, client, freelancer, status, password, re_password);
            setAccountCreated(true);
        }
    };

    // Redirect
    if (isAuthenticated) {
        return <Navigate to='/stall' />
    }

    if (accountCreated) {
        return <Navigate to='/login' />
    }

    return (
        <>
            <Layout>
                <Container>
                    <FormWrap>
                        <FormContent>
                            <Form onSubmit={e => onSubmit(e)}>                       
                                <FormH1>Create a new Account</FormH1>

                                <FormInput type="hidden" name="freelancer" value={freelancer} />
                                <FormInput type="hidden" name="client" value={client} />

                                <FormLabel htmlFor="for">First Name</FormLabel>
                                <FormInput type="text" placeholder="e.g John" name="first_name" value={first_name}
                                    onChange={e => onChange(e)} required 
                                />

                                <FormLabel htmlFor="for">Last Name</FormLabel>
                                <FormInput type="text" placeholder="e.g Doe" name="last_name" value={last_name}
                                    onChange={e => onChange(e)} required 
                                />
                                
                                <FormLabel htmlFor="for">Email</FormLabel>
                                <FormInput type="email" placeholder="Email" name="email" value={email}
                                    onChange={e => onChange(e)} required 
                                />

                                <FormLabel htmlFor="for">Password</FormLabel>
                                <FormInput type="password" placeholder="Password" name="password" value={password}
                                    onChange={e => onChange(e)} minLength="6" required
                                />

                                <FormLabel htmlFor="for">Confirm Password</FormLabel>
                                <FormInput type="password" placeholder="Confirm Password" name="re_password" value={re_password}
                                    onChange={e => onChange(e)} minLength="8" required
                                />

                                <FullButton type="submit">Register</FullButton>
                                
                                <FormTextWrap>
                                    <FormH5>Already have an Account?</FormH5>
                                    <Text to='/login'><p>Go to Login</p></Text>
                                </FormTextWrap>
                            </Form>
                        </FormContent>
                    </FormWrap>
                </Container>
            </Layout>
        </>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);