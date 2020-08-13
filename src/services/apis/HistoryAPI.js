import createAPIServices from '../helpers/createAPIServices'

const api = createAPIServices()

export const getListHistory = (hash) => {
    if (hash) {
        return api.makeAuthRequest({
            url: '/api/v1/capture/search/'+hash,
            method: 'GET'
        })
    }
    return api.makeAuthRequest({
        url: '/api/v1/capture',
        method: 'GET'
    })
}
