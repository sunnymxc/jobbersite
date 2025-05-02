import React, { useState, useCallback, useMemo } from 'react';
import Layout from '../../hocs/Layout';
import dayjs from 'dayjs';
import {
    Container, Wrap, Main, Header, Content, Country,
    Input, Category, ButtonGroup, Button, Panel, Select, CardGroup,
    Display, Featured, DropdownList, DropdownItem,
    PostItem, PostTitle, PostDesc, PostContent, PostDate, StyledGlobe,
    Paginate, PageButton, PageNumber, FeaturedHeader, FeaturedPaginate, FeaturedPageButton, FeaturedPageNumber,
    FeaturedGroup
} from './ListElements'; // Import new styled components for featured pagination
import TortoiseSpinner from '../../assets/TortoiseSpinner';

const SharedList = ({
    countries, selectedCountry, handleCountrySelect,
    dropdownOptions, toggleDropdown, handleItemClick, dropdownOpen,
    loading, error, posts, featuredPosts,
    selectedStates, handleStateClick,
    totalPages, currentPage, setCurrentPage, handleDaySelect, selectedDay, selectedDisciplines, handleDisciplineClick,
    dropdownTypes, displayNames, searchTerm, handleSearchChange,
    totalFeaturedPages, currentFeaturedPage, handleFeaturedPageChange
}) => {
    return (
        <Layout>
            <Container>
                <Wrap>
                    <Content>
                        <Main>
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
                                            placeholder="Search by keywords"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                    </Header>
                                    <Panel>
                                        Sort Jobs By
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
                                        <TortoiseSpinner />
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
                                        <p>No posts available.</p>
                                    )}
                                </CardGroup>
                                <Featured>
                                    <FeaturedHeader>FEATURED JOBS</FeaturedHeader>
                                    {loading.posts ? (
                                        <TortoiseSpinner />
                                    ) : error.posts ? (
                                        <p style={{ color: "red" }}>{error.posts}</p>
                                    ) : featuredPosts && featuredPosts.length > 0 ? (
                                        <FeaturedGroup>
                                            {featuredPosts.map(post => (
                                                <PostItem key={post.id}>
                                                    <PostContent>
                                                        <PostTitle to={`/docs/${post.slug}`}>{post.title}</PostTitle>
                                                        <PostDate>
                                                            {dayjs(post.publishedDate).format('MMMM D, YYYY')}
                                                        </PostDate>
                                                    </PostContent>
                                                </PostItem>
                                            ))}
                                        </FeaturedGroup>
                                    ) : (
                                        <p>No featured jobs available.</p>
                                    )}
                                    {totalFeaturedPages > 1 && (
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
                                <Paginate>
                                    <PageButton onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</PageButton>
                                    <PageNumber>Page {currentPage} of {totalPages}</PageNumber>
                                    <PageButton onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</PageButton>
                                </Paginate>
                            </Display>
                        </Main>
                    </Content>
                </Wrap>
            </Container>
        </Layout>
    );
};

export default SharedList;