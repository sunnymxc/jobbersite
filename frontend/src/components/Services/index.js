import React, { useState, useEffect, useRef } from 'react';
import Icon1 from '../../assets/img/computers.svg';
import Icon2 from '../../assets/img/beverages.svg';
import Icon3 from '../../assets/img/contractors.svg';
import { 
    ServicesContainer, 
    ServicesH1, 
    ServicesWrapper, 
    ServicesCard, 
    ServicesIcon, 
    ServicesH2,
    ServicesP
} from './ServicesElements';

const Services = () => {
    const [category, setCategory] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const categoryref = useRef(null);

    const getData = async () => {
        const categoryResponse = await fetch('/api/category/')
        const categoryData = await categoryResponse.json()
        setCategory(categoryData)
    }


    return (
        <>
            <ServicesContainer id="service" categoryref={categoryref}>
                <ServicesH1>Find Top Service</ServicesH1>
                <ServicesWrapper>
                    <ServicesCard>
                        <ServicesIcon src={Icon1} alt="Computers" />
                        <ServicesH2>All FreeLancers</ServicesH2>
                        <ServicesP>
                            Check out our Amazing pool of talents. We're proud
                        </ServicesP>
                    </ServicesCard>
                    {category && category.map(e => (
                        <ServicesCard>
                            <ServicesIcon src={Icon1} alt="Computers" />
                            <ServicesH2>{e.name}</ServicesH2>
                            <ServicesP>We help reduce your fees and increase your overall revenue.</ServicesP>
                        </ServicesCard>
                    ))}
                </ServicesWrapper>
            </ServicesContainer>
        </>
    )
}

export default Services