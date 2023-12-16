import http from '../../API';

const getAll = () => {
    return http.get("/langs/");
};

const get = id => {
    return http.get(`/langs/${id}`);
};

const create = data => {
    return http.post("/langs/", data);
};

const update = (id, data) => {
    return http.put(`/langs/${id}`, data);
};

const remove = id => {
    return http.delete(`/langs/${id}`);
};

const removeAll = () => {
    return http.delete("/langs/");
}

const findByTitle = title => {
    return http.get(`/langs?title=${title}`);
};

const LangService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default LangService;