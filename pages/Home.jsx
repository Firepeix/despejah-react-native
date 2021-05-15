import React from 'react';
import ExpenseResume from '../components/ExpenseResume';
import Page from './Page';
import { Button, Divider, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-paper/lib/module/components/Icon';
import { PieChart } from "react-native-chart-kit";

export default class Home extends Page {

  constructor (props) {
    super(props);
    this.state = {
      expenses: [],
      types: [],
      biggestExpenses: [],
      budgets: [],
      charts: this.defaultCharts,
      loaded: false
    };
    this.chartConfig = {
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    }
  }

  componentDidMount () {
    this.props.expenseService.getExpenses().then(async expenses => {
      const biggestExpenses = await this.props.expenseService.getThreeBiggestExpenses();
      const types = await this.props.expenseTypeService.getExpenseTypes(true);
      const budgets = this.props.expenseService.calculateBudgets(expenses, await this.props.expenseTypeService.getExpenseTypes());
      this.setState({
        expenses,
        biggestExpenses,
        budgets,
        types,
        loaded: true
      });
      this.updateChart();
    });
  }


  createStyle (overload = { page: {} }) {
    super.createStyle({
      page: {
        flex: 1
      }
    });
    this.homeStyle = StyleSheet.create({
      title: {
        textAlign: 'right',
        fontWeight: '700',
        fontSize: 25
      },
      subTitle: {
        fontWeight: '700',
        color: '#a4a4a4',
        flex: 1,
        textAlign: 'center',
        fontSize: 21
      },
      emptySection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      section: {
        paddingBottom: 20
      },
      type: {
        color: '#a4a4a4',
        textAlign: 'center',
        fontWeight: '700',
        paddingBottom: 6,
        fontSize: 18
      },
      chartWrapper: {
        flex: 0.33,
        textAlign: 'center',
        alignContent: 'center'
      },
      divider: {
        backgroundColor: '#d2d2d2',
        height: 5,
        borderRadius: 4,
        marginTop: 7,
        marginBottom: 7
      }
    });
  }

  /**
   * Retorna o titulo da pagina
   * @return {string}
   */
  static title () {
    return 'Home';
  }


  /**
   * Retorna os valores padrões dos graficos e suas opções para cada tipo
   * @return {{}}
   */
  get defaultCharts () {
    return {
      fixed: [{color: '#0c59cf', amount: 0}, {color: '#ebebeb', amount: 100}],
      variable: [{color: '#e61610', amount: 0}, {color: '#ebebeb', amount: 100}],
      event: [{color: '#303030', amount: 0}, {color: '#ebebeb', amount: 100}],
    };
  }

  /**
   * Mosta o componente do resumo de despesa para as tres maiores despesas
   * @return {*}
   */
  get biggestExpenses () {
    return this.state.biggestExpenses.map((expense, index) => (
      <ExpenseResume withoutBorder={index === 1} key={expense.id} name={expense.name} type={this.state.types[expense.typeId]} amount={expense.amount}/>
    ));
  }

  /**
   * Atualiza com valores reais os valores dos graficos
   */
  updateChart () {
    const chartIds = ['fixed', 'variable', 'event'];
    const charts = this.state.charts;
    chartIds.forEach(id => {
      const budget = this.state.budgets[id];
      if (budget) {
        const amount = budget.filledPercentage;
        charts[id][0].amount = amount >= 100 ? 100 : amount;
        charts[id][1].amount = amount >= 100 ? 0 : 100 - amount;
      }
    });
    this.setState({ charts });
  }

  /**
   * Busca se algum orçamento ficou ultrapassou o limite
   * @return {boolean}
   */
  get hasOverflow () {
    return Object.values(this.state.budgets).filter(budget => budget.overflow).length > 0;
  }

  render () {
    if (this.state.loaded) {
      return (
        <View style={this.style.page}>
          {this.state.expenses.length > 0 ?
            (<View style={{ paddingTop: 20 }}>
              <Text style={this.homeStyle.title}>Maiores Despesas</Text>
              <Divider style={this.homeStyle.divider}/>
              <View style={this.homeStyle.section}>
                {this.biggestExpenses}
              </View>
              <Text style={this.homeStyle.title}>Resumo</Text>
              <Divider style={this.homeStyle.divider}/>
              <View style={this.homeStyle.section}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={this.homeStyle.chartWrapper}>
                    <Text style={this.homeStyle.type}>Fixas</Text>
                    <PieChart
                      data={this.state.charts.fixed}
                      hasLegend={false}
                      width={100}
                      height={100}
                      chartConfig={this.chartConfig}
                      accessor={"amount"}
                      backgroundColor={"transparent"}
                      center={[32, 5]}
                    />
                  </View>
                  <View style={this.homeStyle.chartWrapper}>
                    <Text style={this.homeStyle.type}>Variáveis</Text>
                    <PieChart
                      data={this.state.charts.variable}
                      hasLegend={false}
                      width={100}
                      height={100}
                      chartConfig={this.chartConfig}
                      accessor={"amount"}
                      backgroundColor={"transparent"}
                      center={[31, 5]}
                    />
                  </View>
                  <View style={this.homeStyle.chartWrapper}>
                    <Text style={this.homeStyle.type}>Eventuais</Text>
                    <PieChart
                      data={this.state.charts.event}
                      hasLegend={false}
                      width={100}
                      height={100}
                      chartConfig={this.chartConfig}
                      accessor={"amount"}
                      backgroundColor={"transparent"}
                      center={[32, 5]}
                    />
                  </View>
                </View>
              </View>
              <View style={this.homeStyle.section}>
                {!this.hasOverflow ?
                  (<Text style={this.style.successBadge}>
                    Dentro do Planejado
                  </Text>)
                  :
                  (<Text style={this.style.negativeBadge}>
                    Fora do Planejado
                  </Text>)}
              </View>
              <View style={this.homeStyle.section}>
                <Button mode={'contained'} onPress={() => this.props.changePage('expenseTypes')}>Gerenciar Categorias</Button>
              </View>
            </View>)
            : (
              <View style={this.homeStyle.emptySection}>
                <Icon source={'emoticon-sad-outline'} size={170}/>
                <Text style={this.homeStyle.subTitle}>Você não possui nenhuma despesa</Text>
                <Text style={this.homeStyle.subTitle}>Que tal cadastrar uma ?</Text>
              </View>
            )
          }

        </View>
      );
    }

    return null
  }
}
