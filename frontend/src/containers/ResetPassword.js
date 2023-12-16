import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth';
import { 
    Container,
    FormWrap,
    Icon,
    Form,
    FormH1,
    FormH5,
    FormInput, 
    FormContent,
    FullButton,
    Text,
    FormTextWrap
} from "../components/Auth/AuthElements";

const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        reset_password(email);
        setRequestSent(true);
    };

    // Redirect
    if (requestSent) {
        return <Navigate to='/' />
    };

    return (
        <>
            <Container>
                <FormWrap>
                    <Icon to="/">BushMarkt</Icon>
                    <FormContent>
                        <Form onSubmit={e => onSubmit(e)}>
                            <FormH1>Request Password Reset</FormH1>
                            <div>
                                <FormInput 
                                    className="form-control" type="email" placeholder="Email" name="email" value={email}
                                    onChange={e => onChange(e)} required
                                />
                            </div>
                            <FullButton className="btn btn-primary" type="submit">Reset Password</FullButton>

                            <FormTextWrap>
                                <FormH5>Try another password?</FormH5>
                                <Text to="/login">Return to Login</Text>
                            </FormTextWrap>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    );
};

export default connect(null, { reset_password })(ResetPassword);