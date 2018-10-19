import React from 'react';


class MemoList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div>
      { this.props.memoList.map(({ url, title, _id }, index, collection) => {
        console.log('MEMO ID ' + _id)
        return <div key={ index }>{ title }
                  <audio controls>
                    <source src={ url } type="audio/mpeg"></source>
                  </audio>
                  <button onClick= { () => { this.props.onDelete(_id) } } >Delete</button>
                </div>
      })}
      </div>);
  }
}

export default MemoList;