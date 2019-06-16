import React from "react"
import Todo from "./Todo"
//import renderer from "react-test-renderer"
import ShallowRenderer from "react-test-renderer/shallow"

const renderer = new ShallowRenderer();


it("decideDueDateColor", () => {
	let wrapper = renderer.render(<Todo />);
	wrapper.instance().decideDueDateColor = jest.fn();
	wrapper.update();
	wrapper.instance().decideDueDateColor("2019-06-14");
	expect(wrapper.instance().decideDueDateColor).toBeCalledWith("2019-06-14");
})

