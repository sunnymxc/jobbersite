import styled from 'styled-components';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { FaGlobe } from 'react-icons/fa';

export const ArticleContainer = styled.article`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 4rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ArticleTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;

  @media (max-width: 768px) { // Adjust breakpoint as needed
    font-size: 2rem; // Smaller font size for mobile
    margin-bottom: 0.8rem; // Adjust margin for mobile
  }
`;

export const ArticleDescription = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5rem;

  @media (max-width: 768px) { // Adjust breakpoint as needed
    font-size: 1rem; // Smaller font size for mobile
    margin-bottom: 1rem; // Adjust margin for mobile
    line-height: 1.6; // Improved readability for mobile
  }
`;

export const ArticleMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  color: #888;
  font-size: 0.9rem;
`;

export const Author = styled.span``;

export const PublishedDate = styled.span``;

export const ArticleContent = styled.div`
  line-height: 1.6;
  color: #333;
  p, ul, ol, blockquote {
    margin-bottom: 1rem;
  }

  h2, h3, h4{
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }

  img{
    max-width: 100%;
    display: block;
    margin: 1rem auto;
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
`;

export const StyledGlobe = styled(FaGlobe)`
  font-size: 3rem;
`;