import service from '@/utils/axios'

export type RegisterType = {
  username: string;
  email: string;
  password: string;
}

export type LoginType = {
  email: string;
  password: string;
}


// 注册接口
export const register = (data:RegisterType) => {
  return service({
    url: '/auth/register',
    method: 'post',
    data
  })
}
// 登入接口
export const login = (data:LoginType) => {
  return service({
    url: '/auth/login',
    method: 'post',
    data
  })
}
// 登出接口
export const logout = () => {
  return service({
    url: '/auth/logout',
    method: 'get'
  })
}
// 获取当前用户信息
export const getUserInfo = () => {
  return service({
    url: '/auth/me',
    method: 'get'
  })
}
