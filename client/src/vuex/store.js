import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

var http = axios.create({
  baseURL: 'http://localhost:3000/'
})

const state = {
  todo: []
}

const mutations = {
  setTodo(state, payload) {
    state.todo = payload;
  },
  submitTodo(state, payload) {
    state.todo.push(payload);
  },
  deleteTodo(state,payload) {
    var removeTodo = state.todo.filter((todo) => todo._id != payload)
    state.todo = removeTodo
  },
  updateStatus(state,payload) {
    state.status = true;
  }
}

const actions = {
  getTodo({ commit }) {
    var config = {
      headers: {
        token: localStorage.getItem('Token') || localStorage.getItem('token')
      }
    };
    http.get('/todo/id/'+ localStorage.getItem('id'), config)
      .then(({
        data
      }) => {
        commit('setTodo', data)
      })
      .catch(err => console.error(err));
  },
  addTodo({ commit }, newTodo) {
    var config = {
      headers: {
        token: localStorage.getItem('Token') || localStorage.getItem('token')
      }
    };
    http.post('/todo', newTodo, config)
      .then(({ data }) => {
        commit('submitTodo', data)
        newTodo.content = ''
      })

      .catch(err => console.error(err));
  },
  rmvTodo({ commit }, todoID) {
    var hapus = ({
      headers: {
        token : localStorage.getItem('Token') || localStorage.getItem('token')
      }
    })
    http.delete(`/todo/${todoID}`, hapus)
    .then(({data}) => {
      commit('deleteTodo',todoID)
    })
    .catch(err => res.status(500).  send(err))
  },
  updStatus({ commit }, task) {
    var config = {
      headers: {
        token: localStorage.getItem('Token') || localStorage.getItem('token')
      }
    }
    if(task.status == true) {
      task.status = false
    } else {
      task.status = true
    }
    http.put(`/todo/${task._id}`, task, config)
    .then(({data}) => {
      commit('updateStatus', data)
    })
    .catch(err => console.log(err))
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
