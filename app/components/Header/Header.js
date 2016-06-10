import React from 'react'
import Users from '../Users/Users'

import './Header.scss'

const Header = ({ data }) => {
  return (
    <header>
      <h1>Babblets</h1>
      <Users data={data} />
    </header>
  )
}

export default Header
