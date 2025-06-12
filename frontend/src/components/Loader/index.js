import React from 'react';
import { Cogwheel, LoaderContainer } from './LoaderElements';

const JobLoader = () => {
  return (
    <LoaderContainer>
      <Cogwheel size={50} speed={1.2}>⚙️</Cogwheel>
      <Cogwheel size={60} speed={1.5}>⚙️</Cogwheel>
      <Cogwheel size={55} speed={1.8}>⚙️</Cogwheel>
    </LoaderContainer>
  );
};

export default JobLoader;