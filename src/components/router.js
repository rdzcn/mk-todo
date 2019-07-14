import EventEmitter from 'events'

class Router extends EventEmitter {
  constructor() {
    super()
    const { state } = window.history
    this.renderCategory = ''
    this.root = '/'
    this.pathname = state ? state.category : 'My Todos'
  }
  
  //this.on('urlChanged', route => this.props.repo.updateRoute(route))
  //this.emit('urlChanged', this.props.to)

  route() {
    if (this.pathname === this.root) {
      this.renderCategory = 'My Todos'
    } else {
      this.renderCategory = this.pathname
    }
    return this.renderCategory
  }
}

export default Router