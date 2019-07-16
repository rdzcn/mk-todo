import React from 'react'
import Link from '../_shared/Link'

class Search extends React.Component {
  
  handleChange = event => {
    const searchText = event.target.value
    this.props.repo.updateSearchText(searchText)
  }

  render() {
    const { searchText } = this.props.repo
    const { router } = this.props
    const { route } = router

    return (
      <form>
        <Link to='/search' router={router}>
          <button type="button">Search</button>
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