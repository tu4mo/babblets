import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Chat from '../Chat/Chat'
import styles from './Composer.scss'

export default class Composer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }
  }

  onTextChange(e) {
    this.setState({ text: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    let text = this.state.text.trim()
    if (!text) {
      return
    }

    this.props.onMessageSubmit({ text: text })
    this.setState({ text: '' })
    Chat.scrollToBottom()
    ReactDOM.findDOMNode(this.refs.composerInput).focus()
  }

  render() {
    return (
      <div className="composer">
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            className="composer__field"
            type="text"
            placeholder="Write a message"
            value={this.state.text}
            ref="composerInput"
            autoFocus
            onChange={this.onTextChange.bind(this)}
          />
          <input
            className="composer__button"
            type="submit"
            value="Send"
            disabled={!this.state.text}
          />
        </form>
      </div>
    )
  }
}
