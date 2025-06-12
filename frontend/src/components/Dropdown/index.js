import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { logout, load_user } from '../../actions/auth';
import { 
    Main,
    DropdownContainer,
    DropdownMenu,
    DropdownHeader,
    DropdownList,
    ListItem,
} from './DropElements';

const Dropdown = ({ logout, load_user }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);


    return (
        <>
            <Main>
                <DropdownContainer>
                    <DropdownHeader onClick={toggleMenu}>
                        Hi, 
                        
                    </DropdownHeader>
                    {isOpen && (
                        <DropdownMenu>
                            <DropdownList>
                                <ListItem>Profile</ListItem>
                                <ListItem>Find Work</ListItem>
                                <ListItem>Settings</ListItem>
                                <ListItem>Proposals</ListItem>
                                <ListItem>Contracts</ListItem>
                                <ListItem to={logout}>Log Out</ListItem>
                            </DropdownList>
                        </DropdownMenu>
                    )}
                </DropdownContainer>
            </Main>
        </>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default  connect(mapStateToProps, { logout, load_user })(Dropdown);