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

export const updateHistory = (data, hash) => {
    return api.makeAuthRequest({
        url: `/api/v1/history/${hash}`,
        method: 'PUT',
        data
    })
}

export const deleteHistory = (hash) => {
    return api.makeAuthRequest({
        url: `/api/v1/history/${hash}`,
        method: 'DELETE'
    })
}

export const getHistory = (hash) => {
    return api.makeAuthRequest({
        url: `/api/v1/history/${hash}`,
        method: 'GET'
    })
}