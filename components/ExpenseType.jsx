import React from 'react';
import { car, foodForkDrink, tag } from '../icons/expense-types/expense-type-icons';
import NumberPrimitive from '../Primitives/NumberPrimitive';
import { dots, pencil } from '../icons/icons';
import Ripples from 'react-ripples';
import AlertPrimitive from '../Primitives/AlertPrimitive';

export default class ExpenseType extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      menuIsOpened: false
    };
  }

  /**
   * Abre ou fecha o menu com base no seu estado
   */
  toggleMenu = () => {
    this.setState({ menuIsOpened: !this.state.menuIsOpened });
  };

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
   * Retorna a classe do menu com base no seu estado
   * @return {string}
   */
  get menuClass () {
    let className = 'menu';
    if (!this.state.menuIsOpened) {
      className += ' closed';
    }
    return className;
  }

  /**
   * Atualiza o limite do pai com base na função prop do pai
   */
  updateTypeAmount = () => {
    this.toggleMenu()
    AlertPrimitive.updateExpenseType(this.props.limit, limit => {
      this.props.updateType(this.props.id, limit)
    })
  }

  render () {
    return (
      <div className="expense-type">
        <div className="flex items-center">
          <img src={this.expenseTypeIcons[this.props.icon]} alt={this.props.name} className="icon"/>
          <div className="name">{this.props.name}</div>
        </div>
        <div className="flex items-center">
          <div className="limit">R$ {NumberPrimitive.toReal(this.props.limit)}</div>
          <Ripples className="options" onClick={this.toggleMenu} style={{ borderRadius: '100%' }}>
            <img src={dots} alt="Opções"/>
          </Ripples>
          <ul className={this.menuClass} id="type-menu" style={{ height: '46px', right: '30px' }}>
            <li>
              <div onClick={() => this.updateTypeAmount()} className="flex items-center">
                <img src={pencil} alt="Editar" className="icon"/>
                <div className="update">Editar</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
