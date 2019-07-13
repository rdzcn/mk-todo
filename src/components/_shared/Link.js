import React from 'react'

class Link extends React.Component {
  
  handleRoute = event => {
    event.preventDefault()
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
