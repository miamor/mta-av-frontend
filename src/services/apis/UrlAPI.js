import createAPIServices from '../helpers/createAPIServices'

const api = createAPIServices()

export const countUrl = (filter) => {
    let filter_str = getQuery(filter)
    return api.makeAuthRequest({
        url: '/api/v1/url/count?'+filter_str,
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

export const getListUrl = (filter, page) => {
    // console.log('*** filter', filter)
    let filter_str = getQuery(filter)
    console.log('~~ *** filter_str', filter_str, '/api/v1/url?'+filter_str+'&p='+page)
    return api.makeAuthRequest({
        url: '/api/v1/url?'+filter_str+'&p='+page,
        method: 'GET'
    })
}

export const getUrl = (url_id) => {
    return api.makeAuthRequest({
        url: `/api/v1/url/${url_id}`,
        method: 'GET'
    })
}
