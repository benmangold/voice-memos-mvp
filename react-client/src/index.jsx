import React from 'react';
import ReactDom from 'react-dom';
import MemoList from './components/MemoList.jsx'

const TEST_AUDIO = {url: 'audio/Test.m4a', title: 'testMemo'}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioMemos : [ TEST_AUDIO, TEST_AUDIO, TEST_AUDIO]
    }
  }

  render() {
    return(<div>
        HELLO WORLD
        <MemoList memoList={ this.state.audioMemos}/>
      </div>)
  }
}

ReactDom.render(<App/>, document.getElementById('app'));

export default App;