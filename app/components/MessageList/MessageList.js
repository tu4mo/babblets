import React from 'react'

import Message from '../Message/Message'

import styles from './MessageList.scss'

export default class MessageList extends React.Component {
  render() {
    let messages = []

    if (this.props.data) {
      messages = this.props.data.map(message => {
        return (
          <Message user={message.user} key={message._id} time={message.time}>
            {message.text}
          </Message>
        )
      })
    }

    return (
      <div className="messagelist">
        {messages}
      </div>
    )
  }
}
