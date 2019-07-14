import React from 'react'
import EventEmitter from "events";

class Link extends React.Component {
  
  handleRoute = event => {
    event.preventDefault()
    const urlEmitter = new EventEmitter()
    urlEmitter.on('urlChanged', route => this.props.repo.updateRoute(route))
    urlEmitter.emit('urlChanged', this.props.to)
    window.history.pushState(null, null, this.props.to)
  }
  
  render() {
    const { to, children } = this.props
    return (
      <a href={to} onClick={this.handleRoute}>
        { children }
      </a>
    )
  }
}

export default Link
