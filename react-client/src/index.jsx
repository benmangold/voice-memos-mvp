import React from 'react';
import ReactDom from 'react-dom';
import MemoList from './components/MemoList.jsx'
import axios from 'axios';


const TEST_AUDIO = {url: 'audio/Test.m4a', title: 'testMemo'}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioMemos : [ TEST_AUDIO, TEST_AUDIO, TEST_AUDIO],
      value: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getMemos = this.getMemos.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('A name was submitted: ' + this.state.value);
    axios.post('/memos', {
      title: this.state.value
    }).then((response) => {
      console.log('Successful Post!')
      console.log(response);

    }).catch((error) => {
      console.log('Error')
      console.log(err)
    })
  }
  
  getMemos() {
    axios.get('/memos')
    .then((response) => {
      console.log('Succesful Get!')
      console.log(response);
      this.setState({
        audioMemos: response.data
      })
    }).catch((err) => {
      console.log('Error')
      console.log(err)
    })
  }



  render() {
    return(<div>
      Voice Memos
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={this.handleChange} />
        </label>
        <input type="submit" value='Submit' />
        </form>

        <button onClick= { this.getMemos } >Get Memos</button>
        <MemoList 
          memoList={ this.state.audioMemos }
        />
      </div>)
  }
}

ReactDom.render(<App/>, document.getElementById('app'));

export default App;