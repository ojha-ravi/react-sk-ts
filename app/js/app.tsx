import * as React from "react";
import * as ReactDOM from "react-dom";
import { Hello } from "./hello";

const App = () => {
	return <Hello></Hello>
}

ReactDOM.render(<App />, document.querySelector(".container"));
