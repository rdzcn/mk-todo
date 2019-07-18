import EventEmitter from 'events'

class Router extends EventEmitter {
  constructor(db) {
    super()
    this.categories = db.read().categories
    this.pathname = window.location.pathname
    this.route = this.getRoute()
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

    if (this.categories.includes(route) || route === 'search' ) {
      return route
    } else {
      return '404'
    }
  }

  updateCategories(category) {
    this.categories = this.categories.concat(category)
    this.route = this.getRoute()
    this.emit('urlChanged')
  }

  updatePathname(pathname) {
    this.pathname = pathname
    this.route = this.getRoute()
    window.history.pushState(null, null, this.pathname)
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