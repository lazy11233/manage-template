import axios from './index'

export const getUserInfo = (token) => {
  return axios.request({
    url: `/userinfo?token=${token}`,
    method: 'get'
  })
}

export const login = ({ username, password }) => {
  return axios.request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
