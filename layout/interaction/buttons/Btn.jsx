import React from 'react';
import './Btn.css'
export default class Btn extends React.Component{
  render () {
    return (<button onClick={this.props.onClick} className={'btn'}>{this.props.children}</button>)
  }
}
