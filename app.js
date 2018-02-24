const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const routes = require('./routes/index');

//Initialise App With Express
const app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);

//Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Listening on port '+app.get('port'));
});
