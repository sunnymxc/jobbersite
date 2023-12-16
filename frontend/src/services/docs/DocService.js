import http from '../../API';

const getAll = () => {
    return http.get("/docs/");
};

const get = id => {
    return http.get(`/docs/${id}`);
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
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default DocService;