import React from 'react';
import Thread from './Thread';

const ThreadList = props => (
  <div className="threadList">
    {props.data.map(thread => (
      <Thread key={thread.id} thread={thread}/>
    ))}
  </div>
);

export default ThreadList;