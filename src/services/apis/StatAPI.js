import createAPIServices from '../helpers/createAPIServices'

const api = createAPIServices()

export const getStatTotal = () => {
    return api.makeAuthRequest({
	        url: `/api/v1/capture/stat`,
	        method: 'GET'
	    })
}
export const getStatCaptureDate = (days, split) => {
    return api.makeAuthRequest({
	        url: '/api/v1/capture/stat_by_date?days='+days+'&split='+split,
	        method: 'GET'
	    })
}

export const getStatUrl = () => {
    return api.makeAuthRequest({
	        url: `/api/v1/url/stat`,
	        method: 'GET'
	    })
}
export const getStatUrlDate = (days, split) => {
    return api.makeAuthRequest({
	        url: '/api/v1/url/stat_by_date?days='+days+'&split='+split,
	        method: 'GET'
	    })
}