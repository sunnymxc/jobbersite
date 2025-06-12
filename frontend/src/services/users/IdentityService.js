import http from '../../API';

const getAll = () => {
    return http.get("/identities/");
};

const get = id => {
    return http.get(`/identities/${id}`);
};

const create = data => {
    return http.post("/identities/", data);
};

const update = (id, data) => {
    return http.put(`/identities/${id}`, data);
};

const remove = id => {
    return http.delete(`/identities/${id}`);
};

const removeAll = () => {
    return http.delete("/identities/");
}

const findByTitle = title => {
    return http.get(`/identities?title=${title}`);
};

const IdentityService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default IdentityService;