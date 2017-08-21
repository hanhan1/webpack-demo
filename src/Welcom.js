import React from 'react';
class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }
    setInterval(() => {
      this.setState({
        date: new Date()
      })
    })
    console.log('我已经在constructor里将props和state初始化好了')
  }
  componentWillMount() {
    console.log('运行到这里马上要开始render了')
  }
  render() {
    console.log('嗯，这里是render')
    return (
      <div>
        <h1>hello,{this.props.name}</h1>
        <h2>{this.state.date.toString()}</h2>
      </div>
    )
  }
  componentDidMount() {
    console.log('已经挂载到页面里了')
  }
}


export default Welcome