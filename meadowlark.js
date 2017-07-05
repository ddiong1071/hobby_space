var express = require('express');
var app		= express();

var fortunes = [
"Conquer your fears or they will conquer you.",
"Rivers need springs.",
"Do not fear what you don't know.",
"You will have a pleasant surprise.",
"Whenever possible, keep it simple.",
];

//핸들바 뷰 엔진설정 
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app
	.use(express.static(__dirname+'/public')) 
	.set('port', process.env.PORT || 3000) 
	.engine('handlebars', handlebars.engine) 
	.set('view engine', 'handlebars');

app
	.get('/', function(req, res){
		res.render('home');
	}) 
	.get('/about', function(req, res){
		var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
		res.render('about', { fortune : randomFortune });
	});

// 404 폴백 핸들러(미들웨어)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

//500 에러 핸들어(미들웨어) 
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500); 
	res.send('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:'+app.get('port') + '; press Ctrl-C to terminste.');
});