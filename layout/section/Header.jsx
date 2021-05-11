import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

class Header extends React.Component {
  constructor (props) {
    super(props);
    this.createStyle()
  }

  createStyle () {
    this.style = StyleSheet.create({
      header: {
        paddingRight: 24,
        paddingLeft: 24,
        flexDirection: 'row',
        alignItems: 'flex-end'
      },
      logo: {
        flex: 0.5,
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 18,
        alignItems: 'flex-end'
      },
      title: {
        fontWeight: '600',
        flex: 0.5,
      }
    })
  }

  render () {
    return (
      <View style={this.style.header}>
        <View style={this.style.title}><Text style={{fontWeight: '700', fontSize: 25}}>{this.props.title}</Text></View>
        <Text style={this.style.logo}>DespeJá</Text>
      </View>
    )
  }
}

export default Header
