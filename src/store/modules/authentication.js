const state = {
    userId: localStorage.userId || null
};

const getters = {
    userId: (state) => state.userId,
    signedIn: (state) => state.userId !== null
};

const actions = {
    setId(context, id) {
        localStorage.userId = id;
        context.commit('setId', id);
    },
    removeId(context) {
        localStorage.removeItem('userId');
        context.commit('removeId');
    }
};

const mutations = {
    setId: (state, id) => (state.userId = id),
    removeId: (state) => (state.userId = null)
};

export default {
    state,
    getters,
    actions,
    mutations
}