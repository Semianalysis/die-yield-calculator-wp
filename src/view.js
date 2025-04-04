import ReactDOM from "react-dom";
import App from "./components/App";

document.addEventListener("DOMContentLoaded", () => {
	const domNode = document.getElementById("die-yield-calculator");
	ReactDOM.render(<App />, domNode);
});
