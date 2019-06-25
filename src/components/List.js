import React from "react"

const List = (props) => {
  return (
    <div>
      <span>{props.title}</span>
      <aside>
        {props.children}
      </aside>
    </div>
  )
}

export default List