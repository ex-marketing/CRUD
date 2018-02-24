const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

//Initialise App With Express
const app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

//Views (To be added to Routes Later)
app.get('/', (req, res) => {
    res.render('index');
});

//Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Listening on port '+app.get('port'));
});
