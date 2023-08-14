const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const nodemailer = require("nodemailer");
const dotenv = require('dotenv')
dotenv.config()
app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/api", async (req, res) => {
	await sendMail("", "devarshmavani19@gmail.com", "Hello WOrld", null);
	res.json({});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

async function sendMail(subject, userMail, text, html, attachments = null) {
    console.log(process.env.SMTP_PASS)
	const transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		port: "465",
		secure: false,
		tls: {
			ciphers: "SSLv3",
			rejectUnauthorized: false,
		},
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
	});
	const info = await transporter.sendMail({
		from: process.env.SMTP_USER,
		to: userMail,
		subject: subject,
		text: text,
	});

	console.log("Message sent: %s", info.messageId);

	return { messageId: info.messageId };
}
