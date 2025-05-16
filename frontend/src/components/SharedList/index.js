import React from 'react';
import Layout from '../../hocs/Layout';
import dayjs from 'dayjs';
import {
    Container, Wrap, Main, NotificationView, Header, Content, Country,
    Input, Category, ButtonGroup, Button, Panel, Select, CardGroup,
    Display, Featured, DropdownList, DropdownItem,
    PostItem, PostTitle, PostDesc, PostContent, PostDate, StyledGlobe,
    Paginate, PageButton, PageNumber, FeaturedHeader, FeaturedPaginate, FeaturedPageButton, FeaturedPageNumber,
    FeaturedGroup, Text
} from './ListElements'; // Import new styled components for featured pagination
import Loader from '../Loader/index';

const SharedList = ({
    countries, selectedCountry, handleCountrySelect,
    dropdownOptions, toggleDropdown, handleItemClick, dropdownOpen,
    loading, error, posts, featuredPosts,
    selectedStates, handleStateClick,
    totalPages, currentPage, setCurrentPage, handleDaySelect, selectedDay, selectedDisciplines, handleDisciplineClick,
    dropdownTypes, displayNames, searchTerm, handleSearchChange,
    totalFeaturedPages, currentFeaturedPage, handleFeaturedPageChange,
}) => {
    return (
        <Layout>
            <Container>
                <Wrap>
                    <Content>
                        <Main>
                            {/*
                            <NotificationView>
                                <Notification />
                            </NotificationView> 
                            */}
                            <Country>
                                <StyledGlobe />
                                <Select value={selectedCountry} onChange={handleCountrySelect}>
                                    <option value="">Select a Country</option>
                                    {countries.map(country => (
                                        <option key={country.id} value={country.id}>{country.name}</option>
                                    ))}
                                </Select>
                            </Country>
                            <Display>
                                <Category>
                                    <Header>
                                        <Input
                                            type="text"
                                            placeholder="Search by Job Title"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                    </Header>
                                    <Panel>
                                        <FeaturedHeader>Sort Jobs By</FeaturedHeader>
                                        <ButtonGroup>
                                            {dropdownTypes.map(type => (
                                                <React.Fragment key={type}>
                                                    <Button
                                                        onClick={() => toggleDropdown(type)}
                                                        disabled={loading[type] || (!selectedCountry && type !== 'category' && type !== 'day')}
                                                    >
                                                        {selectedDay && type === 'day' ? (
                                                            dropdownOptions[type].find(opt => opt.id === selectedDay)?.name
                                                        ) : (
                                                            displayNames[type]
                                                        )}
                                                    </Button>
                                                    {error[type] && <p style={{ color: "red" }}>{error[type]}</p>}
                                                    {dropdownOptions[type] && (
                                                        <DropdownList isOpen={dropdownOpen[type]}>
                                                            {dropdownOptions[type].map(option => (
                                                                <DropdownItem
                                                                    key={option.id}
                                                                    onClick={() => {
                                                                        if (type === 'state') {
                                                                            handleStateClick(option);
                                                                        } else if (type === 'discipline') {
                                                                            handleDisciplineClick(option);
                                                                        } else if (type === 'day') {
                                                                            handleDaySelect(option);
                                                                        } else {
                                                                            handleItemClick(type, option.id);
                                                                        }
                                                                    }}
                                                                >
                                                                    {option.name}
                                                                </DropdownItem>
                                                            ))}
                                                        </DropdownList>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </ButtonGroup>
                                    </Panel>
                                </Category>
                                <CardGroup>
                                    {loading.posts ? (
                                        <Loader />
                                    ) : error.posts ? (
                                        <p style={{ color: "red" }}>{error.posts}</p>
                                    ) : posts.length > 0 ? (                        
                                        posts.map(post => (
                                            <PostItem key={post.id}>
                                                <PostContent>
                                                    <PostTitle to={`/docs/${post.slug}`}>{post.title}</PostTitle>
                                                    <PostDesc
                                                        dangerouslySetInnerHTML={{
                                                            __html: post.desc && post.desc.length > 320
                                                                ? `${post.desc.substring(0, 320)}...`
                                                                : post.desc,
                                                        }}
                                                    />
                                                    <PostDate>
                                                        {dayjs(post.publishedDate).format('MMMM D, YYYY')}
                                                    </PostDate>
                                                </PostContent>
                                            </PostItem>
                                        ))
                                    ) : (
                                        <Text>No posts available.</Text>
                                    )}
                                </CardGroup>
                                <Featured>
                                    <FeaturedHeader>FEATURED JOBS</FeaturedHeader>
                                    {loading.featuredPosts ? (
                                        <Loader />
                                    ) : error.featuredPosts ? (
                                        <p style={{ color: "red" }}>{error.featuredPosts}</p>
                                    ) : featuredPosts && featuredPosts.length > 0 ? (
                                        <FeaturedGroup>
                                            {featuredPosts.map(post => (
                                                <PostItem key={post.id}>
                                                    <PostContent>
                                                        <PostTitle to={`/docs/${post.slug}`}>{post.title}</PostTitle>
                                                        <PostDate>
                                                            {dayjs(post.publishedDate).format('MMMM DD, YYYY')}
                                                        </PostDate>
                                                    </PostContent>
                                                </PostItem>
                                            ))}
                                        </FeaturedGroup>
                                    ) : (
                                        <Text>No featured jobs available.</Text>
                                    )}
                                    {totalFeaturedPages > 12 && (
                                        <FeaturedPaginate>
                                            <FeaturedPageButton
                                                onClick={() => handleFeaturedPageChange(prev => Math.max(prev - 1, 1))}
                                                disabled={currentFeaturedPage === 1}
                                            >
                                                Previous
                                            </FeaturedPageButton>
                                            <FeaturedPageNumber>
                                                Page {currentFeaturedPage} of {totalFeaturedPages}
                                            </FeaturedPageNumber>
                                            <FeaturedPageButton
                                                onClick={() => handleFeaturedPageChange(prev => Math.min(prev + 1, totalFeaturedPages))}
                                                disabled={currentFeaturedPage === totalFeaturedPages}
                                            >
                                                Next
                                            </FeaturedPageButton>
                                        </FeaturedPaginate>
                                    )}
                                </Featured>
                                {totalPages > 24 && (
                                    <Paginate>
                                        <PageButton onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</PageButton>
                                        <PageNumber>Page {currentPage} of {totalPages}</PageNumber>
                                        <PageButton onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</PageButton>
                                    </Paginate>
                                )}
                            </Display>
                        </Main>
                    </Content>
                </Wrap>
            </Container>
        </Layout>
    );
};

export default SharedList;