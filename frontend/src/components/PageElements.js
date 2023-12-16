import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    padding-top: 40px;
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

export const Wrap = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 400px) {
        height: 80%;
    }
`;

export const Content = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 480px) {
        padding: 10px;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Main = styled.div`
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    background: whitesmoke;
    max-width: 1300px;
    height: auto;
    width: 100%;
    display: grid;
    margin: 80px auto;
    padding: 80px 32px;
    border-radius: 4px;

    @media screen and (max-width: 1100px) {
        border-radius: 0;
        margin: 40px auto
    }
`;

export const MainH1 = styled.h1`
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bolder;
`;

export const MainH5 = styled.h5`
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: bold;
`;


export const CardGroup = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 48px;
    margin-top: 30px;
`;

export const Card = styled.div`
    //
`;

export const InfoGroup = styled.div`
    display: flex;
    margin-top: 12px;
    align-items: center;
`;

export const Info = styled.div`
    font-family: monospace;
    font-size: 12px;
    margin-right: 22px;
`;

export const List = styled.ul`
    list-style-type: none;
    line-height: 24px;
`;

export const ListItem = styled.li`
    cursor: pointer;
`;

export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: #fff;
`;

export const Edict = styled.div`
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 14px;
`;

export const Input = styled.input`
    padding: 8px;
    border: black;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    width: 40%;
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

export const MainBtnWrap = styled.div`
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    border: outline;
    border-color: white;
    border-top: 24px;
`;

export const FormTextWrap = styled.div`
    margin-top: 24px;
`;

export const Href = styled(Link)`
    margin-bottom: 40px;
    font-size: 20px;
    font-weight: bolder;
    text-decoration: none;
    color: black;

    &:hover {
      color: green;  
    }
`;

export const Text = styled.article`
    text-decoration: none;
    font-size: 16px;
    margin-top: 24px;
    line-height: 24px;
    
    &:hover {
        
    }
`;

