// import {queryUserInfo} from '../../services/header'
// initial state
//F5刷新会造成vux数据丢失，故而从缓存里拿
const state = {
    userInfo: {}
}

// getters
const getters = {
    isLogined: state => Object.keys(state.userInfo).length? true: false
}

// actions
const actions = {
    // async queryUserInfo({dispatch, commit}) {
    //     commit('setUserInfo', {});
    //     const data = await queryUserInfo();
    //     commit('setUserInfo', data.data);
    // }
}

// mutations
const mutations = {
    // setUserInfo(state, userInfo) {
    //     state.userInfo = userInfo
    // }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
