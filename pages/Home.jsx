import React from 'react';
import './Home.css';
import sadFace from '../icons/sad-face.svg'
import ExpenseResume from '../components/ExpenseResume';
import { Doughnut } from 'react-chartjs-2';
import Btn from '../layout/interaction/buttons/Btn';
import ExpenseTypes from './ExpenseTypes';

export default class Home extends React.Component {

  constructor (props) {
    super(props);
    const expenses = this.props.expenseService.getExpenses()
    this.state = {
      expenses,
      biggestExpenses: this.props.expenseService.getThreeBiggestExpenses(),
      budgets: this.props.expenseService.calculateBudgets(expenses, this.props.expenseTypeService.getExpenseTypes()),
      charts: this.defaultCharts
    };
  }
  /**
   * Retorna o titulo da pagina
   * @return {string}
   */
  static title () {
    return 'Home';
  }

  /**
   * Busca os tipos de despesa mas dessa vez hasheado para procura mais facil
   * @return {{}|[]|any}
   */
  get types () {
    return this.props.expenseTypeService.getExpenseTypes(true)
  }

  /**
   * Retorna os valores padrões dos graficos e suas opções para cada tipo
   * @return {{}}
   */
  get defaultCharts () {
    const configurations = { fixed: { color: '#0c59cf' }, variable: { color: '#e61610' }, event: { color: '#606060' } }
    const charts = {}
    Object.keys(configurations).forEach(name => {
      charts[name] = {
        plugins: [{
          id: 'text-in-donut',
          afterDraw: chart => {
            let theCenterText = this.state.charts[name].data.datasets[0].data[0].toFixed(0) + "%";
            const canvasBounds = chart.canvas.getBoundingClientRect();
            const fontSz = Math.floor( canvasBounds.height * 0.18 ) ;
            chart.ctx.textBaseline = 'middle';
            chart.ctx.textAlign = 'center';
            chart.ctx.font = 'bold ' + fontSz + 'px Arial ';
            chart.ctx.fillStyle = configurations[name].color;
            chart.ctx.fillText(theCenterText, canvasBounds.width/1.9, canvasBounds.height * 0.53 )
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
                  return ' ' + tooltipItem.label + ': ' + tooltipItem.parsed +'%'
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
                'rgba(235, 235, 235, 1)',
              ],
            }],
          labels: ['Gasto', 'Restante']
        },
      }
    })
    return charts;
  }

  /**
   * Mosta o componente do resumo de despesa para as tres maiores despesas
   * @return {*}
   */
  get biggestExpenses () {
    return this.state.biggestExpenses.map(expense => (
      <ExpenseResume key={expense.id} name={expense.name} type={this.types[expense.typeId]} amount={expense.amount}/>
    ))
  }

  componentDidMount () {
    this.updateChart()
  }

  /**
   * Atualiza com valores reais os valores dos graficos
   */
  updateChart () {
    const chartIds = ['fixed', 'variable', 'event' ]
    const charts = this.state.charts;
    chartIds.forEach(id => {
      charts[id].data.datasets[0].data[0] = this.state.budgets[id].filledPercentage > 100 ? 100 : this.state.budgets[id].filledPercentage
      charts[id].data.datasets[0].data[1] = this.state.budgets[id].filledPercentage > 100 ? 0 : 100 - this.state.budgets[id].filledPercentage
    })
    this.setState({ charts })
  }

  /**
   * Busca se algum orçamento ficou ultrapassou o limite
   * @return {boolean}
   */
  get hasOverflow () {
    return Object.values(this.state.budgets).filter(budget => budget.overflow).length > 0
  }

  render () {
    return (
      <div className="home page">
        {this.state.expenses.length > 0 ?
          (<div>
            <div className="title">
              <div>Maiores Despesas</div>
              <hr/>
            </div>
            <div className="section">
              <table>
                <tbody id="biggest-body-table">
                {this.biggestExpenses}
                </tbody>
              </table>
            </div>
            <div className="title section">
              <div>Resumo</div>
              <hr style={{ background: 'linear-gradient(to left,  black 20.3%,#ebebeb 20.3%)' }}/>
            </div>
            <div className="section">
              <div className="charts">
                <div className="flex column items-center">
                  <div className="type">Fixas</div>
                  <Doughnut data={this.state.charts.fixed.data} plugins={this.state.charts.fixed.plugins} options={this.state.charts.fixed.options} width={100} height={100}/>
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
            <div className="section">
              {!this.hasOverflow ?
                (<div className="badge success status">
                  Dentro do Planejado
                </div>)
              :
                (<div className="badge negative status">
                  Fora do Planejado
                </div>)}
            </div>
            <div className="section">
              <div>
                <Btn onClick={() => this.props.changePage(ExpenseTypes)} className="btn secondary">Gerenciar Categorias</Btn>
              </div>
            </div>
          </div>)
          : (<div>
            <div className="text-center">
              <img src={sadFace} alt="Triste" className="sad-face"/>
              <h3 className="subtitle">
                <span>Você não possui nenhuma despesa</span>
                <span>Que tal cadastrar uma ?</span>
              </h3>
            </div>
          </div>)}
      </div>
    );
  }
}
