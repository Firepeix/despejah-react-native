import React from 'react';
import ExpenseType from '../components/ExpenseType';
import Page from './Page';
import { View } from 'react-native';
import NumberPrimitive from '../Primitives/NumberPrimitive';

export default class ExpenseTypes extends Page {

  constructor (props) {
    super(props);
    this.state = {
      types: [],
      loaded: false,
    };
  }

  createStyle () {
    super.createStyle({
      page: {
        marginBottom: 70
      }
    });
  }

  /**
   * Retorna o titulo da pagina
   * @param props
   * @return {string}
   */
  static title (props) {
    return 'Categorias';
  }

  componentDidMount () {
    this.props.expenseTypeService.getExpenseTypes().then(types => {
      this.setState({types, loaded: true})
    })
  }

  /**
   * Emite o evento e o dialogo para edição de limite do tipo de despesa
   * @param id
   * @param newLimit
   */
  updateType = async (id, newLimit) => {
    const type = this.state.types.find(type => type.id === id)
    if (type !== undefined) {
      type.limit = NumberPrimitive.toInt(newLimit)
      await this.props.expenseTypeService.updateType(type)
      this.props.toast('Limite editado com sucesso')
      const types = await this.props.expenseTypeService.getExpenseTypes()
      this.setState({types})
    }
  };

  render () {
    if (this.state.loaded) {
      return (
        <View style={this.style.page}>
          {this.state.types.map(type =>
            <ExpenseType updateType={(id, limit) => this.updateType(id, limit)}
                         key={type.id} id={type.id} name={type.name} icon={type.icon} limit={type.limit}/>
          )}
        </View>);
    }

    return null
  }
}
