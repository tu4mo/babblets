import React from 'react'
import UsersButton from '../UsersButton/UsersButton'
import UserList from '../UserList/UserList'

const Users = ({ data }) => {
  return (
    <UserList data={data} />
  )
}

export default Users
