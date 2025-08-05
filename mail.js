var nodemailer = require('nodemailer');

var sender = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'iiinfottech@gmail.com',
		pass: 'ddks lqvu eomq wsph' // NOT your normal Gmail password!
	}
});

var now = new Date().toLocaleString();

var composemail = {
	from: 'iiinfottech@gmail.com',
	to: 'kishorkumargs.it2024@citchennai.net',
	subject: '🚨 BreakBot Alert: FAULT Detected',
	text: `A machine fault was detected at ${now}. Please check the dashboard.`,
	html:`
		<div style="font-family: Arial, sans-serif; color: #333;">
			<h2 style="color: red;">🚨 Fault Detected!</h2>
			<p>A machine fault was detected at <strong>${now}</strong>.</p><br>
			<p>Please <a href="http://localhost:5000/dashboard" target="_blank">check the BreakBot dashboard</a> for more details.</p>
		</div>
	`,
	//'<h1 style="color: red;">Warning! overheating</h1>',
};

sender.sendMail(composemail, function(err, info) {
	if (err) {
		console.log("❌ Error sending email:",err);
	} else {
		console.log('✅ Email sent successfully:', info.response);
	}
});