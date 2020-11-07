import createAPIServices from '../helpers/createAPIServices'

const api = createAPIServices()

export const countUser = (filter) => {
    let filter_str = getQuery(filter)
    console.log('~~ *** filter_str', filter_str, '/api/v1/user/count?'+filter_str)
    return api.makeAuthRequest({
        url: '/api/v1/user/count?'+filter_str,
        method: 'GET'
    })
}

export const getQuery = (filter) => {
    let filter_str = ''
    if (filter != undefined && filter != null && Object.keys(filter).length !== 0) {
        Object.keys(filter).map((key, index) => {
            if (filter[key] != null && filter[key] !== '') {
                // console.log('***~ key', key, filter[key])
                filter_str += key+'='+filter[key]+'&'
            }
        })
    }
    return filter_str
}

export const getListUser = (filter, page) => {
    // console.log('*** filter', filter)
    let filter_str = getQuery(filter)
    console.log('~~ *** filter_str', filter_str, '/api/v1/user?'+filter_str+'&p='+page)
    return api.makeAuthRequest({
        url: '/api/v1/user?'+filter_str+'&p='+page,
        method: 'GET'
    })
}



export const postUser = (data) => {
    return api.makeRequest({
        url: '/api/v1/user',
        method: 'POST',
        data
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