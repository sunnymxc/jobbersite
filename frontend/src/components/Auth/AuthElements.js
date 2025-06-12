import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    z-index: -1;
    background: linear-gradient(
        108deg,
        rgba(1, 147, 86, 1) 0%,
        rgba(10, 201, 122, 1) 100%
    );

    :before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        background: line180ar-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%), 
        linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 100%);
        z-index: 2;
    }

    @media screen and (max-width: 1100px) {
    }
`;

export const FormWrap = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 400px) {
        height: 80%;
    }
`;

export const Icon = styled(Link)`
    position: sticky;
    font-family: 'stencil';
    margin-left: 32px;
    margin-top: 32px;
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    font-size: 32px;
    z-index: 999;
    width: 0;

    @media screen and (max-width: 480px) {
        margin-left: 16px;
        margin-top: 8px;
    }
`;

export const FormContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 480px) {
        padding: 10px;
    }
`;

export const Form = styled.form`
    background: #010101;
    max-width: 650px;
    height: auto;
    width: 100%;
    display: grid;
    margin: 120px auto;
    padding: 120px 52px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);

    @media screen and (max-width: 1100px) {
        max-width: 1100px;
        margin: 0px auto;
    }
`;

export const FormH1 = styled.h1`
    margin-bottom: 40px;
    color: #fff;
    font-size: 24px;
    font-weight: 800;
    text-align: center;

    @media screen and (max-width: 1100px) {
        font-size: 18px;
    }
`;

export const FormH5 = styled.h5`
    margin-bottom: 4px;
    color: #fff;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
`

export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: #fff;
`;

export const FormInfo = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    font-size: 20px;
    color: #fff;
`;

export const FormInput = styled.input`
    padding: 16px;
    margin-top: 8px;
    margin-bottom: 32px;
    border: none;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const FormSelect = styled.select`
    margin-top: 16px;
    padding: 16px;
    margin-bottom: 32px;
    border: none;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const FormBtnWrap = styled.div`
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    border: outline;
    border-color: white;
    border-top: 24px;
`;

export const FormButton = styled.button`
    background: #01bf71;
    width: 72px;
    height: 45px;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
`;

export const FormError = styled.span`
    color: red;
    font-size: 12px;
    margin-top: -24px;
`;

export const FullButton = styled.button`
    background: #01bf71;
    width: 100%;
    height: 45px;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
`;

export const FormTextWrap = styled.div`
    margin-top: 24px;
`;

export const Text = styled(Link)`
    display: flex;
    justify-content: center;
    text-decoration: none;
    text-align: center;
    color: #fff;
    font-size: 12px;
    margin-top: 0px;
    margin-bottom: 16px;
    font-weight: bold;
    
    &:hover {
        color: green;
    }
`;

