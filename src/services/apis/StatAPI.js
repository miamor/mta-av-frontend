import createAPIServices from '../helpers/createAPIServices'

const api = createAPIServices()

export const getStatTotal = () => {
    return api.makeAuthRequest({
	        url: `/api/v1/capture/stat`,
	        method: 'GET'
	    })
}

export const getStatUrl = () => {
    return api.makeAuthRequest({
	        url: `/api/v1/url/stat`,
	        method: 'GET'
	    })
}