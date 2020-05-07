import createAPIServices from '../helpers/createAPIServices'

const api = createAPIServices()

export const login = (data) => {
    return api.makeRequest({
        url: '/api/v1/auth/login',
        method: 'POST',
        data
    })
}

export const logout = () => {
    return api.makeAuthRequest({
        url: '/api/v1/auth/logout',
        method: 'POST'
    })
}

export const getInfo = () => {
    return api.makeAuthRequest({
        url: '/api/v1/auth/info',
        method: 'GET'
    })
}