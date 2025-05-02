import React from 'react';

import Docs from '../components/docs/DocsList';
import Properties from '../components/properties/PropertiesList';

const List = ({ children, }) => {
    const location = window.location.pathname;



    switch (location) {
        case '/docs':
            return <Docs />;
        case '/properties':
           return <Properties />;                                                                         
    }
};

export default List;