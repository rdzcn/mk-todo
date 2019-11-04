import React from 'react'
import Link from '../_shared/Link'

class Search extends React.Component {
  
  handleChange = event => {
    const text = event.target.value
    this.props.state.updateSearchFor(text)
  }

  render() {
    const { state } = this.props
    const { searchFor } = state
    return (
      <form>
        <Link to='search' state={state}>
          <button type="button">Search</button>
        </Link>
        {
          state.route === 'search' &&
            <input 
              type="text"
              value={searchFor} 
              onChange={this.handleChange} 
            /> 
        }
      </form>
    )
  }
}

export default Search