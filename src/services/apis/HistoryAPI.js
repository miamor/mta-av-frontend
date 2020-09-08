import createAPIServices from '../helpers/createAPIServices'

const api = createAPIServices()

export const getListHistory = (hash) => {
    if (hash) {
        return api.makeAuthRequest({
            url: '/api/v1/capture/search/'+hash+'?mode=2',
            method: 'GET'
        })
    }
}
