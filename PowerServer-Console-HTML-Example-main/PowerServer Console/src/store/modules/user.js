/**
 * 用户
 */

const state = {
  user: {
    language: 'cn', // 语言
    isLogin: false, // 是否登录
    info: {},       // 用户信息
    worktab: {      // 选项卡
      current: {},  // 当前
      opened: []    // 打开的
    },
    setting: {}     // 个性化设置及其它设置
  }
}

const getters = {
  user: (state) => state.user
}

const mutations = {
  // 初始化state
  initState() {
    let sys = JSON.parse(localStorage.getItem("sys"))
    if(sys && sys.user.info.ID) {
      state.user.info = sys.user.info
      state.user.isLogin = sys.user.isLogin
    }
  },
  // 用户数据持久化存储
  storeStorage(state, rootState) {
    state.user.worktab = rootState.worktab.worktab
    state.user.setting = rootState.setting.setting
    saveStoreStorage(state)
  },
  // 设置登录状态
  setLoginStatus(state, isLogin) {
    state.user.isLogin = isLogin

    let sys = JSON.parse(localStorage.getItem("sys"))
    if(sys) {
      sys.user.isLogin = isLogin
      saveStoreStorage(sys)
    }
  },
  // 设置语言
  setLanguage(state, lang) {
    state.user.language = lang

    let sys = JSON.parse(localStorage.getItem("sys"))
    if(sys) {
      sys.user.language = lang
      saveStoreStorage(sys)
    }
  },
  // 设置用户信息
  setUserInfo(state, e) {
    state.user.info = e.user
    state.user.info.token = e.token
    let sys = JSON.parse(localStorage.getItem("sys"))

    if(sys) {
      sys.user.info = e.user
      sys.user.info.token = e.token
      saveStoreStorage(sys)
    }else {
      sys = {
        user: state.user
      }
      saveStoreStorage(sys)
    }
  }
}

const actions = {
  initState ({commit }) {
    commit('initState')
  },
  storeStorage({commit, rootState}) {
    commit('storeStorage', rootState)
  },
  setLoginStatus({commit}, e) {
    commit('setLoginStatus', e)
  },
  setLanguage({commit}, e) {
    commit('setLanguage', e)
  },
  setUserInfo({commit}, e) {
    commit('setUserInfo', e)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

function saveStoreStorage(sys) {
  localStorage.setItem("sys",  JSON.stringify(sys))
}