import React from "react"

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Your Todo App</h1>
				{this.props.children}
			</div>
		);
	}
}

export default App
