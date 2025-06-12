import http from '../../API';

const getAll = () => {
    return http.get("/taxes/");
};

const get = id => {
    return http.get(`/taxes/${id}`);
};

const create = data => {
    return http.post("/taxes/", data);
};

const update = (id, data) => {
    return http.put(`/taxes/${id}`, data);
};

const remove = id => {
    return http.delete(`/taxes/${id}`);
};

const removeAll = () => {
    return http.delete("/taxes/");
}

const findByTitle = title => {
    return http.get(`/taxes?title=${title}`);
};

const TaxService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default TaxService;