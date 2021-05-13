import React from 'react';
import Page from './Page';
import { View } from 'react-native';
import Expense from '../components/Expense';

export default class Expenses extends Page{
  constructor (props) {
    super(props);
    this.state = {
      expenses: [],
      types: [],
      loaded: false
    }
  }


  createStyle () {
    super.createStyle({
      page: {
        marginBottom: 70
      }
    });
  }

  componentDidMount () {
    this.props.expenseTypeService.getExpenseTypes(true).then(types => {
      this.props.expenseService.getExpenses().then(expenses => {
        this.setState({
          types,
          loaded: true,
          expenses
        })
      })
    })
  }

  /**
   * Retorna o titulo da pagina
   * @param props
   * @return {string}
   */
  static title (props) {
    return 'Despesas'
  }

  /**
   * Muda de pagina para ir para o formulario de edição
   * @param expense
   */
  editExpense = (expense) => {
    this.props.changePage('newExpense', { savedExpense: expense })
  }

  /**
   * Deleta a despesa e seta o estado do componente
   * @param id
   */
  deleteExpense = async id => {
    await this.props.expenseService.deleteExpense(id)
    this.props.toast('Despesa deletada com sucesso')
    const expenses = await this.props.expenseService.getExpenses()
    this.setState({
      expenses
    })
  }

  render () {
    if (this.state.loaded) {
      return (
        <View style={this.style.page}>
          {this.state.expenses.map((expense) =>
             <Expense handleDeleteExpense={this.deleteExpense} handleEditExpense={this.editExpense}
                      key={expense.id} id={expense.id} name={expense.name} date={expense.date} type={this.state.types[expense.typeId]} amount={expense.amount}/>
          )}
        </View>
      )
    }

    return null

  }
}
