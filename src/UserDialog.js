import React, { Component } from 'react'
import './UserDialog.css'
import ForgotPasswordForm from './ForgotPasswordForm'
import SignInOrSignUp from './SignInOrSignUp'
import { signUp, signIn, sendPasswordResetEmail } from './leanCloud'
export default class UserDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'signInOrSignUp',
      formData: {
        email: '',
        username: '',
        password: '',
      }
    }
  }

  signUp(e) {
    e.preventDefault()
    let { email, username, password } = this.state.formData
    let dataCorrect = true
    if(username.length<3){
      alert('用户名长度至少为3个字符，请重新填写')
      dataCorrect = false
    }
    if(password.length<6){
      alert('密码长度至少为6位，请重新填写')
      dataCorrect = false
    }
    if(email.match(/@/) === null){
      alert('请填写正确的邮箱地址')
      dataCorrect =false
    }
    if(!dataCorrect){
      return
    }
    let success = (user) => {
      console.log(user)
      this.props.onSignUp.call(null, user)
    }
    let error = (error) => {
      switch (error.code) {
        case 202:
          alert('用户名已被占用')
          break;
        case 125:
        case 205:
          alert('请填写正确的邮箱地址')
          break
        default:
          alert(error)
          break
      }
    }
    signUp(username, password, success, error)
  }
  signIn(e) {
    e.preventDefault()
    let { username, password } = this.state.formData
    let success = (user) => {
      this.props.onSignIn.call(null, user)
    }
    let error = (error) => {
      switch (error.code) {
        case 210:
          alert('用户名与密码不匹配')
          break
        case 100:
          alert('无法连接到服务器，请检查网络连接')
          break
        case 124:
          alert('请求超时，请检查网络是否连接正常')
          break
        case 211:
          alert('找不到用户')
          break
        case 201:
          alert('密码不能为空')
          break
        default:
          alert(error)
          break
      }
    }
    signIn(username, password, success, error)
  }
  changeFormData(key, e) {
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.formData[key] = e.target.value
    this.setState(stateCopy)
  }
  render() {
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          {this.state.selectedTab === 'signInOrSignUp' ?
            <SignInOrSignUp
              formData={this.state.formData}
              onSignIn={this.signIn.bind(this)}
              onSignUp={this.signUp.bind(this)}
              onChange={this.changeFormData.bind(this)}
              onForgotPassword={this.showForgotPassword.bind(this)} />
            : <ForgotPasswordForm
              formData={this.state.formData}
              onSubmit={this.resetPassword.bind(this)}
              onChange={this.changeFormData.bind(this)}
              onSignIn={this.returnToSignIn.bind(this)} />}
        </div>
      </div>
    )
  }
  showForgotPassword() {
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = 'forgotPassword'
    this.setState(stateCopy)
  }
  resetPassword(e) {
    e.preventDefault()
    function successFn(success){
      alert('已发重置密码邮件到邮箱，请去邮箱检查并重置密码')
      let stateCopy = JSON.parse(JSON.stringify(this.state))
      stateCopy.selectedTab = 'signInOrSignUp'
      this.setState(stateCopy)
    }
    function errorFn(error){
      switch(error.code){
        case 1:
         alert('请不要往同一个邮件地址发送太多邮件')
         break
        case 205:
         alert('找不到使用此邮箱注册的用户')
         break
      }
    }
    if(this.state.formData.email.match(/@/) === null){
      alert('请输入正确的邮箱地址')
      return
    }
    sendPasswordResetEmail(this.state.formData.email)
  }
  returnToSignIn() {
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = 'signInOrSignUp'
    this.setState(stateCopy)
  }
}