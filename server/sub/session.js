
module.exports = function (app, client) {

const session = require('express-session');
const redisStore = require('connect-redis')(session);
const sessionStore = new redisStore({host: 'localhost', port: 6379, 
									 client: client, }); 
//ttl : 36000, disableTouch: true
	
// const cookieParser = require('cookie-parser');
// app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
	store: sessionStore,
	name: 'cart',
    secret: process.env.COOKIE_SECRET,
	saveUninitialized: true,
    resave: false,
	proxy: true,
	cookie: {
		secure: true, 
		// sameSite: true,
    	//maxAge: 1000 * 60 * 60 * 24
  	}
}));

}