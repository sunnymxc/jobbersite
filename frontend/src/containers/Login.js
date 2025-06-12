import React, { useState } from "react";
import {  Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { useForm } from 'react-hook-form';
import { Loader } from '../components/Loader';
import { 
    Container, 
    FormWrap, 
    FormContent, 
    FormError,
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


const Login = ({ login, isAuthenticated }) => {
    const { handleSubmit, register, formState: { errors } } = useForm();

    const onSubmit = values => {
        login(values.email, values.password);
    };

    // Is the user is Authenticated
    // Redirect
    if (isAuthenticated) {
        return <Navigate to='/stall' />
    }

    return (
        <>
            <Layout>
                <Container>
                    <FormWrap>
                        <FormContent>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <FormH1>Sign into your Account</FormH1>

                                <FormLabel htmlFor="for">Email</FormLabel>
                                <FormInput type="email" 
                                    {...register("email", {
                                            required: "Required",
                                            pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "invalid email address"
                                        }
                                    })}
                                />
                                <FormError>{errors.email && errors.email.message}</FormError>

                                <FormLabel htmlFor="for">Password</FormLabel>
                                <FormInput type="password" 
                                    {...register("password", {
                                            required: "Required",
                                            pattern: {
                                            value: /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                                            message: "Password requirements: 8-20 characters, 1 number, 1 letter"
                                        }
                                    })}
                                />
                                <FormError>{errors.password && errors.password.message}</FormError>
                                
                                <FullButton type="submit">Continue</FullButton>
                                
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);