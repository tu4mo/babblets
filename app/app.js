import React from 'react'
import ReactDOM from 'react-dom'
import Chat from './components/Chat/Chat'

import './stylesheets/base.scss'

ReactDOM.render(
  <Chat messagesurl={'/api/messages?user=' + user + '&token=' + token} />,
  document.getElementById('content')
)
