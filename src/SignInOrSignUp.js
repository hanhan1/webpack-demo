import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import './signInOrSignUp.css'
export default class SignInOrSignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'signUp'
    }
  }
  switch(e) {
    this.setState({
      selected: e.target.value
    })
  }
  render() {
    return (
      <div className="signInOrSignUp">
       <span>TodoList</span>
        <nav>

            <input type="radio" value="signUp" id="sign-up" name="nav"
              className={this.state.selected == "signUp" ? "checked":null}
              checked={this.state.selected === 'signUp'}
              onChange={this.switch.bind(this)} />
              <label htmlFor="sign-up"><span className="underline-left"></span>注册<span className="underline-right"></span></label>
        
          
            <input type="radio" value="signIn" name="nav" id="sign-in"
              className={this.state.selected === "signIn"? "checked" :null}
              checked={this.state.selected === 'signIn'}
              onChange={this.switch.bind(this)} />
              <label htmlFor="sign-in"><span className="underline-left"></span>登录<span className="underline-right"></span></label>
        </nav>
        <div className="panes">
          {this.state.selected === 'signUp' ? <SignUpForm formData={this.props.formData}
            onSubmit={this.props.onSignUp} onChange={this.props.onChange} /> : null}
          {this.state.selected === 'signIn' ? <SignInForm formData={this.props.formData}
            onSubmit={this.props.onSignIn} onChange={this.props.onChange}
            onForgotPassword={this.props.onForgotPassword} /> : null}
        </div>
      </div>
    )
  }
}