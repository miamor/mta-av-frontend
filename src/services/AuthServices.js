import {getLocalData, setLocalData} from "./StorageServices"

import createAPIServices from './helpers/createAPIServices'
const api = createAPIServices()

export const tryLogin = (data) => {
    return api.makeAuthRequest({
        url: '/api/v1/auth/login',
        method: 'POST',
        data: data
    })
}



const _store = {
    state: {
        accessToken: getLocalData('accessToken', ''),
        user: getLocalData('user', {}),
    },
    subscribers: []
}

const _broadcast = () => {
    setTimeout(() => {
        _store.subscribers.forEach(subscriber => {
            subscriber(_store.state)
        })
    }, 0)
}

export const notifyUpdate = _broadcast

export const subscribe = subscriber => {
    if (typeof subscriber !== 'function') return
    if (_store.subscribers.indexOf(subscriber) !== -1) return

    _store.subscribers = [].concat(_store.subscribers, subscriber)
}

export const unsubscribe = subscriber => {
    _store.subscribers = _store.subscribers.filter(sub => sub !== subscriber)
}

export const isAuthenticated = () => {
    const {state} = _store
    return !!state.accessToken
}

export const setUserData = user => {
    const updatedUser = user

    _store.state = {
        ..._store.state,
        user: updatedUser
    }

    setLocalData('user', updatedUser)
    _broadcast()
}

export const getUserData = () => getLocalData('user') || _store.state.user || {}

export const setAccessToken = accessToken => {
    _store.state = {
        ..._store.state,
        accessToken,
    }

    setLocalData('accessToken', accessToken)
}

export const getAccessToken = () => getLocalData('accessToken') || _store.state.accessToken || ''


export const logoutUser = (message = '') => {
    setAccessToken('')
    setUserData({})
    _broadcast()

    return true
}