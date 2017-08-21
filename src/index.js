import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Welcome from './Welcom';
ReactDOM.render(<App />, document.getElementById('root'));

// ReactDOM.render(<h1>Hi world</h1>, document.getElementById('root'));
// function tick(){
//   const element = (
//     <div>
//       <h1>hello world</h1>
//       <h2>It is {new Date().toLocaleTimeString()}</h2>
//     </div>
//   );
//   ReactDOM.render(
//     element,
//     document.getElementById('root')
//   );
// }
// setInterval(tick,1000);

// class Welcom extends React.Component{
//   render(){
//     return <h1>hello Component</h1>;
//   }
// }
// ReactDOM.render(
//   <Welcome name="hanhan"/>,
//   document.getElementById('root')
// )
registerServiceWorker();
