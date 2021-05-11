import React from 'react';
//import Home from '../../pages/Home';
//import Expenses from '../../pages/Expenses';
//import NewExpense from '../../pages/NewExpense';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import NavButton from '../interaction/buttons/NavButton';
import MainButton from '../interaction/buttons/MainButton';

export default class NavBar extends React.Component {

  constructor (props) {
    super(props);
    this.createStyle()
  }

  createStyle () {
    this.style = StyleSheet.create({
      bar: this.barStyle
    })
  }

  get barStyle () {
    return {
      backgroundColor: '#ff828b',
      flexDirection: 'row',
      width: '100%',
      color: 'white',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    }
  }

  /**
   * Emite o evento para mudar de paginas
   * @param page
   */
  changePages = (page) => {
    this.props.changePage(page)
  }

  render () {
    return (
      <View style={this.style.bar}>
        <NavButton onPress={() => console.log(123)} icon="home" title={'Home'}/>
        <MainButton onPress={() => console.log(123)} icon="plus" active={this.props.mainButton === 'newExpense'} title={'Despesa'} />
        <MainButton onPress={() => this.props.dispatchMainButtonClicked()} icon="check-bold" active={this.props.mainButton === 'saveExpense'} title={'Salvar'} />
        <NavButton onPress={() => console.log(123)} icon="format-list-bulleted" title={'Lista'} />
      </View>
    );
  }
}
