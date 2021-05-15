import React from 'react';
import DatePrimitive from '../Primitives/DatePrimitive';
import NumberPrimitive from '../Primitives/NumberPrimitive';
import { View, TextInput, StyleSheet } from 'react-native';
import Page from './Page';
import { Text } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { TextInputMask } from 'react-native-masked-text';

export default class NewExpense extends Page {
  constructor (props) {
    super(props);
    this.state = {
      name: !this.hasSavedExpense ? '' : this.props.savedExpense.name,
      type: !this.hasSavedExpense ? '' : this.props.savedExpense.typeId,
      date: !this.hasSavedExpense ? '' : DatePrimitive.toEURDateString(this.props.savedExpense.date),
      amount: !this.hasSavedExpense ? '0,00' : NumberPrimitive.toReal(this.props.savedExpense.amount),
      errors: {
        name: null,
        type: null,
        date: null,
        amount: null
      },
      expenseTypes: []
    };
  }


  /**
   * Cria o estilo nos componentes para utilização
   */
  createStyle (overload = { page: {} }) {
    super.createStyle(overload);
    this.newExpenseStyle = StyleSheet.create({
      amountLabel: {
        ...this.style.label,
        fontSize: 25.6,
        textAlign: 'center'
      },
      amountWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
      },
      symbol: {
        borderBottomWidth: 2,
        backgroundColor: 'white',
        borderColor: '#ebebeb',
        fontSize: 32
      },
      amountInput: {
        ...this.style.input,
        fontSize: 48,
        fontWeight: '500',
        textAlign: 'center',
        width: '100%'
      }
    })
  }

  /**
   * Verifica se o formulário é de criação ou edição
   * @return {boolean}
   */
  get hasSavedExpense () {
    return this.props.savedExpense !== null && this.props.savedExpense !== undefined;
  }

  /**
   * Se for um formulário de edição retorna o id da despesa a ser editada
   * @return {null|*}
   */
  get savedExpenseId () {
    if (this.hasSavedExpense) {
      return this.props.savedExpense.id
    }
    return null
  }

  /**
   * Retorna o titulo da pagina
   * @param props
   * @return {string}
   */
  static title (props) {
    return props.savedExpense !== null && props.savedExpense !== undefined ? 'Despesa' : 'Nova Despesa'
  }

  /**
   * Metodo que lida com a input do usuario
   * @param name
   * @param value
   */
  handleInput = (value, name) => {
    this.setState({
      [name]: value
    });
  };

  componentDidMount () {
    this.props.changeMainButton('saveExpense', this.saveExpense);
    this.props.expenseTypeService.getExpenseTypes().then(types => {
      this.setState({ expenseTypes: types.map(type => {
        return { label: type.name, value: type.id }
        })})
    }).catch(() => {
      this.setState({ expenseTypes: []})
    })
  }

  /**
   * Salva a despesa do formulário
   */
  saveExpense = async () => {
    if (this.validate()) {
      const expense = this.props.expenseService.makeExpense(this.savedExpenseId, this.state.name, this.state.type, this.state.date, this.state.amount);
      await this.props.expenseService.saveExpense(expense);
      const message = this.hasSavedExpense ? 'Despesa editada com sucesso!' : 'Despesa salva com sucesso!'
      this.props.toast(message)
      this.props.changePage(!this.hasSavedExpense ? 'home' : 'expenses')
    }
  };

  /**
   * Valida todas as inputs formulário
   * @return {boolean}
   */
  validate () {
    const { errors } = this.state;
    this.cleanValidation();
    const rules = this.getValidationRules();
    Object.keys(this.state).forEach(name => {
      if (rules[name] !== undefined) {
        errors[name] = rules[name]();
      }
    });
    this.setState({ errors });
    return Object.values(errors).filter(error => error !== null).length < 1;
  }

  /**
   * Busca as funções de validação com base em qual input
   */
  getValidationRules () {
    return {
      name: this.validateName,
      type: this.validateType,
      date: this.validateDate,
      amount: this.validateAmount
    };
  }

  /**
   * Valida o nome
   * @return {string|null}
   */
  validateName = () => {
    if (this.state.name === '') {
      return 'Por favor preencha o nome da despesa!';
    }

    return null;
  };

  /**
   * Valida o tipo
   * @return {string|null}
   */
  validateType = () => {
    if (isNaN(this.state.type) || this.state.type === '' || this.state.type === 0) {
      return 'Por favor selecione uma categoria!';
    }

    return null;
  };

  /**
   * Valida a data
   * @return {string|null}
   */
  validateDate = () => {
    if (this.state.date !== '') {
      const inputDate = new Date(`${DatePrimitive.toISODateString(this.state.date)}T00:00:00`);
      if (!DatePrimitive.isValid(inputDate)) {
        return 'Por favor preencha com uma data valida';
      }
      if (inputDate > new Date()) {
        return 'Por favor preencha com uma data no passado';
      }
      return null;
    }

    return 'Por favor preencha a data que a despesa ocorreu!';
  };

  /**
   * Valida o valor da despesa
   * @return {string|null}
   */
  validateAmount = () => {
    if (NumberPrimitive.toInt(this.state.amount) < 1) {
      return 'A despesa deve ter o valor maior que 0!';
    }

    return null;
  };

  /**
   * Limpa a validação
   */
  cleanValidation () {
    this.setState({
      errors: {
        name: null,
        type: null,
        date: null,
        amount: null
      }
    });
  }

  componentWillUnmount () {
    this.props.changeMainButton('newExpense');
  }

  render () {
    return (
      <View style={this.style.page}>
        <View style={this.style.inputWrapper}>
          <Text style={this.style.label}>Nome</Text>
          <TextInput label="Nome" value={this.state.name} style={this.style.input}
            onChangeText={text => this.handleInput(text, 'name')}
          />
          {this.state.errors.name !== null ? (
            <Text style={this.style.error}>{this.state.errors.name}</Text>
          ) : null}
        </View>
        <View style={this.style.inputWrapper}>
          <Text style={this.style.label}>Categoria</Text>
          <RNPickerSelect useNativeAndroidPickerStyle={false} style={this.pickerStyle}
            onValueChange={category => this.handleInput(category, 'type')}
            placeholder={ { label: 'Selecionar Categoria', value: 0 }}
            items={this.state.expenseTypes} value={this.state.type}
          />
          {this.state.errors.type !== null ? (
            <Text style={this.style.error}>{this.state.errors.type}</Text>
          ) : null}
        </View>
        <View style={this.style.inputWrapper}>
          <Text style={this.style.label}>Data</Text>
          <TextInputMask type={'datetime'} options={{ format: 'DD/MM/YYYY' }} style={this.style.input}
            value={this.state.date} onChangeText={date => this.handleInput(date, 'date')}
          />
          {this.state.errors.date !== null ? (
            <Text style={this.style.error}>{this.state.errors.date}</Text>
          ) : null}
        </View>
        <View style={this.style.inputWrapper}>
          <Text style={this.newExpenseStyle.amountLabel}>Valor</Text>
          <View style={this.newExpenseStyle.amountWrapper}>
            <Text style={this.newExpenseStyle.symbol}>R$</Text>
            <TextInputMask maxLength={10} type={'money'} value={this.state.amount}
              onChangeText={value => this.handleInput(value, 'amount')}
              style={this.newExpenseStyle.amountInput} options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: '',
              suffixUnit: ''
            }}
            />
          </View>
          {this.state.errors.amount !== null ? (
            <Text style={this.style.error}>{this.state.errors.amount}</Text>
          ) : null}
        </View>
      </View>

    );
  }
}
