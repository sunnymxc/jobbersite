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
            </ArticleContainer>
        </Layout>
    );
};

export default SharedDetail;