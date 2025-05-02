import Appreciation from '../../assets/img/appreciation-green.svg';
import CurrentMap from '../../assets/img/current-map.svg';
import Trip from '../../assets/img/trip.svg';

export const homeObjOne = {
    id: 'doc',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Learn from our Academy Styled Blog',
    headline: 'Visit our Academy to learn the necessary skills to triumph in Real Estate',
    description: 'Get access to our exclusive app that allows customers to find you without getting charged any fees.',
    buttonLabel: 'Visit Academy', 
    buttonLink: '/docs',  
    imgStart: false,
    img: Appreciation,
    alt: 'Doc', 
    dark: true,
    primary: true,
    darkText: false
}

export const homeObjTwo = {
    id: 'property',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'View our Catalogue',
    headline: 'View all Property listings',
    description: 'Get Properties at reasona',
    buttonLabel: 'View Catalogue',
    buttonLink: '/properties',  
    imgStart: true,
    img: CurrentMap,
    alt: 'Property', 
    dark: false,
    primary: false,
    darkText: true
}

export const homeObjThree = {
    id: 'invest',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Invest With Us',
    headline: 'Earn up to 25% of Stake for investing in our projects today',
    description: 'Utilize our top notch algorithm to earn investing on our Real Estate Project.',
    buttonLabel: 'Join Today',
    buttonLink: '/signup', 
    imgStart: false,
    img: Trip,
    alt: 'Invest', 
    dark: true,
    primary: true,
    darkText: false
}

