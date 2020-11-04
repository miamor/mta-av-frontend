import createAPIServices from '../helpers/createAPIServices'

const api = createAPIServices()

export const countHistory = (mode, filter) => {
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
            if (filter[key] != null && filter[key] !== '' && key != 'source_ip' && key != 'destination_ip') {
                // console.log('***~ key', key, filter[key])
                filter_str += key+'='+filter[key]+'&'
            }
        })
    }
	filter_str += 'destination_ip=&'
    return filter_str
}

export const getListHistory = (mode, filter, page) => {
    // console.log('*** filter', filter)
    let filter_str = getQuery(mode, filter)
    console.log('~~ *** filter_str', filter_str, '/api/v1/capture?mode='+mode+'&'+filter_str+'&p='+page)
    return api.makeAuthRequest({
        url: '/api/v1/capture?mode='+mode+'&'+filter_str+'&p='+page,
        method: 'GET'
    })
}


// export const getListHistory = (hash) => {
//     if (hash) {
//         return api.makeAuthRequest({
//             url: '/api/v1/capture/search/'+hash+'?mode=2',
//             method: 'GET'
//         })
//     }
// }
