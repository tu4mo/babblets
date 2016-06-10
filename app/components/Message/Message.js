import React from 'react'
import AutoLinkText from 'react-autolink-text'
import moment from 'moment'

import './Message.scss'

const Message = ({ user: messageUser, children, time }) => {
  return (
    <div className={'message' + (messageUser === user ? ' message--owner' : '')}>
      <div className="message__bubble">
        <div className="message__user">
          {messageUser}
        </div>
        <div className="message__text">
          <AutoLinkText text={children} />
        </div>
      </div>
      <div className="message__time">
        {moment(time).fromNow()}
      </div>
    </div>
  )
}

export default Message
