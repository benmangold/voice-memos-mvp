import React from 'react';
import ReactDom from 'react-dom';
import MemoList from './components/MemoList.jsx'
import axios from 'axios';

import AudioRecorder from './AudioRecorder/AudioRecorder.js'


const TEST_AUDIO = {url: 'audio/Test.m4a', title: 'testMemo'}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioMemos : [],
      value: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getMemos = this.getMemos.bind(this);
  }

  componentDidMount() {
    this.getMemos();
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
      this.getMemos()
    }).catch((error) => {
      console.log('Error Posting')
      console.log(error)
    })
  }
  
  getMemos() {
    axios.get('/memos')
    .then((response) => {
      console.log('Succesful Get!')
      this.setState({
        audioMemos: response.data
      })
    }).catch((err) => {
      console.log('Error Getting')
      console.log(err)
    })
  }

  handleDelete(id) {
    console.log('DELETE ' + id)
    axios.delete('/memos', { params: { id:id } })
    .then((response) => {
      console.log('Succesful Delete!')
      this.getMemos()
    }).catch((err) => {
      console.log('Error Deleting')
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
        {/* <button onClick= { this.getMemos } >Get Memos</button> */}
        <MemoList 
          memoList={ this.state.audioMemos }
          onDelete = { this.handleDelete }
          />
          <AudioRecorder/>
      </div>)
  }
}

ReactDom.render(<App/>, document.getElementById('app'));

export default App;