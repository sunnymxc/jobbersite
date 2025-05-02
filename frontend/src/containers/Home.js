import React from 'react';

import Layout from '../hocs/Layout';
import HeroSection from '../components/HeroSection';
import InfoSection from '../components/InfoSection';
import { homeObjOne, homeObjTwo, homeObjThree } from '../components/InfoSection/Data';

const Home = () => {
    return (       
        <>
            <Layout>
                <HeroSection />
                <InfoSection {...homeObjOne} />
                <InfoSection {...homeObjTwo} />
                <InfoSection {...homeObjThree} />
            </Layout>
        </>
    );
};

export default Home;