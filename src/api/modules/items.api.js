import api from '../init'

export default {
    createItem: data => api.post('items/', data),
    deleteItem: itemId => api.delete(`items/${itemId}/`),
    getItems: () => api.get('items/'),
    getItem: itemId => api.get(`items/${itemId}/`),
    updateItem: (itemId, data) => api.patch(`items/${itemId}/`, data),
}