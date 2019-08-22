/**
 * @file store
 * @author who
 */

import {getPageData} from '../common/lib/api/common';

/* eslint-disable */
const state = {
    tplData: {},
    loaded: false
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
/* eslint-enable */