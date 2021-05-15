import React from 'react';
import { Text, TouchableRipple } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-paper/lib/module/components/Icon';

export default class MainButton extends React.Component {

  constructor (props) {
    super(props);
    this.createStyle(props)
  }

  createStyle () {
    this.style = StyleSheet.create({
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#ff4a57',
        borderRadius: 200,
        width: 90,
        height: 90,
        textAlign: 'center',
        marginTop: -60
      },
      label: {
        fontSize: 19,
        fontWeight: '700',
        color: 'white',
      }
    })
  }

  /**
   * retorna se o botão esta ativado ou não
   * @return {*|boolean}
   */
  get isActive () {
    return this.props.active !== undefined ? this.props.active : true
  }

  render () {
    if (this.isActive) {
      return (
        <TouchableRipple style={this.style.button} onPress={this.props.onPress} rippleColor="rgba(255, 255, 255, .32)">
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon source={this.props.icon} size={33} color={'white'} />
            <Text style={this.style.label}>{this.props.title}</Text>
          </View>
        </TouchableRipple>
      )
    }
    return null
  }
}
