import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { 
  SidebarContainer,
  CloseIcon, 
  Icon, 
  SidebarWrapper,
  SidebarMenu, 
  SidebarLink,
  SideBtnWrap,
  SidebarRoute
} from './SidebarElements';

const Sidebar = ({ logout, isAuthenticated, isOpen, toggle }) => {
  const guestLinks = () => (
    <Fragment>
      <SidebarMenu>
        <SidebarLink to="/" onClick={toggle}>Find Jobs</SidebarLink>
        {/*<SidebarLink to="business" onClick={toggle}>Events</SidebarLink>*/}
      </SidebarMenu>
      {/*
      <SideBtnWrap>
        <SidebarRoute to="/login" onClick={toggle}>Sign In</SidebarRoute>
      </SideBtnWrap>
      */}
    </Fragment> 
  );

  const authLinks = () => (
    <Fragment>
      <SidebarMenu>
        <SidebarLink to="about" onClick={toggle}>Profile</SidebarLink>
        <SidebarLink to="business" onClick={toggle}>Settings</SidebarLink>
        <SidebarLink to="signup" onClick={toggle}>Proposal</SidebarLink>
        <SidebarLink to="signup" onClick={toggle}>Contracts</SidebarLink>
      </SidebarMenu>
      <SideBtnWrap>
        <SidebarRoute to="/login" onClick={logout}>Log out</SidebarRoute>
      </SideBtnWrap>
    </Fragment>
  ); 
  
  return (
    <>
      <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
          <CloseIcon />
        </Icon>
        <SidebarWrapper>
          { isAuthenticated ? authLinks() : guestLinks() }
        </SidebarWrapper>
      </SidebarContainer>
    </>
  )
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {logout})(Sidebar);