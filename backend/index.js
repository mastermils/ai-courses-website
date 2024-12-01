const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const { Strategy: OpenIDConnectStrategy } = require('passport-openidconnect');

const app = express();
const PORT = 5000;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from the frontend
    credentials: true, // Enable session cookies
  })
);
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ai_courses', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 20000, // 20 seconds timeout
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Configure session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default-session-secret',
    resave: false,
    saveUninitialized: false, // Avoid creating sessions for unauthenticated requests
    cookie: {
      httpOnly: true,
      secure: false, // Set true for HTTPS
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

// Passport setup
passport.use(
  new OpenIDConnectStrategy(
    {
      issuer: 'http://localhost:8080/realms/sample-apps',
      authorizationURL: 'http://localhost:8080/realms/sample-apps/protocol/openid-connect/auth',
      tokenURL: 'http://localhost:8080/realms/sample-apps/protocol/openid-connect/token',
      userInfoURL: 'http://localhost:8080/realms/sample-apps/protocol/openid-connect/userinfo',
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/callback',
      scope: ['openid', 'profile', 'email'],
    },
    (issuer, profile, done) => {
      console.log('Issuer:', issuer);
      console.log('Profile:', profile);
      if (!profile) {
        return done(new Error('Profile not found'), null);
      }
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use(passport.initialize());
app.use(passport.session());

// Authentication routes
app.get(
  '/auth/login',
  passport.authenticate('openidconnect', { failureRedirect: '/' })
);

app.get(
  '/auth/callback',
  passport.authenticate('openidconnect', { failureRedirect: '/' }),
  (req, res) => {
    console.log('Authentication successful, user:', req.user);
    res.redirect('http://localhost:5173/'); // Redirect to the frontend URL
  }
);

app.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:5173/');
  });
});

// Course Schema and Model
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
});
const Course = mongoose.model('Course', courseSchema);

// API Routes
app.get('/api/courses', async (req, res) => {
  console.log('GET /api/courses called');
  try {
    const courses = await Course.find();
    console.log('Courses fetched:', courses);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send('Error fetching courses');
  }
});

// Protected route example
app.get('/api/protected', (req, res) => {
  console.log('Authenticated request:', req.isAuthenticated());
  console.log('User in session:', req.user);

  if (req.isAuthenticated()) {
    res.json({ message: 'You are authenticated', user: req.user });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});