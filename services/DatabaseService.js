export default class DatabaseService {

  /**
   * Função que gera um id unico para salvar no banco
   */
  generateId (value) {
    let hash = 0;
    if (value.length === 0) {
      return hash;
    }
    value += +new Date();
    for (let i = 0; i < value.length; i++) {
      let charCode = value.charCodeAt(i);
      hash = ((hash << 7) - hash) + charCode;
      hash = hash & hash;
    }

    return hash > 0 ? hash : hash * -1;
  }

  /**
   * Função que insere uma entidade no localStorage
   */
  insertModel (model, table) {
    const models = this.getModels(table);
    model.id = model.id !== undefined && model.id !== null ? model.id : this.generateId(JSON.stringify(model));
    models.push(model);
    localStorage.setItem(table, JSON.stringify(models));
  }

  /**
   * Função que atualiza uma entidade no localStorage
   */
  updateModel (model, table) {
    const models = this.getModels(table);
    const modelPos = models.findIndex(expense => expense.id === model.id)

    if (modelPos !== -1) {
      models[modelPos] = model
      localStorage.setItem(table, JSON.stringify(models));
    }
  }

  /**
   * Função que deleta uma entidade no localStorage
   */
  deleteModel (id, table) {
    let models = this.getModels(table);
    models = models.filter(expense => expense.id !== id)

    localStorage.setItem(table, JSON.stringify(models));
  }

  /**
   * Função que busca entidades no localStorage
   */
  getModels (table) {
    return localStorage.getItem(table) === null ? [] : JSON.parse(localStorage.getItem(table));
  }

  /**
   * Função que verifica se uma entidade já existe salva
   */
  exists (model) {
    return model.id !== 0 && model.id !== undefined && model.id !== null;
  }

}
