import http from '../../API'; // Adjust the path to your API configuration

const getAll = () => {
    return http.get("/notifications/"); //  Endpoint for all notifications
};

const get = (id) => {
    return http.get(`/notifications/${id}/`); // Endpoint for a specific notification by ID
};


const findByCategory = (categorySlug) => {
  return http.get(`/notifications/?category=${categorySlug}`);
};


const NotificationService = {
    getAll,
    get,
    findByCategory,
};

export default NotificationService;
