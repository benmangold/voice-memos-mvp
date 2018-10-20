import React from 'react';


class MemoList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div>
      { this.props.memoList.map(({ url, title, _id }, index, collection) => {
        return <div key={ index }>{ title }<br/>
                  <audio controls>
                    <source src={ url } type="audio/mpeg"></source>
                  </audio>
                  <button onClick= { () => { this.props.onDelete(_id) } } >Delete</button>
                  {/* <button onClick= { () => { this.props.onEditTitle(_id) } } >Edit Title</button> */}
                </div>
      })}
      </div>);
  }
}

export default MemoList;