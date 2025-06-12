import http from '../../API';

const getAll = () => {
    return http.get("/points/");
};

const get = id => {
    return http.get(`/points/${id}`);
};

const create = data => {
    return http.post("/points/", data);
};

const update = (id, data) => {
    return http.put(`/points/${id}`, data);
};

const remove = id => {
    return http.delete(`/points/${id}`);
};

const removeAll = () => {
    return http.delete("/points/");
}

const findByTitle = title => {
    return http.get(`/points?title=${title}`);
};

const PointService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default PointService;