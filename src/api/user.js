import axios from './index'

export const getUerInfo = () => {
  return axios.request({
    url: '/user/info?token=admin',
    method: 'get'
  })
}
