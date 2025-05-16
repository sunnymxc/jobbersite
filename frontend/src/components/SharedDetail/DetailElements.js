import styled from 'styled-components';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { FaGlobe } from 'react-icons/fa';

export const ArticleContainer = styled.article`
  max-width: 1200px;
  margin: 2rem auto;
  margin-top: 6rem;
  padding: 4rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    /* Styles for mobile devices */
    padding: 2rem; /* Adjust padding for smaller screens */
  }
`;

export const ArticleTitle = styled.h1`
  margin-top: 1rem;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem; /* Added default margin-bottom */

  @media (max-width: 768px) {
    font-size: 1.8rem; /* Smaller font size for mobile */
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;
  }
`;

export const ArticleDescription = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

export const ArticleMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  color: #888;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack meta items on mobile */
    gap: 0.5rem;
  }
`;

export const Author = styled.span``;

export const PublishedDate = styled.span``;

export const ArticleContent = styled.div`
  line-height: 1.6;
  color: #333;

  /* Styles for nested elements */
  p,
  ul,
  ol,
  blockquote {
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    margin-top: 1.75rem;
    margin-bottom: 0.75rem;
  }

  h4 {
    font-size: 1.2rem;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }

  img {
    max-width: 100%;
    display: block;
    margin: 1rem auto;
    height: auto; /* Ensure images maintain aspect ratio */
  }

  /* Responsive adjustments for nested elements */
  @media (max-width: 768px) {
    h2 {
      font-size: 1.6rem;
    }

    h3 {
      font-size: 1.3rem;
    }

    h4 {
      font-size: 1.1rem;
    }
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: #888;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: red;
`;

export const NotFoundMessage = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: #888;
`;

export const StyledCircleArrow = styled(IoArrowBackCircleOutline)`
  font-size: 3rem;
  cursor: pointer;
  color: #007bff; /* Added a color for better visibility */

  &:hover {
    /* Added hover effect for better UX */
    opacity: 0.8;
    transform: scale(1.1); /* Slightly larger on hover */
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const StyledGlobe = styled(FaGlobe)`
  font-size: 3rem;
  color: #007bff;
`;
