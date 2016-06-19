import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import './Composer.scss'

export default class Composer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onTextChange = this.onTextChange.bind(this)
  }

  onTextChange(e) {
    this.setState({ message: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const message = this.state.message.trim()

    if (!message) {
      return
    }

    this.props.onMessageSubmit(message)
    this.setState({ message: '' })
    findDOMNode(this.refs.composerInput).focus()
  }

  render() {
    return (
      <div className="composer">
        <form onSubmit={this.onSubmit}>
          <input
            className="composer__field"
            type="text"
            placeholder="Write a message"
            value={this.state.message}
            ref="composerInput"
            autoFocus
            onChange={this.onTextChange}
          />
          <input
            className="composer__button"
            type="submit"
            value="Send"
            disabled={!this.state.message}
          />
        </form>
      </div>
    )
  }
}
