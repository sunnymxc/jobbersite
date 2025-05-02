import React, { useState } from 'react';
import { 
    HeroContainer, 
    HeroBg, 
    VideoBg, 
    HeroContent, 
    HeroH1, 
    HeroP, 
    HeroBtnWrapper,
    ArrowForward,
    ArrowRight
} from './HeroElements';
import Video from '../../assets/videos/video.mp4';
import { Button } from '../ButtonElements';

const HeroSection = () => {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover)
    }

    return (
    <>
        <HeroContainer>
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
            </HeroBg>
            <HeroContent>         
                <HeroH1>
                    Find Your Next Job
                </HeroH1>
                <HeroP>
                    Super Charge Your Career
                </HeroP>
                <HeroBtnWrapper>
                    <Button 
                        to="/signup"
                        onMouseEnter={onHover}
                        onMouseLeave={onHover}
                        primary="true"
                        dark="true"
                    >
                        Get Started {hover ? <ArrowForward  /> : <ArrowRight />}
                    </Button>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    </>
    )
}

export default HeroSection;