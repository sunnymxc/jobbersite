import http from '../../API';

const getAll = () => {
    return http.get("/profiles/");
};

const get = id => {
    return http.get(`/profiles/${id}`);
};

const create = data => {
    return http.post("/profiles/", data);
};

const update = (id, data) => {
    return http.put(`/profiles/${id}`, data);
};

const remove = id => {
    return http.delete(`/profiles/${id}`);
};

const removeAll = () => {
    return http.delete("/profiles/");
}

const findByTitle = title => {
    return http.get(`/profiles?title=${title}`);
};

const ProfileService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default ProfileService;