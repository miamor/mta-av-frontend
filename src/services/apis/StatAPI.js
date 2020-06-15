import createAPIServices from '../helpers/createAPIServices'

const api = createAPIServices()

export const statTotal = () => {
    return api.makeAuthRequest({
        url: `/api/v1/stat`,
        method: 'GET'
    })
}