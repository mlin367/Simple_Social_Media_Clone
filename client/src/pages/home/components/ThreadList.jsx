import React from 'react';
import FrontThread from './FrontThread';

const ThreadList = props => (
  <div className="threadList">
    {props.data.map(thread => (
      <FrontThread key={thread.id} thread={thread}/>
    ))}
  </div>
);

export default ThreadList;