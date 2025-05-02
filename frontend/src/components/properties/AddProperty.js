import React, { useState } from 'react';
import JobDataService from '../../services/properties/PropertyService';

const AddJob = () => {
    const initialJobState = {
        user: null,
        id: null,
        title: "",
        desc: "",
        fee: "",
        duration: "",
    };

    const [job, setJob] = useState(initialJobState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setJob({...job, [name]: value});
    };

    const saveJob = () => {
        var data = {
            user: job.user,
            title: job.title,
            desc: job.desc,
            fee: job.fee,
            duration: job.duration
        };

        JobDataService.create(data)
            .then(response => {
                setJob({
                    user: response.data.id,
                    id: response.data.id,
                    title: response.data.title,
                    desc: response.data.desc,
                    fee: response.data.fee,
                    duration: response.data.duration,
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newJob = () => {
        setJob(initialJobState);
        setSubmitted(false);
    };

    return (
        <div>
            {submitted ? (
                <div>
                    <h4>You made a job post!</h4>
                    <button onClick={newJob}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="user"
                            required
                            value={job.title}
                            onChange={handleInputChange}
                            name="user"
                            hidden
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={job.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="desc"
                            required
                            value={job.description}
                            onChange={handleInputChange}
                            name="desc"
                        />
                    </div>

                    <button onClick={saveJob} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddJob;