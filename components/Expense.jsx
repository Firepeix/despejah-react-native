import React from 'react';
import { StyleSheet, View } from 'react-native';
import DatePrimitive from '../Primitives/DatePrimitive';
import NumberPrimitive from '../Primitives/NumberPrimitive';
import { Text, TouchableRipple, Menu, Divider } from 'react-native-paper';
import Icon from 'react-native-paper/lib/module/components/Icon';

export default class Expense extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      menuIsOpened: false
    }
    this.createStyle()
  }

  /**
   * Cria o estilo nos componentes para utilização
   */
  createStyle () {
    this.style = StyleSheet.create({
      expense: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 8,
        fontWeight: '700',
        marginTop: 20
      },
      section:{
        flex: 1,
        justifyContent: 'space-between',
      },
      name: {
        fontWeight: '700',
        fontSize: 20,
      },
      date: {
        fontSize: 15,
        color: '#a4a4a4'
      },
      type: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        flexDirection: 'row',
        fontWeight: '400'
      },
      amount: {
        paddingTop: 30,
        fontSize: 20,
        textAlign: 'right',
        color: '#ff4a57',
        fontWeight: '700'
      }
    })
  }

  /**
   * Ativa ou desativa o menu
   */
  toggleMenu = () => {
    this.setState({ menuIsOpened: true })
  }

  /**
   * Busca o modelo da Expense com base nas propriedades
   * @return {{date, amount, name, typeId, id}}
   */
  get expense () {
    return {
      id: this.props.id,
      name: this.props.name,
      date: this.props.date,
      typeId: this.props.type.id,
      amount: this.props.amount
    }
  }

  render () {
    return (
      <View style={this.style.expense}>
        <View style={this.style.section}>
          <Text style={this.style.name}>{this.props.name}</Text>
          <Text style={this.style.date}>{DatePrimitive.toEURDateString(this.props.date)}</Text>
          <View style={this.style.type}>
            <Icon source={this.props.type.icon} size={22} />
            <Text style={{marginLeft: 6, fontSize: 18}}>{this.props.type.name}</Text>
          </View>
        </View>
        <View style={{...this.style.section, alignItems: 'flex-end'}}>
          <Menu
            visible={this.state.menuIsOpened}
            onDismiss={() => {this.setState({menuIsOpened: false})}}
            anchor={<TouchableRipple borderless={true} onPress={this.toggleMenu} rippleColor="rgba(255, 255, 255, .32)">
              <Icon source={'dots-vertical'} size={35} />
            </TouchableRipple>}>
            <Menu.Item icon="pencil" onPress={() => this.props.handleEditExpense(this.expense)} title="Editar" />
            <Divider/>
            <Menu.Item icon="minus" onPress={() => this.props.handleDeleteExpense(this.props.id)} title="Deletar" />
          </Menu>
          <Text style={this.style.amount}>R$ {NumberPrimitive.toReal(this.props.amount)}</Text>
        </View>
      </View>
    );
  }
}
