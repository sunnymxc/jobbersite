import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';

import Navbar from '../components/Navbar';
import Sidebar from "../components/Sidebar";
import Footer from '../components/Footer';

const Layout = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    }
    
    useEffect(() => {
        props.checkAuthenticated();
        props.load_user();
    }, [props]);

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            { props.children }
            <Footer />
        </>
    );
}

export default connect(null, { checkAuthenticated, load_user })(Layout); 