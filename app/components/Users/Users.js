import React from 'react'

import UsersButton from '../UsersButton/UsersButton'
import UserList from '../UserList/UserList'

export default class Users extends React.Component {
  constructor() {
    super()
    this.state = {
      isOpen: false
    }
  }

  handleClick() {
    this.setState({ isOpen: true })
  }

  render() {
    return (
      <div>
        <UserList data={this.props.data} isOpen={this.state.isOpen} />
      </div>
    )
  }
}
