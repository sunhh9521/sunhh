const counter = {
  namespaced: true,

  // 这里的 state 对象是模块的局部状态
  state: {
      count: 10,
      info: 'This is counter'
  },

  getters: {
      doubleCount(state) {
          return state.count * 2;
      }
  },

  mutations: {
      increment(state) {
          state.count++;
      },
      decrement(state) {
          state.count--;
      }
  },

  actions: {
      asyncIncrement(context) {
          console.log('CounterStore=> action: asyncIncrement');
          setTimeout(() => {
              context.commit('increment')
          }, 1000)
      },
  }
}
export default counter;