import React from 'react'
import Link from '../_shared/Link'

class Search extends React.Component {
  
  handleChange = event => {
    const searchText = event.target.value
    this.props.router.updatePathSearch(searchText)
  }

  render() {
    const searchText  = window.location.search.replace('?', '')
    const { router } = this.props
    const { route } = router

    return (
      <form>
        <Link to='/search' router={router}>
          <button type="reset">Search</button>
        </Link>
        {
          route === 'search' &&
            <input 
              type="text"
              value={searchText} 
              onChange={this.handleChange} 
            /> 
        }
      </form>
    )
  }
}

export default Search