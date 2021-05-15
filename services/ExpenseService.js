import DatabaseService from './DatabaseService';
import NumberPrimitive from '../Primitives/NumberPrimitive';
import DatePrimitive from '../Primitives/DatePrimitive';

export default class ExpenseService {
  constructor () {
    this.databaseService = new DatabaseService()
  }

  /**
   * Busca despesa do storage da mais nova para antiga
   */
  async getExpenses () {
    const expenses = await this.databaseService.getModels('expenses')
    return expenses.reverse();
  }

  /**
   * Função que busca as 3 maiores despesas salvas
   */
  async getThreeBiggestExpenses (expenses = null) {
    let sortedExpenses = expenses === null ? await this.databaseService.getModels('expenses') : expenses
    sortedExpenses = sortedExpenses.sort((expenseA, expenseB) => expenseA.amount > expenseB.amount ? -1 : 1)
    return sortedExpenses.slice(0, 3)
  }

  /**
   * Função que salva uma despesa no localStorage
   */
  async saveExpense (expense) {
    if (this.databaseService.exists(expense)) {
      await this.databaseService.updateModel(expense, 'expenses')
      return;
    }

    await this.databaseService.insertModel(expense, 'expenses');
  }

  /**
   * Função que cria uma entidade de despesa
   */
  makeExpense (id = null, name, typeId, date, amount) {
    amount = isNaN(amount) ? NumberPrimitive.toInt(amount) : amount;
    date = date.match(/\d{4}-\d{2}-\d{2}/) ? date : DatePrimitive.toISODateString(date);
    return { id: id, name: name, typeId: typeId, date: date, amount: amount };
  }

  /**
   * Deleta uma despesa do storage
   * @param id
   */
  async deleteExpense (id) {
    await this.databaseService.deleteModel(id, 'expenses')
  }

  /**
   * Função que cria um orçamento de uma categoria
   */
  createBudget(type, expenses) {
    const expended = expenses.reduce((value, expense) => value + expense.amount, 0)
    return {
      typeId: type.id,
      expenses: expenses,
      limit: type.limit,
      expended: expended,
      overflow: type.limit < expended,
      filledPercentage: (expended  * 100) / type.limit,
      chartId: type.chartId
    }
  }

  /**
   * Função que calcula os orçamentos baseados nas
   * categorias de despesas e despesas
   */
  calculateBudgets (expenses, types) {
    const budgets = { }
    types.forEach(type => {
      const budget = this.createBudget(type, expenses.filter(expense => type.id === Number(expense.typeId)));
      budgets[budget.chartId] = budget
    })

    return budgets;
  }
}
