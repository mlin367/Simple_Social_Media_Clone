import React from 'react';
import Thread from './Thread';

const ThreadList = props => (
  <div className="threadList">
    {props.data.map(thread => (
      <Thread thread={thread}/>
    ))}
  </div>
);

export default ThreadList;