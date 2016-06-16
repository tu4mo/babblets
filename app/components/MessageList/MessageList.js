import React from 'react'
import Message from '../Message/Message'
import './MessageList.scss'

const MessageList = props => {
  let messages = []

  if (props.messages) {
    messages = props.messages.map(({ user, _id, time, message }) => {
      return (
        <Message
          user={user}
          owner={user === props.user}
          key={_id}
          time={time}
          message={message}
        />
      )
    })
  }

  return (
    <div className="message-list">
      {messages}
    </div>
  )
}

export default MessageList
