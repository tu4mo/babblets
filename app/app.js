import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promise from 'redux-promise'
import Chat from './containers/Chat/Chat'

import reducers from './reducers'

import './stylesheets/base.scss'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Chat
      user={babblets.user}
      token={babblets.token}
      room={babblets.room}
    />
  </Provider>,
  document.getElementById('content')
)
