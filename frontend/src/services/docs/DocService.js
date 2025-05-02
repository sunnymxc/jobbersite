import http from '../../API';

const getAll = async (filterCriteria = {}) => {
    let url = "/docs/";
    if (Object.keys(filterCriteria).length > 0) {
        const params = new URLSearchParams(filterCriteria);
        url += `?${params.toString()}`;
    }
    return http.get(url);
};

const getAllCountries = async () => {
    return http.get("/countries/");
};

const getDropdownOptions = async (type, countryId) => {
    switch (type) {
        case "category":
            return http.get("/categories/");
        case "state":
            return http.get(countryId ? `/states/?country=${countryId}` : "/states/");
        case "discipline":
            // Add countryId to the query params here.
            return http.get(countryId ? `/disciplines/?country=${countryId}` : "/disciplines/");
        default:
            throw new Error("Invalid dropdown type: " + type);
    }
};

const getPost = (slug) => {
    return http.get(`/docs/${slug}/`);
};

const create = data => {
    return http.post("/docs/", data);
};

const update = (id, data) => {
    return http.put(`/docs/${id}`, data);
};

const remove = id => {
    return http.delete(`/docs/${id}`);
};

const removeAll = () => {
    return http.delete("/docs/");
}

const findByTitle = title => {
    return http.get(`/docs?title=${title}`);
};

const DocService = {
    getAll,
    getAllCountries,
    getDropdownOptions,
    getPost,
    create,
    update,
    remove,
    removeAll,
    findByTitle,
};

export default DocService;