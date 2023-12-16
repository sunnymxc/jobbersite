import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { animateScroll as scroll } from 'react-scroll';
import { logout } from '../../actions/auth';
import Dropdown from '../Dropdown';
import {
  Nav, 
  NavbarContainer, 
  NavLogo, 
  MobileIcon, 
  NavMenu, 
  NavItem, 
  NavLinks,
  NavBtn,
  NavBtnLink 
} from './NavbarElements';

const Navbar = ({ logout, isAuthenticated, toggle }) => {

  const guestLinks = () => (
    <Fragment>
        <NavItem>
          <NavLinks to='signup'
            smooth={true} duration={500} spy={true} 
            exact='true' offset={-80}
          >
            Sign Up
          </NavLinks>
        </NavItem>
        <NavBtn>
          <NavBtnLink to="/login">Sign In</NavBtnLink>
        </NavBtn>
    </Fragment> 
  );

  const authLinks = () => (
    <Fragment>
      <NavItem>
        <Dropdown />
      </NavItem>
    </Fragment>
  ); 

  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true)
    } else {
      setScrollNav(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav scrollNav={scrollNav}>
            <NavbarContainer>
                <NavLogo to='/' onClick={toggleHome}>BushMarkt</NavLogo>
                <MobileIcon onClick={toggle}>
                  <FaBars />
                </MobileIcon>
                <NavMenu> 
                  { isAuthenticated ? authLinks() : guestLinks() }
                </NavMenu>
            </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  )
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {logout})(Navbar)