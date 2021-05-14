import React from 'react';
import ExpenseResume from '../components/ExpenseResume';
import Page from './Page';
import { Button, Divider, Text } from 'react-native-paper';
import { View, StyleSheet, Dimensions } from 'react-native';
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
      chartConfiguration: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }],
        options: {
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      }
    };
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
        types
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
        fontSize: 16
      },
      subTitle: {
        fontWeight: '700',
        color: '#a4a4a4',
        flex: 1,
        textAlign: 'center',
        fontSize: 20
      },
      emptySection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      section: {
        paddingBottom: 20
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
    const configurations = { fixed: { color: '#0c59cf' }, variable: { color: '#e61610' }, event: { color: '#606060' } };
    const charts = {};
    Object.keys(configurations).forEach(name => {
      charts[name] = {
        plugins: [{
          id: 'text-in-donut',
          afterDraw: chart => {
            let theCenterText = this.state.charts[name].data.datasets[0].data[0].toFixed(0) + "%";
            const canvasBounds = chart.canvas.getBoundingClientRect();
            const fontSz = Math.floor(canvasBounds.height * 0.18);
            chart.ctx.textBaseline = 'middle';
            chart.ctx.textAlign = 'center';
            chart.ctx.font = 'bold ' + fontSz + 'px Arial ';
            chart.ctx.fillStyle = configurations[name].color;
            chart.ctx.fillText(theCenterText, canvasBounds.width / 1.9, canvasBounds.height * 0.53);
          }
        }],
        options: {
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return ' ' + tooltipItem.label + ': ' + tooltipItem.parsed + '%';
                }
              }
            }
          }
        },
        data: {
          datasets: [
            {
              data: [50, 50],
              backgroundColor: [
                configurations[name].color,
                'rgba(235, 235, 235, 1)'
              ]
            }],
          labels: ['Gasto', 'Restante']
        }
      };
    });
    return charts;
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
      charts[id].data.datasets[0].data[0] = this.state.budgets[id].filledPercentage > 100 ? 100 : this.state.budgets[id].filledPercentage;
      charts[id].data.datasets[0].data[1] = this.state.budgets[id].filledPercentage > 100 ? 0 : 100 - this.state.budgets[id].filledPercentage;
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

  /*render () {
    return (
      <div className="home page">
        {this.state.expenses.length > 0 ?
          (<div>


            <div className="title section">
              <div>Resumo</div>
              <hr style={{ background: 'linear-gradient(to left,  black 20.3%,#ebebeb 20.3%)' }}/>
            </div>
            <div className="section">
              <div className="charts">
                <div className="flex column items-center">
                  <div className="type">Fixas</div>
                </div>
                <div className="flex column items-center">
                  <div className="type">Variáveis</div>
                  <Doughnut data={this.state.charts.variable.data} plugins={this.state.charts.variable.plugins} options={this.state.charts.variable.options} width={100} height={100}/>
                </div>
                <div className="flex column items-center">
                  <div className="type">Eventuais</div>
                  <Doughnut data={this.state.charts.event.data} plugins={this.state.charts.event.plugins} options={this.state.charts.event.options} width={100} height={100}/>
                </div>
              </div>
            </div>

          </div>)

      </div>
    );
  }*/
  render () {
    return (
      <View style={this.style.page}>
        {this.state.expenses.length > 0 ?
          (<View style={{ paddingTop: 20 }}>
            <Text style={this.homeStyle.title}>Maiores Despesas</Text>
            <Divider/>
            <View style={this.homeStyle.section}>
              {this.biggestExpenses}
            </View>
            <Text style={this.homeStyle.title}>Resumo</Text>
            <Divider/>
            <View style={this.homeStyle.section}>
              <PieChart
                data={[{
                  name: "Seoul",
                  population: 21500000,
                  color: "rgba(131, 167, 234, 1)",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15
                }]}
                width={Dimensions.get("window").width}
                height={220}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                  }
                }}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[10, 50]}
                absolute
              />
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
}
