import React from 'react';
import NumberPrimitive from '../Primitives/NumberPrimitive';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-paper/lib/module/components/Icon';

export default class ExpenseResume extends React.Component {
  constructor (props) {
    super(props);
    this.createStyle()
  }

  /**
   * Cria o estilo nos componentes para utilização
   */
  createStyle () {
    this.style = StyleSheet.create({
      resume: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 6,
        paddingTop: 2,
        borderBottomWidth: this.props.withoutBorder ? 1 : 0,
        borderTopWidth: this.props.withoutBorder ? 1 : 0,
        borderBottomColor: '#cfcfcf',
        borderTopColor: '#cfcfcf',
      },
      amount: {
        fontSize: 17,
        textAlign: 'right',
        color: '#a4a4a4',
        fontWeight: '700'
      },
    })
  }

  render () {
    return (
      <View style={this.style.resume}>
       <View style={{flexDirection: 'row', alignItems: 'center'}}>
         <Icon size={30} source={this.props.type.icon}/>
         <Text style={{marginLeft: 5, fontSize: 16}}>{this.props.name}</Text>
       </View>
        <Text style={this.style.amount}>R$ {NumberPrimitive.toReal(this.props.amount)}</Text>
      </View>
    )
  }
}
