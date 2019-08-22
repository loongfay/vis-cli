/**
 * @file activity module
 * @author zhaolongfei
 */

import {getPageData} from '../common/lib/api/common';

/*eslint-disable*/

const state = {
    tplData: {},
    loaded: false,
    baseLog: {}
};

const getters = {};

const actions = {
    enter(store, data) {
        return getPageData({
            url: store.rootState.url,
            store: store
        }).then(pageData => {
            store.commit('update', pageData);
        });
    },
    leave({commit}) {
        commit('destroy');
    }
};

const mutations = {
    update(state, data) {
        state.tplData = data.tplData;
        state.loaded = true;
        state.baseLog = data.extData && data.extData.baseLog;
    },
    destroy(state) {
        state.loaded = false;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
