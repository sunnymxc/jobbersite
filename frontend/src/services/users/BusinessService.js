import http from '../../API';

const getAll = () => {
    return http.get("/businesses/");
};

const get = id => {
    return http.get(`/businesses/${id}`);
};

const create = data => {
    return http.post("/businesses/", data);
};

const update = (id, data) => {
    return http.put(`/businesses/${id}`, data);
};

const remove = id => {
    return http.delete(`/businesses/${id}`);
};

const removeAll = () => {
    return http.delete("/businesses/");
}

const findByTitle = title => {
    return http.get(`/businesses?title=${title}`);
};

const BusinessService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default BusinessService;