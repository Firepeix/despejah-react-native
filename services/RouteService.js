import routes from '../pages/index'

export default class RouteService {


  constructor () {
    this.routes = routes
  }

  getPage (name) {
    return this.routes[name]
  }
}
