import React from 'react';

import Users from '../Users/Users';

import styles from './Header.scss';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>Babblets</h1>
        <Users data={this.props.data} />
      </header>
    );
  }
}
