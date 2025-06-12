import http from '../../API';

const getAll = () => {
    return http.get("/badges/");
};

const get = id => {
    return http.get(`/badges/${id}`);
};

const create = data => {
    return http.post("/badges/", data);
};

const update = (id, data) => {
    return http.put(`/badges/${id}`, data);
};

const remove = id => {
    return http.delete(`/badges/${id}`);
};

const removeAll = () => {
    return http.delete("/badges/");
}

const findByTitle = title => {
    return http.get(`/badges?title=${title}`);
};

const BadgeService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default BadgeService;