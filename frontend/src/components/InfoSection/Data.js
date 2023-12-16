import Appreciation from '../../assets/img/appreciation-green.svg';
import CurrentMap from '../../assets/img/current-map.svg';
import Trip from '../../assets/img/trip.svg';

export const homeObjOne = {
    id: 'about',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Be Yourself Here',
    headline: 'Advertise your Business and who you are with zero fees',
    description: 'Get access to our exclusive app that allows customers to find you without getting charged any fees.',
    buttonLabel: 'Let\'s Begin', 
    buttonLink: '/about',  
    imgStart: false,
    img: Appreciation,
    alt: 'About us', 
    dark: true,
    primary: true,
    darkText: false
}

export const homeObjTwo = {
    id: 'business',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Read our Docs',
    headline: 'Ease of usage',
    description: 'Learn our terms and conditions and best practices on this app.',
    buttonLabel: 'See docs here',
    buttonLink: '/docs',  
    imgStart: true,
    img: CurrentMap,
    alt: 'Documentation', 
    dark: false,
    primary: false,
    darkText: true
}

export const homeObjThree = {
    id: 'signup',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Create an account',
    headline: 'Manage your business network',
    description: 'Utilize our top notch algorithm to reach out to potential customers and land top clients',
    buttonLabel: 'Join Today',
    buttonLink: '/signup', 
    imgStart: false,
    img: Trip,
    alt: 'Signup', 
    dark: true,
    primary: true,
    darkText: false
}

