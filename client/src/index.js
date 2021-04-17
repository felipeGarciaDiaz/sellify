import React from "react";
import ReactDOM from "react-dom";
import "materialize-css/dist/css/materialize.min.css";
import "./components/media/styles/style.css";
import Home from "./components/Home";

ReactDOM.render(
	<React.StrictMode>
		<div className="container">
			<div className="row">
				<div className="col s12" id="create-listing-parent">
					<Home />
				</div>
			</div>
		</div>
	</React.StrictMode>,
	document.getElementById("root")
);
