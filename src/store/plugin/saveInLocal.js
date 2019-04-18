// 将 vuex 中的数据存储到 localStorage 中，防止页面刷新后vuex数据丢失
export default store => {
  if (localStorage.state) {
    store.replaceState(JSON.parse(localStorage.state))
  }
  store.subscribe((mutation, state) => {
    localStorage.state = JSON.stringify(state)
  })
}
