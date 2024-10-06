const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs'); 
const app = express(); 
const favicon = require('serve-favicon');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('./users');
const crypto = require('crypto');
const PORT = 443;


// Load SSL certificate and private key
const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
};

// Serving the favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));

// Generate the super secret key
const secret = crypto.randomBytes(32).toString('hex');

// Set up zhe session handling cookie
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false,
  // For HTTPS
  cookie: { secure: false }
}));

// Passport stuff
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
  const user = users.find(u => u.username === username);
  if (!user) {
    return done(null, false, { message: 'Incorrect username.' });
  }
  if (user.password !== password) {
    return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
}));

// Serialize and deserialize user for session handling
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Automatically redirect to login page if not authenticated
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

// Login POST request (Using Passport authentication)
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}));

// Dashboard route <<<<< Important bit
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.send(`Welcome ${req.user.username}! You are logged in.`);
});

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
  });