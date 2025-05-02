import React from 'react';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';
import { 
    FooterContainer, 
    FooterWrap, 
    FooterLinksContainer, 
    FooterLinksWrapper,
    FooterLinkItems,
    FooterLinkTitle,
    FooterLink, 
    FooterInput,
    SocialMedia,
    SocialMediaWrap,
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
                                <FooterLinkTitle>SUBSCRIBE TO GET THE GIST FOR LATEST JOBS</FooterLinkTitle>
                                <FooterLink>
                                    <FooterInput placeholder="example.com"></FooterInput>
                                </FooterLink>
                                <FooterLink>RECRUITERS LOGIN</FooterLink>
                            </FooterLinkItems>
                            {/*<FooterLinkItems>
                                <FooterLinkTitle>TERMS OF SERVICE</FooterLinkTitle>
                                <FooterLink to='/card'>T & Cs</FooterLink>
                                <FooterLink to='/login'>File an Appeal</FooterLink>
                                <FooterLink to='/login'>Services</FooterLink>
                                <FooterLink to='/login'>FAQs</FooterLink>
                            </FooterLinkItems>
                        </FooterLinksWrapper>
                        <FooterLinksWrapper>
                            <FooterLinkItems>
                                <FooterLinkTitle>BUSINESSES</FooterLinkTitle>
                                <FooterLink to='/login'>Academy</FooterLink>
                                <FooterLink to='/card'>Property Catalogue</FooterLink>
                                <FooterLink to='/login'>Investment</FooterLink>
                                <FooterLink to='/login'>Careers</FooterLink>
                            </FooterLinkItems>
                            <FooterLinkItems>
                                <FooterLinkTitle>SOCIAL MEDIA</FooterLinkTitle>
                                <FooterLink to='/card'>Facebook</FooterLink>
                                <FooterLink to='/login'>Twitter</FooterLink>
                                <FooterLink to='/login'>Instagram</FooterLink>
                            </FooterLinkItems> */}
                        </FooterLinksWrapper>
                    </FooterLinksContainer>
                    <SocialMedia>
                        <SocialMediaWrap>
                            <WebsiteRights>MYJOBWISE.com © {new Date().getFullYear()} All rights reserved</WebsiteRights>
                            <SocialIcons>
                                <SocialIconLink href="/" target="_blank"
                                    aria-label="Whatsapp"
                                >  
                                    <FaWhatsapp />
                                </SocialIconLink>
                                <SocialIconLink href="//www.twitter.com/" target="_blank"
                                    aria-label="Telegram"
                                >  
                                    <FaTelegram />
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