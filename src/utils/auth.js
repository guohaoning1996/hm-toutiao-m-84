
// 权限认证令牌
const USER_KEY = 'hm-toutiao-m-84'
// 获取token
export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(USER_KEY) || '{}')
  // return window.localStorage.getItem(USER_KEY) || {}
  // typeof(window.localStorage.getItem('hm-toutiao-m-84')) 得到的结果是字符串类型，为什么可以直接点的方式使用
}
// 设置token
export const setUser = (user) => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user))
}
// 删除token
export const delUser = () => {
  window.localStorage.removeItem(USER_KEY)
}
