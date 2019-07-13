import React from 'react'

class Search extends React.Component {
  
  handleChange = event => {
    const searchText = event.target.value
    this.props.repo.updateSearchText(searchText)
  }

  render() {
    const { searchText } = this.props.repo
    return (
      <form>
        <label>
          Search for a todo
        </label>
        <input 
          type="text"
          value={searchText} 
          onChange={this.handleChange} 
        />
      </form>
    )
  }
}

export default Search