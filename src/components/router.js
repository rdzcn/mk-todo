import EventEmitter from 'events'

const CATEGORIES = ['My Todos', 'Home Related', 'Work Related', 'Groceries']

class Router extends EventEmitter {
  constructor() {
    super()
    this.pathname = window.location.pathname
    this.getRoute()
  }
  
  pathnameToRoute(pathname) {
    let route 
    if (pathname === '/') {
      route = 'My Todos'
    } else {
      route = pathname.match(/[A-Za-z]+/g).join(' ')
    }
    return route
  }

  getRoute() {
    const route = this.pathnameToRoute(this.pathname)
    if (CATEGORIES.includes(route)) {
      this.route = route
    } else if (route === 'search') {
      this.route = route
    } else {
      this.route = '404'
    }
  }

  updatePathname(pathname) {
    this.pathname = pathname
    this.getRoute()
    this.emit('urlChanged')
  }

  updatePathSearch(searchText) {
    const search = '?' + searchText
    this.pathname = window.location.pathname + search
    window.history.replaceState(null, null, this.pathname)
    this.emit('urlChanged')
  }

  resetSearch() {
    window.history.replaceState(null, null, this.route)
    this.emit('urlChanged')
  }
}

export default Router