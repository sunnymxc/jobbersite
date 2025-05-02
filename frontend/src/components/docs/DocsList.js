import React, { useState, useEffect, useCallback, useMemo } from 'react';
import DocService from '../../services/docs/DocService';
import SharedList from '../SharedList';

const DocsList = () => {
    // State variables
    const [dropdownOpen, setDropdownOpen] = useState({ state: false, discipline: false, category: false, day: false });
    const [dropdownOptions, setDropdownOptions] = useState({ state: [], discipline: [], category: [], day: [] });
    const [loading, setLoading] = useState({ state: false, discipline: false, category: false, countries: false, posts: false, day: false });
    const [error, setError] = useState({ state: null, discipline: null, category: null, countries: null, posts: null, day: null });
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(2);
    const [allPosts, setAllPosts] = useState([]); // To hold all fetched posts
    const [posts, setPosts] = useState([]); // To hold the paginated and filtered posts for the main list (status === 0)
    const [featuredPosts, setFeaturedPosts] = useState([]); // To hold all fetched featured posts (status === 1)
    const [paginatedFeaturedPosts, setPaginatedFeaturedPosts] = useState([]); // To hold the paginated featured posts
    const [selectedStates, setSelectedStates] = useState([]);
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const postsPerPage = 24;
    const [currentFeaturedPage, setCurrentFeaturedPage] = useState(1);
    const featuredPostsPerPage = 12;
    const [totalFeaturedPages, setTotalFeaturedPages] = useState(1);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch countries (no changes)
    const fetchCountries = useCallback(async () => {
        setLoading(prevState => ({ ...prevState, countries: true }));
        setError(prevState => ({ ...prevState, countries: null }));
        try {
            const response = await DocService.getAllCountries();
            setCountries(response.data);
        } catch (err) {
            console.error("Error fetching countries:", err);
            setError(prevState => ({ ...prevState, countries: err.message }));
        } finally {
            setLoading(prevState => ({ ...prevState, countries: false }));
        }
    }, []);

    // Fetch dropdown options (no changes)
    const fetchDropdownOptions = useCallback(async (type, countryId) => {
        console.log(`Fetching ${type} options for country:`, countryId);
        setLoading(prevState => ({ ...prevState, [type]: true }));
        setError(prevState => ({ ...prevState, [type]: null }));
        try {
            const response = await DocService.getDropdownOptions(type, countryId);
            console.log(`Received ${type} options:`, response.data);
            setDropdownOptions(prevState => ({ ...prevState, [type]: response.data }));
        } catch (err) {
            console.error(`Error fetching ${type} options:`, err);
            setError(prevState => ({ ...prevState, [type]: err.message }));
        } finally {
            setLoading(prevState => ({ ...prevState, [type]: false }));
        }
    }, []);

    // Fetch all posts (modified to filter by status === 0 for the main list)
    const fetchAllPosts = useCallback(async (filterCriteria = {}, searchTerm = '') => {
        console.log('fetchAllPosts called with filterCriteria:', filterCriteria, 'and searchTerm:', searchTerm);
        if (!selectedCountry) {
            setAllPosts([]);
            setFeaturedPosts([]);
            return;
        }

        setLoading(prevState => ({ ...prevState, posts: true }));
        setError(prevState => ({ ...prevState, posts: null }));
        try {
            if (selectedCountry) {
                filterCriteria["state__country"] = selectedCountry;
            }

            if (selectedStates.length === 1) {
                filterCriteria["state__id__in"] = selectedStates[0].id.toString();
            }

            if (selectedDisciplines.length === 1) {
                filterCriteria["discipline__in"] = selectedDisciplines[0].toString();
            }

            if (selectedCategory) {
                filterCriteria["discipline__category"] = parseInt(selectedCategory);
            }

            if (selectedDay) {
                const day = dropdownOptions.day.find(opt => opt.id === selectedDay);
                if (day && day.date) {
                    const today = new Date();
                    const currentDayOfWeek = today.getDay();
                    const selectedDayOfWeek = day.date.getDay();

                    let daysDifference = selectedDayOfWeek - currentDayOfWeek;

                    if (daysDifference > 0) {
                        daysDifference -= 7;
                    }

                    const targetDate = new Date(today);
                    targetDate.setDate(today.getDate() + daysDifference);

                    console.log("targetDate:", targetDate);

                    const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
                    const endOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate() + 1);

                    filterCriteria["created_at__gte"] = startOfDay.toISOString();
                    filterCriteria["created_at__lt"] = endOfDay.toISOString();
                }
            }

            const response = await DocService.getAll(filterCriteria);
            let fetchedPosts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            const uniquePostsWithStatusZero = [];
            const uniqueFeaturedPosts = [];
            const seenIds = new Set();

            for (const post of fetchedPosts) {
                if (!seenIds.has(post.id)) {
                    if (post.status === 0) {
                        uniquePostsWithStatusZero.push(post);
                    } else if (post.status === 1) {
                        uniqueFeaturedPosts.push(post);
                    }
                    seenIds.add(post.id);
                }
            }

            setAllPosts(uniquePostsWithStatusZero);
            setFeaturedPosts(uniqueFeaturedPosts);

        } catch (error) {
            console.error("Error fetching posts:", error);
            setError(prevState => ({ ...prevState, posts: error.message }));
        } finally {
            setLoading(prevState => ({ ...prevState, posts: false }));
        }
    }, [selectedCountry, selectedStates, selectedDisciplines, selectedDay, selectedCategory, dropdownOptions]);

    // Handle item click in dropdowns (no changes)
    const handleItemClick = useCallback((type, value) => {
        setDropdownOpen(prevState => ({ ...prevState, [type]: false }));
        setCurrentPage(1);

        if (type === 'category') {
            setSelectedCategory(value);
            setSelectedDisciplines([]);
            setSelectedStates([]);
            setSelectedDay(null);
        } else if (type === "state") {
            const selectedState = dropdownOptions.state.find(state => state.id === value);
            if (selectedState) {
                setSelectedStates(prevState => [selectedState]);
                console.log('State selected:', selectedState);
            }
            setSelectedCategory(null);
            setSelectedDisciplines([]);
            setSelectedDay(null);
        } else if (type === "discipline") {
            setSelectedDisciplines([value]);
            setSelectedCategory(null);
            setSelectedStates([]); // Clean slate for state
            setSelectedDay(null);
        } else if (type === "day") {
            setSelectedDay(value);
            setSelectedCategory(null);
            setSelectedDisciplines([]);
            setSelectedStates([]); // Clean slate for state
        }
    }, [dropdownOptions]);

    // Get day dropdown options (no changes)
    const getDayDropdownOptions = useCallback(() => {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const today = new Date();

        const dayOptions = days.map((day, index) => ({
            id: day.toLowerCase(),
            name: day,
            date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1 + index)
        }));

        return dayOptions;
    }, []);

    // useEffect for initial data fetching and dropdown options (no changes)
    useEffect(() => {
        fetchCountries();
        fetchDropdownOptions('category');
        fetchDropdownOptions('discipline', selectedCountry);

        setDropdownOptions(prevState => ({
            ...prevState,
            day: getDayDropdownOptions()
        }));
    }, [fetchCountries, fetchDropdownOptions, selectedCountry, getDayDropdownOptions]);

    // useEffect to fetch all posts whenever filters change (no changes)
    useEffect(() => {
        fetchAllPosts({}, searchTerm);
        setCurrentPage(1); // Reset page on filter change
        setCurrentFeaturedPage(1); // Reset featured page
    }, [fetchAllPosts, selectedStates, selectedDisciplines, selectedCategory, selectedDay, selectedCountry, searchTerm]);

    // Update paginated posts for the main list (filtered by search term AND status === 0)
    useEffect(() => {
        const filteredBySearch = !searchTerm
            ? allPosts
            : allPosts.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        setPosts(filteredBySearch.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(filteredBySearch.length / postsPerPage));
    }, [allPosts, currentPage, postsPerPage, searchTerm]);

    // Update paginated featured posts (status === 1)
    useEffect(() => {
        const startIndex = (currentFeaturedPage - 1) * featuredPostsPerPage;
        const endIndex = startIndex + featuredPostsPerPage;
        setPaginatedFeaturedPosts(featuredPosts.slice(startIndex, endIndex));
        setTotalFeaturedPages(Math.ceil(featuredPosts.length / featuredPostsPerPage));
    }, [featuredPosts, currentFeaturedPage, featuredPostsPerPage]);

    // Dropdown types and display names (no changes)
    const dropdownTypes = ["state", "category", "discipline", "day"];
    const displayNames = {
        state: "State",
        discipline: "Discipline",
        category: "Industry",
        day: "Day"
    };

    // Toggle dropdown visibility (no changes)
    const toggleDropdown = useCallback((type) => {
        setDropdownOpen(prevState => ({ ...prevState, [type]: !prevState[type] }));
        if (!dropdownOptions[type].length && !loading[type] && !error[type] && selectedCountry && type !== 'day') {
            fetchDropdownOptions(type, selectedCountry);
        }
    }, [dropdownOptions, loading, error, selectedCountry, fetchDropdownOptions]);

    // Handle country selection (no changes)
    const handleCountrySelect = useCallback((event) => {
        const countryId = event.target.value;
        console.log("Country selected:", countryId);
        setSelectedCountry(countryId);
        setSelectedStates([]);
        setSelectedDisciplines([]);
        setSelectedCategory(null);
        setDropdownOptions(prevState => ({ ...prevState, state: [] }));
        setCurrentPage(1);
        setCurrentFeaturedPage(1); // Reset featured page on country change
    }, []);

    // Handle state click (no changes)
    const handleStateClick = useCallback((state) => {
        const stateId = state.id;
        setSelectedStates([state]);
        setCurrentPage(1);
        setCurrentFeaturedPage(1); // Reset featured page on state change
    }, []);

    // Handle discipline click (no changes)
    const handleDisciplineClick = useCallback((discipline) => {
        const disciplineId = discipline.id;
        setSelectedDisciplines([disciplineId]);
        setCurrentPage(1);
        setCurrentFeaturedPage(1); // Reset featured page on discipline change
    }, []);

    // Handle day selection (no changes)
    const handleDaySelect = useCallback((day) => {
        setSelectedDay(day.id);
        setDropdownOpen(prevState => ({ ...prevState, day: false }));
        setCurrentPage(1);
        setCurrentFeaturedPage(1); // Reset featured page on day change
    }, []);

    // Handle search (no changes)
    const handleSearchChange = useCallback((event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset page on search
    }, []);

    // Handle featured page change (no changes)
    const handleFeaturedPageChange = (page) => {
        setCurrentFeaturedPage(page);
    };

    return (
        <SharedList
            countries={countries}
            selectedCountry={selectedCountry}
            handleCountrySelect={handleCountrySelect}
            dropdownOptions={dropdownOptions}
            toggleDropdown={toggleDropdown}
            handleItemClick={handleItemClick}
            dropdownOpen={dropdownOpen}
            loading={loading}
            error={error}
            posts={posts} // Pass the paginated and filtered main list (only status === 0)
            featuredPosts={paginatedFeaturedPosts} // Pass the paginated featured list (only status === 1)
            selectedStates={selectedStates}
            handleStateClick={handleStateClick}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            handleDaySelect={handleDaySelect}
            selectedDay={selectedDay}
            selectedDisciplines={selectedDisciplines}
            handleDisciplineClick={handleDisciplineClick}
            dropdownTypes={dropdownTypes}
            displayNames={displayNames}
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            totalFeaturedPages={totalFeaturedPages}
            currentFeaturedPage={currentFeaturedPage}
            handleFeaturedPageChange={handleFeaturedPageChange}
        />
    );
};

export default DocsList;