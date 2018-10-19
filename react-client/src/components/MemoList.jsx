import React from 'react';


class MemoList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div>
      { this.props.memoList.map(({ url, title }, index, collection) => {
        return <div key={ index }>{ title } <audio controls><source src={ url } type="audio/mpeg"></source></audio></div>
      })}
      </div>);
  }
}

export default MemoList;