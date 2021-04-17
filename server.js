const express = require("express");
const app = express(); //.use(siofu.router);
const http = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(http);
const fs = require("fs");
const crypto = require("crypto");
var PORT = 7777;

app.use(express.static(path.join(__dirname, "client/build/")));
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "client/public", "index.html"));
});
io.on("connection", function (socket) {
	console.log("user connected!");
	socket.on("request-uid", () => {
		io.emit("uid", crypto.randomBytes(4).toString("hex"));
	});

	socket.on("validate-image", (img) => {
		const splitImg = img.result.split(";base64,");

		const format = splitImg[0].split("/")[1].toLowerCase();
		if (format === "jpeg" || format === "jpg" || format === "png") {
			fs.writeFileSync("./images/" + crypto.randomBytes(16).toString("hex") + "." + format, splitImg[1], { encoding: "base64" });
			console.log("file uploaded!", img.uniqueID);
		} else {
			io.emit("upload-error");
			console.log("upload error: " + format);
		}
	});
});
http.listen(PORT, () => {
	console.log("Server started on port: " + PORT);
});

///etc/sysctl.conf <<if you get weird error remove the last line.
