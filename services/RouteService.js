import routes from '../pages/index'

export default class RouteService {


  constructor () {
    this.routes = routes
  }

  /**
   * Busca o componente com base no nome da rota
   * @param name
   * @return {*}
   */
  getPage (name) {
    return this.routes[name]
  }
}
