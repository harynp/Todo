<template lang="html">
  <div class="container col-sm-8 col-sm-offset-2">
    <div id="App">
      <h1 class="text-center">Daftar Task Kamu</h1>
      <div class="panel panel-default">
        <h4 class='text-center'>Todo List</h4>
        <form>
          <div class="col-sm-8">
            <input type="text" class='form-control' v-model='todos.content' placeholder="Input Task">
          </div>
          <div class="col-sm-4">
            <input type="button" value='Add' v-on:click="addTodo(todos)" class='btn btn-primary btn-block'>
          </div>
        </form>
        &nbsp;
      </div>
      <table class="table">
        <thead>
          <th>Status</th>
          <th>Description</th>
          <th>Action</th>
        </thead>
        <tbody>
           <tr v-for='task in todo' :class="{ taskStatus: task.status }">
            <td><input type="checkbox" v-model="task.status" v-on:click="updStatus(task)"></td>
            <td><span>{{ task.content }}</span></td>
            <td><button class="fa fa-trash-o btn btn-danger" v-on:click="rmvTodo(task._id)"></button></td>
           </tr>
        </tbody>
      </table>
    </div>
    <button class="fa fa-sign-out btn btn-danger" aria-hidden="true" v-on:click="logout()">LOGOUT</button>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  data () {
    return {
      todos: {
        content: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'getTodo',
      'addTodo',
      'rmvTodo',
      'updStatus'
    ]),
    logout: function () {
      localStorage.clear()
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState([
    'todo'
  ])
  },
  created () {
    this.getTodo()
  }
}
</script>



<style lang="css" scoped>
th {
  text-align: center;
}
.taskStatus {
  text-decoration: line-through;
}
</style>
