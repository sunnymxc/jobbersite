import React from 'react';

import Layout from '../hocs/Layout';
import HeroSection from '../components/HeroSection';
import InfoSection from '../components/InfoSection';
import Services from '../components/Services';
import { homeObjOne, homeObjTwo, homeObjThree } from '../components/InfoSection/Data';

const Home = () => {
    return (       
        <>
            <Layout>
                <HeroSection />
                <InfoSection {...homeObjOne} />
                <InfoSection {...homeObjTwo} />
                <Services />
                <InfoSection {...homeObjThree} />
            </Layout>
        </>
    );
};

export default Home;