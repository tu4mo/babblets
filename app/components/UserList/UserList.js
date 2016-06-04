import React from 'react'

import moment from 'moment'

import styles from './UserList.scss'

export default class UserList extends React.Component {
  render() {
    let users = []

    if (this.props.data) {
      users = this.props.data.map(user => {
        let lastActive = 'unactive'

        if (user.last_active) {
          let secondsUnactive = (Date.now() - Date.parse(user.last_active)) / 1000

          if (secondsUnactive < 30) {
            lastActive = 'active'
          }
        }

        return (
          <div className='userlist-user' key={user._id}>
            <div className='userlist-user__name'>
              {user.email}
            </div>
            <div className='userlist-user__last-active'>
              {lastActive}
            </div>
          </div>
        )
      })
    }

    return(
      <div className='userlist'>
        {users}
      </div>
    )
  }
}
