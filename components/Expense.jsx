import React from 'react';
import DatePrimitive from '../Primitives/DatePrimitive';
import { car, foodForkDrink, tag } from '../icons/expense-types/expense-type-icons'
import { dots, pencil, minusCircle } from '../icons/icons';
import NumberPrimitive from '../Primitives/NumberPrimitive';
import Ripples from 'react-ripples'
import './Expense.css'

export default class Expense extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      menuIsOpened: false
    }
  }

  /**
   * Tabela HASH que retorna o icone svg a partir do id
   * @return {{'food-fork-drink', car, tag}}
   */
  get expenseTypeIcons () {
    return {
      'food-fork-drink': foodForkDrink,
      car: car,
      tag: tag
    };
  }

  /**
   * Ativa ou desativa o menu
   */
  toggleMenu = () => {
    this.setState({ menuIsOpened: !this.state.menuIsOpened })
  }

  /**
   * Retorna a classe do menu baseado em seu estado
   * @return {string}
   */
  get menuClass () {
    let className = 'menu'
    if (!this.state.menuIsOpened) {
      className += ' closed'
    }
    return className
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
      <div className="expense">
        <div className="flex column content-between">
          <div className="name">{this.props.name}</div>
          <div className="date">{DatePrimitive.toEURDateString(this.props.date)}</div>
          <div className="type">
            <img src={this.expenseTypeIcons[this.props.type.icon]} style={{marginRight: '6px'}} alt="Home" className="icon"/>
            <div className="type-name">{this.props.type.name}</div>
          </div>
        </div>
        <div className="flex column items-end more">
          <Ripples className="options" onClick={this.toggleMenu}>
            <img src={dots} alt="Opções"/>
          </Ripples>
          <ul className={this.menuClass} id="expense-menu" style={{ height: '97px' }}>
            <li>
              <div onClick={() => this.props.handleEditExpense(this.expense)} className="flex items-center">
                <img src={pencil} alt="Editar" className="icon"/>
                <div className="update">Editar</div>
              </div>
            </li>
            <li>
              <div onClick={() => this.props.handleDeleteExpense(this.props.id)} className="flex items-center">
                <img src={minusCircle} alt="Deletar" className="icon"/>
                <div className="delete">Deletar</div>
              </div>
            </li>
          </ul>
          <div className="amount">R$ {NumberPrimitive.toReal(this.props.amount)}</div>
        </div>
      </div>
    );
  }
}
