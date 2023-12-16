import React, { useState, useEffect } from 'react';
import JobDataService from '../../services/jobs/JobService';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Layout from '../../hocs/Layout';
import { 
    Container, Wrap, Main, Header, Content, Input, MainH1, Href, Text, CardGroup, Card, List,
    InfoGroup, Info, ListItem, Edict
} from '../PageElements';
import { Button2 } from '../ButtonElements';
import { BiFilterAlt } from 'react-icons/bi';

const JobsList = () => {
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
        <Layout>
            <Container>
                <Wrap>
                    <Content>
                        <Main>
                            <Header>
                                <Input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by title"
                                    value={searchTitle}
                                    onChange={onChangeSearchTitle}
                                />
                                <BiFilterAlt />
                            </Header>
                            <Button2
                                type="button"
                                onClick={findByTitle}
                            >
                                Search
                            </Button2> 
                            <CardGroup>
                                <Card>
                                    <MainH1>Jobs List</MainH1>
                            
                                    <List className="">
                                        {jobs && jobs.map((job, index) => (
                                            <ListItem
                                                className={
                                                "list-group-item " + (index === currentIndex ? "active" : "")
                                                }
                                                onClick={() => setActiveJob(job, index)}
                                                key={index}
                                            >
                                                {job.title}
                                            </ListItem>
                                        ))}
                                    </List>
                            
                                    <Button2
                                        className="m-3 btn btn-sm btn-danger"
                                        //onClick={removeAllJobs} 
                                        onClick={refreshList}
                                    >
                                        Remove All
                                    </Button2>
                                </Card>
                                <Card>
                                    {currentJob ? (
                                    <div>
                                        <Href to={"/jobs/" + currentJob.id}>
                                            {currentJob.title}  
                                        </Href>
                                        <InfoGroup>
                                            <Info>
                                                {moment(currentJob.created_at).fromNow()}
                                            </Info>
                                            <Info>
                                                ${currentJob.fee}
                                            </Info>
                                        </InfoGroup>
                                        <Text>
                                            {currentJob.desc}
                                        </Text>
                                       
                                        <Edict>
                                            <strong>Proposals:</strong> {currentJob.published ? "Published" : "Pending"}
                                            {" "}
                                        </Edict>

                                        <Link
                                            to={"/jobs/" + currentJob.id}
                                            className="badge badge-warning"
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                    ) : (
                                    <div>
                                        <br />
                                        <p>Please select a Job...</p>
                                    </div>
                                    )}
                                </Card>
                            </CardGroup>
                            
                        </Main>
                        
                    </Content>
                </Wrap>
            </Container>
        </Layout>
    );
};

export default JobsList;
