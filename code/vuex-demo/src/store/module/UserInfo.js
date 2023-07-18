const userInfo = {
  namespaced: true,
  state: {
      userName: '',
      authorization: ''
  },
  mutations: {
      writeUserName(state, name) {
          // 这里的 `state` 对象是模块的局部状态
          state.userName = name;
      },
      writeAuthorization(state, auth) {
          // 这里的 `state` 对象是模块的局部状态
          state.authorization = auth;
      },
  }
}
export default userInfo;