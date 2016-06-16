import React from 'react'
import './UserList.scss'

const UserList = ({ data }) => {
  let users = []

  if (data) {
    users = data.map(user => {
      let lastActive = 'unactive'

      if (user.last_active) {
        let secondsUnactive = (Date.now() - Date.parse(user.last_active)) / 1000

        if (secondsUnactive < 30) {
          lastActive = 'active'
        }
      }

      return (
        <div className="user-list__user" key={user._id}>
          <div className="user-list__name">
            {user.email}
          </div>
          <div className="user-list__last-active">
            {lastActive}
          </div>
        </div>
      )
    })
  }

  return(
    <div className="user-list">
      {users}
    </div>
  )
}

export default UserList
