import React from "react"

class CompletedTodoList extends React.Component {
	render() {
		return (
			<div>
				<h2>Completed ({this.props.todos.length})</h2>
				<ul>
					{this.props.children}
				</ul>
			</div>
		)
	}
}

export default CompletedTodoList
