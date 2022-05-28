var mongoose = require('mongoose');

var options = {
	connectTimeoutMS: 5000,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGO_URI, options, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Connected to the database !');
	}
});

module.exports = mongoose;
