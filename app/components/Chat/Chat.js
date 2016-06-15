import React, { Component } from 'react'
import $ from 'jquery'
import Header from '../Header/Header'
import Composer from '../Composer/Composer'
import MessageList from '../MessageList/MessageList'
import UserList from '../UserList/UserList'
import io from 'socket.io-client'

const socket = io(window.location.origin)

export default class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      users: []
    }

    socket.emit('room', this.props.room)

    socket.on('new message', message => {
      const messages = [...this.state.messages, message]
      this.setState({ messages })
    })
  }

  loadMessages() {
    $.ajax({
      url: this.props.messagesurl,
      dataType: 'json',
      cache: false,
      success: ({ users, messages }) => {
        this.setState({
          users,
          messages
        })
      },
      error: (xhr, status, err) => {
        console.error(this.props.messagesurl, status, err.toString())
      }
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
    this.loadMessages()
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
          messages={this.state.messages}
          user={this.props.user}
        />
        <Composer onMessageSubmit={this.onMessageSubmit.bind(this)} />
      </div>
    )
  }
}
