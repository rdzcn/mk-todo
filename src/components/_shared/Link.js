import React from 'react'

class Link extends React.Component {
  
  handleRoute = event => {
    event.preventDefault()
    const { state, to } = this.props
    state.navigateTo(to)
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
