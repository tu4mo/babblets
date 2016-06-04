import React from 'react';

import Composer from '../Composer/Composer';
import Header from '../Header/Header';
import MessageList from '../MessageList/MessageList';
import UserList from '../UserList/UserList';

import styles from './Chat.scss';

import $ from 'jquery';

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  loadMessages() {
    $.ajax({
      url: this.props.messagesurl,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({ data: data });
      },
      error: (xhr, status, err) => {
        console.error(this.props.messagesurl, status, err.toString());
      }
    })
  }

  handleMessageSubmit(message) {
    $.ajax({
      url: this.props.messagesurl,
      dataType: 'json',
      type: 'POST',
      data: message,
      success: data => {
        // this.setState({ data: data });
      },
      error: (xhr, status, err) => {
        // this.setState({ data: messages });
        console.error(this.props.messagesurl, status, err.toString());
      }
    })
  }

  componentDidMount() {
    this.loadMessages();
    this.loadMessagesInterval = setInterval(this.loadMessages.bind(this), this.props.pollInterval);
    Chat.scrollToBottom();
  }

  componentWillUpdate() {
    this.shouldScrollBottom = document.body.scrollTop === document.body.scrollHeight - window.innerHeight;
  }

  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      Chat.scrollToBottom();
    }
  }

  componentWillUnmount() {
    clearInterval(this.loadMessagesInterval);
  }

  static scrollToBottom() {
    document.body.scrollTop = document.body.scrollHeight;
  }

  render() {
    return (
      <div className="chat">
        <Header data={this.state.data.users} />
        <MessageList data={this.state.data.messages} />
        <Composer onMessageSubmit={this.handleMessageSubmit.bind(this)} />
      </div>
    );
  }
}
