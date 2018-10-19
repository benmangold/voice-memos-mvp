import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioMemos : [{url: 'http://127.0.0.1:3000/audio/Test.m4a', title: 'testMemo'}]
    }
  }

  render() {
    return(<div>HELLO WORLD</div>)
  }
}

ReactDom.render(<App/>, document.getElementById('app'));

export default App;