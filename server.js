const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// ROUTES IMPORT
const eventRoutes = require('./routes/events');

// SET VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// To handle form data (POST requests)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ------------------ ROUTES ------------------

// HOME PAGE
app.get('/', (req, res) => {
  res.render('index', { title: "Home" });
});

// PRODUCTS PAGE
app.get('/products', (req, res) => {
  res.render('products', { title: "Products" });
});

app.get('/about', (req, res) => {
  res.render('about', { title: "About" });
});


// EVENTS ROUTES (connected to /routes/events.js)
app.use('/events', eventRoutes);

// ------------------ DATABASE CONNECTION ------------------

mongoose.connect('mongodb://127.0.0.1:27017/Web_Final', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// ------------------ START SERVER ------------------

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
