import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DocService from '../../services/docs/DocService';
import SharedDetail from '../SharedDetail';
import Loader from '../Loader';

const Doc = () => {
  const { slug } = useParams(); // Get the 'id' parameter from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await DocService.getPost(slug); // Fetch data using DocService with id
        setPost(response.data); // Assuming your API returns data in response.data
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]); // Update dependency array to use id

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message || String(error)}</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <SharedDetail
      post={post}
      loading={loading}
      error={error}
      handleGoBack={handleGoBack}
    />
  );
};

export default Doc;