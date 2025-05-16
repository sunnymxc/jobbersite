import React from 'react';
import { Helmet } from 'react-helmet';
import DOMPurify from 'dompurify';
import Layout from '../../hocs/Layout';
import {
    ArticleContainer, ArticleTitle, ArticleDescription, ArticleMeta,
    PublishedDate, ArticleContent, StyledCircleArrow
} from './DetailElements';
import dayjs from 'dayjs';

const SharedDetail = ({
    post, handleGoBack
}) => {
    // Sanitize and replace newlines with <br> in description
    let sanitizedDesc = DOMPurify.sanitize(post.desc || "");
    sanitizedDesc = sanitizedDesc.replace(/\n/g, '<br>');

    // Sanitize content
    const sanitizedContent = DOMPurify.sanitize(post.content || "");

    return (
        <Layout>
            <Helmet>
                <title>{post.title}</title>
                <meta name="description"
                    content={
                        post.desc && post.desc.length > 160
                            ? post.desc.substring(0, 160) + '...'
                            : post.desc || ""
                    }
                />
                <meta name="keywords" content="job posting, job search, careers, employment, jobs, vacancies" />
                <meta name="author" content="Jobbersite.com" />
                <meta property="og:title" content={post.title} />
                <meta property="og:description"
                    content={
                        post.desc && post.desc.length > 160
                            ? post.desc.substring(0, 160) + '...'
                            : post.desc || ""
                    }
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://www.jobbersite.com/post/${post.id}`} /> {/* */}
                <meta property="og:image" content="URL_TO_YOUR_LOGO_OR_FEATURED_IMAGE" /> {/* Add actual URL */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description"
                    content={
                        post.desc && post.desc.length > 160
                            ? post.desc.substring(0, 160) + '...'
                            : post.desc || ""
                    }
                />
                <meta name="twitter:image" content="URL_TO_YOUR_LOGO_OR_FEATURED_IMAGE" />  {/* Add actual URL */}
                <link rel="canonical" href={`https://www.jobbersite.com/post/${post.id}`} /> {/* Add actual URL */}
                <meta name="robots" content="index, follow" />
            </Helmet>

            <ArticleContainer>
                <StyledCircleArrow onClick={handleGoBack} />
                <ArticleTitle>{post.title}</ArticleTitle>
                <ArticleDescription dangerouslySetInnerHTML={{ __html: sanitizedDesc }}>
                </ArticleDescription>
                <ArticleMeta>
                    {post.created_at && (
                        <PublishedDate>
                            Published: {dayjs(post.publishedDate).format('MMMM D, YYYY')}
                        </PublishedDate>
                    )}
                    {/* Add other meta information here */}
                </ArticleMeta>
                <ArticleContent>
                    {/* If your post has html content, use dangerouslySetInnerHTML */}
                    {post.content && (
                        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                    )}
                </ArticleContent>
                <StyledCircleArrow onClick={handleGoBack} />
            </ArticleContainer>
        </Layout>
    );
};

export default SharedDetail;