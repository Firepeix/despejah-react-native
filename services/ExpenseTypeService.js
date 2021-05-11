import DatabaseService from './DatabaseService';

export default class ExpenseTypeService {
  constructor () {
    this.databaseService = new DatabaseService()
  }

  /**
   * Função que busca as categorias de despesas
   */
  async getExpenseTypes (hash = false) {
    let expenseTypes = await this.databaseService.getModels('expense-types');
    if (expenseTypes.length < 1) {
      expenseTypes = this.getDefaultExpenseTypes();
    }
    if (hash) {
      const map = {}
      expenseTypes.forEach(type => {
        map[type.id] = type
      })

      return map;
    }

    return expenseTypes;
  }

  /**
   * Função que busca as categorias pre-salvas
   */
  getDefaultExpenseTypes () {
    const types = [
      { id: 1, name: 'Fixas', icon: 'food-fork-drink', limit: 60000, chartId: 'fixed' },
      { id: 2, name: 'Variáveis', icon: 'car', limit: 30000, chartId: 'variable' },
      { id: 3, name: 'Eventuais', icon: 'tag', limit: 40000, chartId: 'event' }
    ];

    types.forEach( async type => {
      await this.databaseService.insertModel(type, 'expense-types')
    })

    return types;
  }

  /**
   * Atualiza limite de um tipo de despesa
   * @param type
   */
  async updateType (type) {
    await this.databaseService.updateModel(type, 'expense-types')
  }
}
