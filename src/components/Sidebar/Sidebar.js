import React from "react"
 
const Sidebar = ({ repo }) => {
  
  let categories = ["My Todos", "Home Related", "Work Related", "Groceries"]

  return(
    <ul>
      {
        categories.map(category => 
          <li key={category} className="sidebar-category">
            <button type="button" onClick={() => repo.updateSelectedCategory(category)}>
              {category}
            </button>
          </li>
        )
      }
    </ul>
  )
}

export default Sidebar