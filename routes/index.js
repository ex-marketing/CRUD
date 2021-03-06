const express = require('express');
const router = express.Router();

//Home Page
router.get('/', ensureAuthenticated, (req, res) => {
    res.render('index');
});

//Emplyee List Page
router.get('/employees', ensureAuthenticated, (req, res) => {
    res.render('emplist');
});

//Welcome Page
router.get('/welcome', (req, res) => {
  res.render('welcome');
});

function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/welcome');
	}
}

module.exports = router;
