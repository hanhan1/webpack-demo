import React,{ Component } from 'react';
import './TodoItem.css'
import {Button,Checkbox} from 'element-react'
import 'element-theme-default'
export default class TodoItem extends Component{
  render(){
    return (
      <div className="TodoItem">
        <Checkbox checked={this.props.todo.status === 'completed'}> </Checkbox>
        <input type="checkbox" id={this.props.id} className={this.props.todo.status}
          checked = {this.props.todo.status === 'completed'}
          onChange = {this.toggle.bind(this)}/>
        <span className="title">{this.props.todo.title}</span>
        <Button type="text" onClick={this.delete.bind(this)}>删除</Button>
      </div>
    )
  }
  toggle(e){
    this.props.onToggle(e,this.props.todo)
  }
  delete(e){
    this.props.onDelete(e,this.props.todo)
  }
}