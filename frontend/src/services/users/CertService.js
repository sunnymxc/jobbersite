import http from '../../API';

const getAll = () => {
    return http.get("/certs/");
};

const get = id => {
    return http.get(`/certs/${id}`);
};

const create = data => {
    return http.post("/certs/", data);
};

const update = (id, data) => {
    return http.put(`/certs/${id}`, data);
};

const remove = id => {
    return http.delete(`/certs/${id}`);
};

const removeAll = () => {
    return http.delete("/certs/");
}

const findByTitle = title => {
    return http.get(`/certs?title=${title}`);
};

const certService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default certservice;