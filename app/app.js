import React from 'react';
import ReactDOM from 'react-dom';

import Chat from './components/Chat/Chat';

import styles from './stylesheets/base.scss';

ReactDOM.render(
  <Chat messagesurl={'/api/messages?user=' + user + '&token=' + token} pollInterval={2000} />,
  document.getElementById('content')
);
