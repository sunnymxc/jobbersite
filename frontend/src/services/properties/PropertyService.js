import http from '../../API';

const getAll = () => {
    return http.get("/properties/");
};

const get = id => {
    return http.get(`/properties/${id}`);
};

const create = data => {
    return http.post("/properties/", data);
};

const update = (id, data) => {
    return http.put(`/properties/${id}`, data);
};

const remove = id => {
    return http.delete(`/properties/${id}`);
};

const removeAll = () => {
    return http.delete("/properties/");
}

const findByTitle = title => {
    return http.get(`/properties?title=${title}`);
};

const JobService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default JobService;