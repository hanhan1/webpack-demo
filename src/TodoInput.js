import React, { Component } from 'react';
import './TodoInput.css'
import {Input} from 'element-react'
import 'element-theme-default'
export default class TodoInput extends Component {
  render() {
    return <input type="text" 
      className="TodoInput"
      onChange={this.changeTitle.bind(this)}
      onKeyPress={this.submit.bind(this)}
      placeholder="What needs to be done?" />
  }
  submit(e) {
    if (e.key === 'Enter') {
      console.log('用户按回车了');
      if (e.target.value.trim() !== '') {
        this.props.onSubmit(e)
        e.preventDefault();
      }
      
      //this.props.onSubmit.call()
    }
  }
  changeTitle(e) {
    this.props.onChange(e)
  }
}
