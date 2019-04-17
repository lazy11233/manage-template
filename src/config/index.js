export const baseURL =
  process.env.NODE_ENV === 'production'
    ? '/api/v1'
    : 'http://192.168.2.51:47300/mock/5cb6f055c48b341918f2c3d6/api/v1'
