import React, { useState, useEffect } from 'react';
import JobDataService from '../../services/properties/PropertyService';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Layout from '../../hocs/Layout';

import { Button2 } from '../ButtonElements';
import { BiFilterAlt } from 'react-icons/bi';
import SharedList from '../SharedList';

const PropertiesList = () => {
    const [jobs, setJobs] = useState([]);
    const [currentJob, setCurrentJob] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        retrieveJobs();
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveJobs = () => {
        JobDataService.getAll()
        .then(response => {
            setJobs(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const refreshList = () => {
        retrieveJobs();
        setCurrentJob(null);
        setCurrentIndex(-1);
    };

    const setActiveJob = (job, index) => {
        setCurrentJob(job);
        setCurrentIndex(index);
    };

    const removeAllJobs = () => {
        JobDataService.removeAll()
        .then(response => {
            console.log(response.data);
            refreshList();
        })
        .catch(e => {
            console.log(e);
        })
    };

    const findByTitle = () => {
        JobDataService.findByTitle(searchTitle)
        .then(response => {
            setJobs(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    };

    return (
        <SharedList title="Property Listings" />
    );
};

export default PropertiesList;
