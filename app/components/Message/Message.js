import React from 'react'
import AutoLinkText from 'react-autolink-text'
import moment from 'moment'

import './Message.scss'

const Message = ({ user, owner, children, time, message }) => {
  return (
    <div className={'message' + (owner ? ' message--owner' : '')}>
      <div className="message__bubble">
        <div className="message__user">
          {user}
        </div>
        <div className="message__text">
          <AutoLinkText text={message} />
        </div>
      </div>
      <div className="message__time">
        {moment(time).fromNow()}
      </div>
    </div>
  )
}

export default Message
