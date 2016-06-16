import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMessages, newMessage } from '../../actions'
import Header from '../../components/Header/Header'
import Composer from '../../components/Composer/Composer'
import MessageList from '../../components/MessageList/MessageList'
import UserList from '../../components/UserList/UserList'
import io from 'socket.io-client'

const socket = io(window.location.origin)

export default class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: []
    }

    socket.emit('room', this.props.room)

    socket.on('new message', message => {
      this.props.newMessage(message)
      Chat.scrollToBottom()
    })
  }

  onMessageSubmit(message) {
    socket.emit('new message', {
      user: this.props.user,
      token: this.props.token,
      message
    })
  }

  componentWillMount() {
    this.props.getMessages()
  }

  componentDidMount() {
    Chat.scrollToBottom()
  }

  componentWillUpdate() {
    this.shouldScrollBottom = document.body.scrollTop === document.body.scrollHeight - window.innerHeight
  }

  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      Chat.scrollToBottom()
    }
  }

  static scrollToBottom() {
    document.body.scrollTop = document.body.scrollHeight
  }

  render() {
    return (
      <div className="chat">
        <Header data={this.state.users} />
        <MessageList
          messages={this.props.messages}
          user={this.props.user}
        />
        <Composer onMessageSubmit={this.onMessageSubmit.bind(this)} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { messages: state.messages }
}

export default connect(mapStateToProps, { getMessages, newMessage })(Chat)
