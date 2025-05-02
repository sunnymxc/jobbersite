import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FaGlobe } from 'react-icons/fa';

export const Container = styled.div`
    padding-top: 40px;
    z-index: -1;
    background: linear-gradient(
        108deg,
      #F7D2C4 0%,
        rgb(203, 209, 206) 100%
    );

    :before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%), 
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
        height: 100%;
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

    @media (max-width: 767px) { // Mobile
        flex-direction: column;
        align-items: stretch;
    }
`;

export const Main = styled.div`
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    background: whitesmoke;
    max-width: 1470px;
    height: auto;
    width: 100%;
    margin: 80px auto;
    padding: 80px 32px;
    border-radius: 4px;

    @media screen and (max-width: 1100px) {
        border-radius: 0;
        margin: 40px auto
    }
`;

export const Select = styled.select`
    margin-left: 1rem;

    @media (max-width: 767px) {
        width: 50%;
        box-sizing: border-box;
    }
`;

export const ButtonGroup = styled.div`
    margin-top: 4px;
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem;

    @media (max-width: 767px) {
        flex-direction: column; // Stack buttons on mobile
    }
`;

export const Button = styled.button`
    background-color: ${(props) => props.bgColor || '#4CAF50'};
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    font-size: 14px;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 25px;
    white-space: nowrap;

    &:hover {
        background-color: ${(props) => props.hoverBgColor || '#45a049'};
    }

    @media (max-width: 767px) {
        width: 100%;
        margin-bottom: 10px;
    }
`;

export const DropdownList = styled.ul`
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    list-style: none;
    padding: 0;
    margin: 0;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    display: ${(props) => (props.isOpen ? 'flex' : 'none')};
    flex-wrap: wrap;
    justify-content: flex-start;
    column-gap: 3px; //adjust column gap for mobile.
    max-height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
`;

export const DropdownItem = styled.li`
  cursor: pointer;
  padding: 6px 8px; /* Reduce padding for smaller screens */
  white-space: nowrap; // Ensure no text wrapping
  background-color: #e0e0e0;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 1px; /* Reduce margin for smaller screens */
  text-align: center;
  font-size: 16px; /* Reduce font size for smaller screens */
  transition: background-color 0.3s ease;

  @media (max-width: 767px) {
    padding: 4px 6px; /* Reduce padding further for smaller screens */
    margin: 1px; /* Reduce margin further for smaller screens */
    font-size: 12px; /* Reduce font size further for smaller screens */
    border-radius: 3px; //reduce border radius.
  }

  &:hover {
    background-color: #d0d0d0;
  }
`;

export const Panel = styled.div`
    margin-top: 20px;
`;

export const List = styled.ul`
    margin-top: 20px;
    cursor: pointer;
`;

export const ListItem = styled.li`
    list-style-type: none;
    line-height: 2;
    font-size: 16px;

    &.active {
        background-color: #3e8e41;
        padding-left: 6px;
    }
`;

export const CardGroup = styled.div`
    grid-column: 2; /* Place in the second column */
    grid-column-gap: 40px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;

    @media (max-width: 767px) {
        grid-column: 1;
        grid-template-columns: 1fr;
    }
`;

export const Card = styled.div`
    text-align: center;
    width: 100%;
`;

export const Featured = styled.div`
    width: 100%;
    margin-top: 40px;
`;

export const FeaturedHeader = styled.p`
    font-family: 'Stencil', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 1.2rem; 
    font-weight: bolder;

    @media (max-width: 767px) {
        font-size: 1rem;
    }
`;

export const FeaturedGroup = styled.div`

`;

export const Input = styled.input`
    padding: 8px;
    border: black;
    font-size: 12px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (max-width: 767px) {
        width: 100%;
        box-sizing: border-box;
    }
`;

export const Display = styled.div`
    display: grid;
    grid-template-columns: 15% 1fr 15%; /* Three columns: 20%, flexible, 20% */
    gap: 20px;
    margin-top: 24px;
    align-items: flex-start; /* Align items to the top */

    @media (max-width: 768px) {
        grid-template-columns: 1fr; /* Single column on mobile */
        grid-template-rows: auto auto auto; /* Stack items vertically */
    }
`;

export const Category = styled.div`
    grid-column: 1; /* Place in the first column */

    @media (max-width: 767px) {
        grid-column: 1;
    }
`;

export const StyledImage = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;

    @media (min-width: 768px) {
        width: 200px;
        height: 200px;
        margin-bottom: 0;
    }
`;

export const PageTitle = styled.div`
    font-family: 'YourElegantFont', sans-serif;
    font-size: 2.5rem;
    font-weight: 600;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
    padding: 10px 20px;
    border-bottom: 2px solid #ddd;
    text-transform: capitalize;
    letter-spacing: 1px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    background-image: linear-gradient(to right, #f0f0f0, #ffffff);
    border-radius: 5px;
`;

export const PostItem = styled.li`
    border-bottom: 1px solid #eee;
    padding: 20px;
    display: flex;
    flex-direction: column;

    &:last-child {
        border-bottom: none;
    }

    @media (min-width: 768px) {
        flex-direction: row;
        align-items: flex-start;
    }
`;

export const PostImage = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
    margin-right: 0;
    border-radius: 8px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;

    @media (min-width: 768px) {
        width: 150px;
        height: 150px;
        margin-right: 20px;
        margin-bottom: 0;
    }
`;

export const PostContent = styled.div`
    flex: 1;
`;

export const PostTitle = styled(Link)`
    margin-bottom: 10px;
    color: #333;
    text-decoration: none;  
    font-weight: bold;
    border-bottom: 2px dotted gray;


    &:hover {
        color: orange;
        border-bottom: 2px solid orange;
        background-color: lightyellow;
        padding: 2px;
    }
`;

export const PostDesc = styled.p`
  font-size: 0.9em;
  color: #666;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 0.8em; // Adjust font size for mobile
  }
`;

export const PostDate = styled.div`
    margin-top: 10px;
    font-size: 0.9em;
    color: #666;
    font-weight: bold;
`;

export const StyledGlobe = styled(FaGlobe)`
    font-size: 2rem;
`;

export const Country = styled.div`
    display: flex;
    align-items: center;
`;


export const Paginate = styled.div`
  grid-column: 2 / 3; /* Span from the start of the second column to the end of the third */
    grid-row: 2; /* Place it in the second row (below the CardGroup) */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 40px;
    padding: 10px 0;

    @media (max-width: 767px) {
        grid-column: 1; /* Span the full width on mobile */
        grid-row: 3; /* Place it below the CardGroup on mobile */
    }
`;

export const PageButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  cursor: pointer;
  border-radius: 4px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #eee;
  }
`;

export const PageNumber = styled.span`
  margin: 0 10px;
  font-weight: bold;
`;

const walkAnimation = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(15px); }
  100% { transform: translateX(0); }
`;

const legMoveAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(15deg); }
`;

const headMoveAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(5deg); }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

export const TortoiseSVG = styled.svg`
  width: 300px;
  height: 300px;

  .tortoise {
    animation: ${walkAnimation} 3s linear infinite;
    transform-origin: 50% 100%;
  }

  .leg {
    animation: ${legMoveAnimation} 1.5s linear infinite alternate;
    transform-origin: 50% 0;
  }

  .head {
    animation: ${headMoveAnimation} 2s linear infinite alternate;
    transform-origin: 50% 100%;
  }

  path, ellipse, rect, polygon {
    fill: #964B00;
  }
`;

export const FeaturedPageButton = styled.button`

`;

export const FeaturedPageNumber = styled.span`

`;

export const FeaturedPaginate = styled.div`

`;

