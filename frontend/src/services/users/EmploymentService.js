import http from '../../API';

const getAll = () => {
    return http.get("/employments/");
};

const get = id => {
    return http.get(`/employments/${id}`);
};

const create = data => {
    return http.post("/employments/", data);
};

const update = (id, data) => {
    return http.put(`/employments/${id}`, data);
};

const remove = id => {
    return http.delete(`/employments/${id}`);
};

const removeAll = () => {
    return http.delete("/employments/");
}

const findByTitle = title => {
    return http.get(`/employments?title=${title}`);
};

const EmploymentService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default EmploymentService;