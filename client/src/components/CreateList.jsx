import React, { Component } from "react";
import socket from "./sockets/socket";

class CreateList extends Component {
	constructor(props) {
		super(props);
		this.fileUploader = React.createRef();
		this.submitForm = React.createRef();
		this.state = {
			title: "",
			price: "",
			email: "",
			description: "",
			contact: "",
			tags: "",
		};
	}
	render() {
		return (
			<React.Fragment>
				<h1>Create Listing: </h1>
				<div id="listing-inputs" className="inputer-field">
					{/*Title
					   Required, add the title name for the item*/}
					<div className="col s12">
						<input id="input-listing-title" placeholder=" Title" name="title" onChange={this.handleChange} />
					</div>
					{/*Price
					   Required, add price of item*/}
					<div className="col s6 m4 l4 xl4">
						{" "}
						<input id="input-listing-price" placeholder=" Price $15.00" name="price" onChange={this.handleChange} />
					</div>
					{/*E-Mail
					   Required, add your email for buyers to contact you*/}
					<div className="col s6 m8 l8 xl8">
						<input id="input-listing-email" placeholder=" E-Mail" name="email" onChange={this.handleChange} />
					</div>{" "}
					{/*Image Uploader
					   1 Required, Upload Images to the server*/}
					<div className="col s12">
						<div className="input-field">
							<p className="">Add Images: </p>
							<input ref={this.fileUploader} type="file" accept=".jpeg, .png, .jpg" className="inline" id="input-listing-img" multiple />
						</div>
					</div>
					{/*Description
					   Required, Gives a description of the item*/}
					<div className="col s12">
						<textarea id="input-listing-desc" placeholder="Description" name="description" onChange={this.handleChange}></textarea>
					</div>
					{/*Additional Contact
					   Optional, Allows seller to optionally add a phone # or other email*/}
					<div className="col s6 m4 l4 xl4">
						<input id="input-listing-contact" placeholder=" Other Contact Info" name="contact" onChange={this.handleChange} />
					</div>
					{/*Tags
					   1 Required, Allows sellers to create tags for buyers to easily find listing*/}
					<div className="col s6 m8 l8 xl8">
						<input id="input-listing-tags" placeholder=" #Computers, #Tech, #Hardware" name="tags" onChange={this.handleChange} />
					</div>
					{/*Submit Button
					   Submits the form to the server*/}
					<div className="col s12">
						<button ref={this.submitForm} id="input-listing-submit" className="btn right" type="submit" onClick={this.handleForm}>
							Submit
						</button>
					</div>
				</div>
			</React.Fragment>
		);
	}
	handleChange = (e) => {
		const data = e.target.value;
		this.setState({ [e.target.name]: data });
	};
	handleForm = () => {
		socket.emit("request-uid");
		socket.on("uid", (uid) => {
			//send socket requesting unique img id
			//recieve socket with unique id and use it to create image identifier
			const image = this.fileUploader.current.files || [];

			for (let multiple = 0; multiple < this.fileUploader.current.files.length; multiple++) {
				const reader = new FileReader();

				reader.onloadend = () => {
					socket.emit("validate-image", { uniqueID: uid, result: reader.result });
				};
				reader.readAsDataURL(image[multiple]);
			}
			socket.emit("validate-data", {
				title: this.state.title,
				price: this.state.price,
				email: this.state.email,
				description: this.state.description,
				contact: this.state.contact,
				tags: this.state.tags,
			});
		});
	};
}

export default CreateList;
