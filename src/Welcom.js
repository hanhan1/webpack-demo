import React from 'react';
class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      test: '1'
    }
    setInterval(() => {
      this.setState({
        date: new Date(),
        test: 'constructor'
      })
    },5000)
    console.log('我已经在constructor里将props和state初始化好了')
  }
  componentWillMount() {
    // this.setState({
    //   date: new Date(),
    //   test: 'componentWillMount'
    // })
    console.log('运行到这里马上要开始render了')
  }
  render() {
    // this.setState({
    //   date: new Date(),
    //   test: 'render'
    // })
    console.log('嗯，这里是render')
    return (
      <div>
        <h1>hello,{this.props.name}</h1>
        <h2>{this.state.date.toString()}</h2>
        <p>{this.state.test}</p>
      </div>
    )
  }
  componentDidMount() {
    this.setState({
      date: new Date(),
      test: 'componentDidMount'
    })
    console.log('已经挂载到页面里了')
  }
  componentWillReceiveProps(){
    this.setState({
      date:new Date(),
      test:'componentWillReceiveProps'
    })
  }

  shouldComponentUpdate(){
    this.setState({
      date:new Date(),
      test:'shouldComponentUpdate'
    })
    return true
  }

  componentWillUpdate(){
    // this.setState({
    //   date:new Date(),
    //   test:'componentWillUpdate'
    // })
  }

  componentDidUpdate(){
    // this.setState({
    //   date:new Date(),
    //   test:'componentDidUpdate'
    // })
  }

  componentWillUnmount(){
    console.log('要死啦')
  }
}


export default Welcome