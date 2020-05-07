import createAPIServices from '../helpers/createAPIServices'

const api = createAPIServices()

export const postHistory = (data) => {
    return api.makeRequest({
        url: '/api/v1/history',
        method: 'POST',
        data
    })
}

export const getListHistory = () => {
    return api.makeAuthRequest({
        url: '/api/v1/history',
        method: 'GET'
    })
}

export const updateHistory = (data, history_id) => {
    return api.makeAuthRequest({
        url: `/api/v1/history/${history_id}`,
        method: 'PUT',
        data
    })
}

export const deleteHistory = (history_id) => {
    return api.makeAuthRequest({
        url: `/api/v1/history/${history_id}`,
        method: 'DELETE'
    })
}

export const getHistory = (history_id) => {
    return api.makeAuthRequest({
        url: `/api/v1/history/${history_id}`,
        method: 'GET'
    })
}