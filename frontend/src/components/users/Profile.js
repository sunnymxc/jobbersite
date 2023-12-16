import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileDataService from "../../services/users/PointService";

const Job = (props, { isAuthenticated }) => {
  const { user_id }= useParams();
  let navigate = useNavigate();

  const initialofileState = {
    id: null,
    user: "",
    title: "",
    description: "",
    published: false
  };

  const [currentJob, setCurrentJob] = useState(initialJobState);
  const [message, setMessage] = useState("");

  const getJob = id => {
    JobDataService.get(id)
      .then(response => {
        setCurrentJob(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getJob(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentJob({ ...currentJob, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentJob.id,
      title: currentJob.title,
      description: currentJob.description,
      published: status
    };

    JobDataService.update(currentJob.id, data)
      .then(response => {
        setCurrentJob({ ...currentJob, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateJob = () => {
    JobDataService.update(currentJob.id, currentJob)
      .then(response => {
        console.log(response.data);
        setMessage("The job was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteJob = () => {
    JobDataService.remove(currentJob.id)
      .then(response => {
        console.log(response.data);
        navigate("/jobs/");
      })
      .catch(e => {
        console.log(e);
      });
  };

  if (isAuthenticated) {
    return (
      <div>
        {currentJob ? (
          <div className="edit-form">
            <h4>Job</h4>
            {currentJob.title}
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={currentJob.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={currentJob.desc}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentJob.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentJob.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button className="badge badge-danger mr-2" onClick={deleteJob}>
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={updateJob}
            >
              Update
            </button>
            <p>{message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Job...</p>
          </div>
        )}
      </div>
    );
  } else {
    return <Navigate to='/login' />
  }

};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Job);
