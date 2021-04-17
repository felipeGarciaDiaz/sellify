import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Helmet from "react-helmet";
import Error from "./Error";
import CreateList from "./CreateList";
//https://colorhunt.co/palette/33990
//https://colorhunt.co/palette/66990
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { appTitle: "better craigslist" };
	}

	render() {
		return (
			<React.Fragment>
				<Helmet>
					<title>{this.state.appTitle}</title>
				</Helmet>
				<Router>
					<Switch>
						<Route exact path="/">
							<div id="header-text">
								<h1 className="center-align" id="title">
									<b>Sellify</b>
								</h1>
								<h5 className="center-align">
									Need to get rid of your stuff? Create a listing and sell it here! <br /> Looking for something? Check if its on selify!
								</h5>
							</div>
							<div className="col s12 center">
								<Link to="/sell">
									<button className="btn" id="create-listing-button">
										Create Listing
									</button>
								</Link>
							</div>
						</Route>
						<Route path="/sell">
							<CreateList />
						</Route>
						<Route path="*">
							<Error />
						</Route>
					</Switch>
				</Router>
			</React.Fragment>
		);
	}
}
/*
				<Router>
					<Link to="create_listing">
						<button></button>
					</Link>
				</Router />


				/*
				*/

export default Home;
