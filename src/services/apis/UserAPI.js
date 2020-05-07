import createAPIServices from '../helpers/createAPIServices'

const api = createAPIServices()

export const postUser = (data) => {
    return api.makeRequest({
        url: '/api/v1/user',
        method: 'POST',
        data
    })
}

export const getListUser = () => {
    return api.makeAuthRequest({
        url: '/api/v1/user',
        method: 'GET'
    })
}

export const getListBlockedUser = () => {
    return api.makeAuthRequest({
        url: '/api/v1/user/block',
        method: 'GET'
    })
}

export const searchUser = (geo_long, geo_lat, country, city, street, max_distance, mode) => {
    return api.makeAuthRequest({
        url: '/api/v1/user/search',
        method: 'GET',
        params:{
            geo_long,
            geo_lat,
            country,
            city,
            street,
            max_distance,
            mode
        }
    })
}

export const updateUser = (data, user_id) => {
    return api.makeAuthRequest({
        url: `/api/v1/user/${user_id}`,
        method: 'PUT',
        data
    })
}

export const deleteUser = (user_id) => {
    return api.makeAuthRequest({
        url: `/api/v1/user/${user_id}`,
        method: 'DELETE'
    })
}

export const getUser = (user_id) => {
    return api.makeAuthRequest({
        url: `/api/v1/user/${user_id}`,
        method: 'GET'
    })
}