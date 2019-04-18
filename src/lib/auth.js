import Cookie from 'js-cookie'

const TokenKey = 'admin-token'

export const getToken = () => Cookie.get(TokenKey)

export const setToken = (token) => Cookie.set(TokenKey, token)

export const remveToken = () => Cookie.remove(TokenKey)
