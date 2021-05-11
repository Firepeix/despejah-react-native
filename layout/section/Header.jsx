import React from 'react';
import './Header.css'

class Header extends React.Component {
  render () {
    return (
      <header>
        <div className="title">{this.props.title}</div>
        <div className="logo">
          DespeJá
        </div>
      </header>
    )
  }
}

export default Header
