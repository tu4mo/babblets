import React from 'react'

import AutoLinkText from 'react-autolink-text'
import moment from 'moment'

import styles from './Message.scss'

export default class Message extends React.Component {
  render() {
    return (
      <div className={'message ' + (this.props.user == user ? 'message--owner' : '')}>
        <div className="message__bubble">
          <div className="message__user">
            {this.props.user}
          </div>
          <div className="message__text">
            <AutoLinkText text={this.props.children} />
          </div>
        </div>
        <div className="message__time">
          {moment(this.props.time).fromNow()}
        </div>
      </div>
    )
  }
}
