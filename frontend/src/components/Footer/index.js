import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';
import { 
    FooterContainer, 
    FooterWrap, 
    FooterLinksContainer, 
    FooterLinksWrapper,
    FooterLinkItems,
    FooterLinkTitle,
    FooterLink, 
    SocialMedia,
    SocialMediaWrap,
    SocialLogo,
    WebsiteRights,
    SocialIcons,
    SocialIconLink,
} from './FooterElements';

const Footer = () => {
    const toggleHome = () => {
        scroll.scrollToTop();
    }

    return (
        <>
            <FooterContainer>
                <FooterWrap>
                    <FooterLinksContainer>
                        <FooterLinksWrapper>
                            <FooterLinkItems>
                                <FooterLinkTitle>JOIN US</FooterLinkTitle>
                                <FooterLink to='/login'>Client</FooterLink>
                                <FooterLink to='/card'>Freelancer</FooterLink>
                                <FooterLink to=''>Login</FooterLink>
                                <FooterLink to=''>Register</FooterLink>
                            </FooterLinkItems>
                            <FooterLinkItems>
                                <FooterLinkTitle>TERMS OF SERVICE</FooterLinkTitle>
                                <FooterLink to='/login'>Docs</FooterLink>
                                <FooterLink to='/card'>T & Cs</FooterLink>
                                <FooterLink to='/login'>File an Appeal</FooterLink>
                                <FooterLink to='/login'>Services</FooterLink>
                                <FooterLink to='/login'>FAQs</FooterLink>
                            </FooterLinkItems>
                        </FooterLinksWrapper>
                        <FooterLinksWrapper>
                            <FooterLinkItems>
                                <FooterLinkTitle>BUSINESSES</FooterLinkTitle>
                                <FooterLink to='/login'>Jobs</FooterLink>
                                <FooterLink to='/card'>Business Cards</FooterLink>
                                <FooterLink to='/login'>Terms of Service</FooterLink>
                                <FooterLink to='/login'>Services</FooterLink>
                                <FooterLink to='/login'>FAQs</FooterLink>
                            </FooterLinkItems>
                            <FooterLinkItems>
                                <FooterLinkTitle>SOCIAL MEDIA</FooterLinkTitle>
                                <FooterLink to='/card'>Facebook</FooterLink>
                                <FooterLink to='/login'>Twitter</FooterLink>
                            </FooterLinkItems>
                        </FooterLinksWrapper>
                    </FooterLinksContainer>
                    <SocialMedia>
                        <SocialMediaWrap>
                            <SocialLogo to='/' onClick={toggleHome}>
                                BUSHMARKT
                            </SocialLogo>
                            <WebsiteRights>BushMarkt © {new Date().getFullYear()} All rights reserved</WebsiteRights>
                            <SocialIcons>
                                <SocialIconLink href="/" target="_blank"
                                    aria-label="Facebook"
                                >
                                    <FaFacebook />
                                </SocialIconLink>
                                <SocialIconLink href="//www.twitter.com/" target="_blank"
                                    aria-label="Twitter"
                                >
                                    <FaTwitter />
                                </SocialIconLink>
                            </SocialIcons>
                        </SocialMediaWrap>
                    </SocialMedia>
                </FooterWrap>
            </FooterContainer>
        </>
    )
} 

export default Footer