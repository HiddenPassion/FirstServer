const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my website',
		currentYear: new Date().getFullYear()
	});
});

app.use(express.static(__dirname + '/public'));

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear() 	
	});
});
 

 // http://localhost:3000/help.html
app.use(express.static(__dirname + '/public'));


 // http://localhost:3000/get-user/3 
app.get('/get-user/:id', function(req, res) {
	console.log(req.params.id);
	let someResponse = {
		Name: 'Igor',
		Sername: 'Kapustin'
	}; 
	let errorMessage = 'Unexpected error';


Promise.resolve(someResponse)
						.then((someResponse) => {
							res.status(200).json(someResponse);
						})
						.catch((error) => {
							res.status(404).json({ 'message': errorMessage});
						});

 });


 // http://localhost:3000/get-goods/phones/price-desc
app.get('/get-goods/:type/:price', function(req, res) {
	console.log('Response from "get-goods/param1/param2":');
	console.log(`Type: ${req.params.type}`);
	console.log(`Price: ${req.params.price}`);
	let someResponse = {
		Type: req.params.type,
		Price: req.params.price
	}; 
	let errorMessage = 'Unexpected error';
	let handler = new Promise((resolve, reject) => {
		if (req.params.type === 'phones') {
			resolve(someResponse);
			console.log(someResponse);
		} else {
			reject(errorMessage);
		}
	})
	 					.then((someResponse) => {
							res.status(200).json(someResponse);
						})
						.catch((errorMessage) => {
							res.status('404').send(errorMessage);
						});

});


 // http://localhost:3000/get-goods?good=phones&price-order=desc
app.get('/get-goods', function(req, res) {
	console.log('Response from "get-goods?good=param1&price=param2');
	console.log(`Good: ${req.query.good}`);
	console.log(`Price: ${req.query['price-order']}`);
	let someResponse = {
		Type: req.query.good,
		Price: req.query['price-order']
	}; 
	
	let errorMessage = 'Unexpected error';
	let handler = new Promise((resolve, reject) => {
		if (req.query.good !== '') {
			console.log('Hello ' + someResponse);
			resolve(someResponse);
			
		} else {
			reject(errorMessage);
		}
	})
	 					.then((someResponse) => {
							res.status(200).json(someResponse);
						})
						.catch((errorMessage) => {
							res.status('404').send(errorMessage);
						});
});


app.listen(port, () => {
	console.log(`Server is up on port ${port}`);	
});

/*
app.get('/', (req, res) => {
	res.send({
		name: 'Andrew',
		likes: [
			'Biking',
			'Cities'
		]
	})
});
*/
