import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'
import './reset.css'
import UserDialog from './UserDialog'
import './localStore'
import { getCurrentUser, signOut, TodoModel, loadList,updateListTable,saveListTable} from './leanCloud'
import {Button} from 'element-react'
import 'element-theme-default'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getCurrentUser() || {},
      newTodo: '',
      todoList: []
    }
    // let user = getCurrentUser()
    // if (user) {
    //   TodoModel.getByUser(user, (todos) => {
    //     let stateCopy = JSON.parse(JSON.stringify(this.state))
    //     stateCopy.todoList = todos
    //     this.setState(stateCopy)
    //   })
    // }
    // if(this.state.user){
    //   this.initTodoList.call(this)
    // }
  }
  render() {
    let todos = this.state.todoList
      .filter((item) => !item.deleted)
      .map((item, index) => {
        return (
          <li key={index}>

            <TodoItem todo={item} onToggle={this.toggle.bind(this)}
              onDelete={this.delete.bind(this)} id={item.id}
            />
          </li>
        )
      })



    return (
      <div className="App">
        <h1>{this.state.user.username || '我'}的待办
       {this.state.user.id ? <Button type="primary" onClick={this.signOut.bind(this)}>登出</Button> : null}
        </h1>

        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo}
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id ? null : <UserDialog
          onSignUp={this.onSignUpOrSignIn.bind(this)}
          onSignIn={this.onSignUpOrSignIn.bind(this)}
        />}
      </div>
    )
  }
  signOut() {
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    stateCopy.todoList =[]
    this.setState(stateCopy)
  }

  onSignUpOrSignIn(user) {
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)
    this.initTodoList.call(this)
  }

  componentWillMount(){
    if(this.state.user){
      this.initTodoList.call(this)
    }
  }
  componentDidMount(){
    window.addEventListener('resize',(function(e){
      let width = window.innerWidth
      
    }))
  }
  initTodoList(){
    function success(list){
      this.state.todoList = list;
      
      this.setState({
        todoList:this.state.todoList
      });
    }
    function error(){
      this.addTodo('null',true)
      let stateCopy = JSON.parse(JSON.stringify(this.state))
      this.setState(stateCopy)
      this.initTodoList.call(this)
    }
    loadList(this.state.user.id,success.bind(this),error)
    
    
  }
  toggle(e, todo) {
    let oldStatus = todo.status
    todo.status = todo.status === 'completed' ? '' : 'completed'
    // TodoModel.update(todo, () => {
    //   this.setState(this.state)
    // }, (error) => {
    //   todo.status = oldStatus
    //   this.setState(this.state)
    // })
    this.setState(this.state)

    updateListTable(this.state.user,todo.id,'status',todo.status)
  }
  changeTitle(event) {
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  addTodo(event) {
    let newTodo = {
      id:null,
      title: event.target.value,
      status: '',
      deleted: false
    }
    // TodoModel.create(newTodo, (id) => {
    //   newTodo.id = id
    //   this.state.todoList.push(newTodo)
    //   this.setState({
    //     newTodo: '',
    //     todoList: this.state.todoList
    //   })
    // }, (error) => {
    //   console.log(error)
    // })
    function success(num){
      newTodo.id = num
      this.state.todoList.unshift(newTodo);
      this.setState({
        newTodo:'',
        todoList:this.state.todoList
      });
    }
    function error(){

    }
    saveListTable(newTodo,this.state.user,success.bind(this),error)
  }


  delete(event, todo) {
    // TodoModel.destory(todo.id, () => {
    //   todo.deleted = true
    //   this.setState(this.state)
    // })
    todo.deleted = true
    this.setState(this.state)
    updateListTable(this.state.user,todo.id,'deleted',true)
  }
}

export default App;

// let id = 0;
// function idMaker() {
//   id += 1
//   return id
// }
