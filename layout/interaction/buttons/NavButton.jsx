import React from 'react';
import { Button, Text } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';

export default class NavButton extends React.Component {

  constructor (props) {
    super(props);
    this.createStyle(props)
  }

  createStyle () {
    this.style = StyleSheet.create({
      button: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
      },
      icon: {
        fontSize: 33,
        marginRight: 0
      },
      label: {
        fontSize: 15,
        marginTop: 0,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center'
      },
      general: {
        width: '33%'
      }
    })
  }

  createMainStyle () {
    return {
      backgroundColor: '#ff4a57',
      borderRadius: 100,
      width: 800,
      height: 71,
      left: 20,
      right: 30,
      top: 50,
      zIndex: 1,
      position: 'absolute'
    }
  }

  /**
   * retorna se o botão esta ativado ou não
   * @return {*|boolean}
   */
  get isActive () {
    return this.props.active !== undefined ? this.props.active : true
  }

  //render () {
  //  if (this.isActive) {
  //    return (
  //      <Ripples onClick={this.props.onClick} className={this.buttonClass} color={'rgba(255, 255, 255, 0.3)'}>
  //        <img src={this.props.icon} alt={this.props.title} className="icon"/>
  //        <span className="title">{this.props.title}</span>
  //      </Ripples>
  //    );
  //  }
//
  //  return ''
  //}

  render () {
    if (this.isActive) {
      return (
        <Button style={this.style.general} icon={this.props.icon} contentStyle={this.style.button} labelStyle={this.style.icon} onPress={this.props.onPress} color="white" >
          <Text style={this.style.label}>{this.props.title}</Text>
        </Button>
      )
    }
    return null
  }
}
