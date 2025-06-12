import styled from 'styled-components';
import { Link as LinkS } from 'react-scroll';
import {FaTimes} from 'react-icons/fa';

export const Main = styled.div`
    background: #f0f0f0;
`;

export const DropdownContainer = styled.div`
    width: 10.5em;
    margin: 0 auto;
`;

export const DropdownMenu = styled.div`
`;

export const DropdownHeader = styled.div`
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin-top: 1.7em;
    margin-bottom: 0.8em;
    padding: 10px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
    font-weight: 500;
    font-size: 14px;
    color: #3faffa;
    background: #ffffff;
    cursor: pointer;
`;

export const DropdownList = styled.ul`
    padding: 0;
    margin: 0;
    background: #ffffff;
    border: 2px solid #e5e5e5;
    box-sizing: border-box;
    color: #3faffa;
    font-size: 14px;
    font-weight: 500;
    list-style-type: none;
    
    &:first-child {
        padding-top: 0.8em;
    }
`;

export const ListItem = styled.li`
    list-style: none;
    margin-bottom: 0.8em;
    color: black;
    cursor: pointer
`;