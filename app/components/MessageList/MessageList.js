import React from 'react'
import Message from '../Message/Message'
import styles from './MessageList.scss'

const MessageList = ({ data }) => {
  let messages = []

  if (data) {
    messages = data.map(message => {
      return (
        <Message user={message.user} key={message._id} time={message.time}>
          {message.message}
        </Message>
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
