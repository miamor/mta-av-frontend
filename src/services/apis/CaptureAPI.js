import createAPIServices from '../helpers/createAPIServices'

const api = createAPIServices()

export const postCapture = (data) => {
    return api.makeRequest({
        url: '/api/v1/capture',
        method: 'POST',
        // data
    })
}

export const getBehaviorReport = (report_id) => {
    return api.makeAuthRequest({
        url: '/api/v1/capture/report/'+report_id,
        method: 'GET'
    })
}

export const countCapture = (mode, filter) => {
    let filter_str = getQuery(mode, filter)
    return api.makeAuthRequest({
        url: '/api/v1/capture/count?mode='+mode+'&'+filter_str,
        method: 'GET'
    })
}

export const getQuery = (mode, filter) => {
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

export const getListCapture = (mode, filter, page) => {
    // console.log('*** filter', filter)
    let filter_str = getQuery(mode, filter)
    console.log('~~ *** filter_str', filter_str, '/api/v1/capture?mode='+mode+'&'+filter_str+'&p='+page)
    return api.makeAuthRequest({
        url: '/api/v1/capture?mode='+mode+'&'+filter_str+'&p='+page,
        method: 'GET'
    })
}

export const updateCapture = (data, capture_id) => {
    return api.makeAuthRequest({
        url: `/api/v1/capture/${capture_id}`,
        method: 'PUT',
        data
    })
}

export const deleteCapture = (capture_id) => {
    return api.makeAuthRequest({
        url: `/api/v1/capture/${capture_id}`,
        method: 'DELETE'
    })
}

export const getCapture = (capture_id) => {
    return api.makeAuthRequest({
        url: `/api/v1/capture/${capture_id}`,
        method: 'GET'
    })
}
