import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import { Link as LinkS } from 'react-scroll';

export const Nav = styled.nav`
    background: ${({scrollNav}) => (scrollNav ? 'black' : 'transparent')};
    height: 80px;
    width: 100%;
    margin-top: -80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 2;

    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    } 
`;

export const NavbarContainer = styled.div`
    font-family: 'stencil', 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    font-size: clamp(1.5rem, -1rem + 4vw, 2rem);
`;

export const NavLogo = styled(LinkR).attrs({ // Use LinkR as the base component
  // to: '/', // Specify the route you want to link to
})`
  img { // Target the img tag within the LinkR
    width: 00px;
    height: 150px;
  }
  margin-left: -40px;

  @media (max-width: 768px) { // Adjust breakpoint as needed
    img {
      width: 200px; // Adjust width for mobile
      height: 100px; // Adjust height for mobile
    }
    margin-left: -20px; // Remove left margin for mobile
  }
`;

export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right:0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
        color: #fff;
    }
`;

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;

    
`;

export const NavItem = styled.li`
    display: flex;
    text-align: center;
    height: 80px;
`;

export const NavLinks = styled(LinkS)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    font-size: clamp(1rem, -2rem + 4vw, 1.5rem);

    @media (max-width: 767px) {
        display: none;
    }
    &.active {
        border-bottom: 3px solid #01bf71;
    }
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavBtnLink = styled(LinkR)`
   border-radius: 50px;
   background: #01bf71;
   white-space: nowrap;
   padding: 8px 32px;
   color: white;
   font-size: 16px;
   outline: none;
   border: none;
   cursor: pointer;
   transition: all 0.2s eae-in-out;
   text-decoration: none;

   &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
   }
`;