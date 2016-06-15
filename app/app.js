import React from 'react'
import { render } from 'react-dom'
import Chat from './components/Chat/Chat'

import './stylesheets/base.scss'

const url = `/api/messages?user=${babblets.user}&token=${babblets.token}`

render(
  <Chat
    messagesurl={url}
    user={babblets.user}
    token={babblets.token}
    room={babblets.room}
  />,
  document.getElementById('content')
)
