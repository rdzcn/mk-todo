import React from "react"
import State from "./State"

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Your Todo App</h1>
				<State />
			</div>
		);
	}
}

export default App
