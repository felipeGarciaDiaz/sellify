import React, { Component } from "react";

class Error extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<React.Fragment>
				<div id="error-404">
					<h1 className="center-align">404 Error</h1>
					<h5 className="center-align">Page not found</h5>
				</div>
				<div id="error-go-home" className="col s12 center">
					<button className="btn" id="home-button" onClick={() => this.goHome()}>
						Home
					</button>
				</div>
			</React.Fragment>
		);
	}
	goHome = () => {
		window.location.href = "/";
	};
}

export default Error;
